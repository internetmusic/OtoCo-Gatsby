import Web3 from 'web3'
import {
  Users,
  Client,
  PrivateKey,
  PublicKey,
  KeyInfo,
  UserMessage,
} from '@textile/hub'
import aes256 from 'aes256'

/**
 * A simple type to hold inbox messages after they have been
 * decrypted with the PrivateKey
 */
interface DecryptedInbox {
  id: string
  body: string
  from: string
  sent: number
  readAt?: number
}

const keyInfo: KeyInfo = {
  key: process.env.GATSBY_TEXTILE_UNSAFE_KEY,
  secret: process.env.GATSBY_TEXTILE_UNSAFE_SECRET,
}
const oraclePublicKey = process.env.GATSBY_ORACLE_KEY

const messageDecoder = async (
  message: UserMessage,
  privateKey: PrivateKey
): Promise<DecryptedInbox> => {
  const bytes = await privateKey.decrypt(message.body)
  const body = new TextDecoder().decode(bytes)
  const { from } = message
  const { readAt } = message
  const { createdAt } = message
  const { id } = message
  return { body, from, readAt, sent: createdAt, id }
}

interface TextileInterface {
  user: Users | null
  client: Client | null
  privateKey: PrivateKey | null
  authorized: string | null
  lastAuthorization: number | null
  generateMessageForEntropy: (
    address: string,
    application_name: string,
    secret: string
  ) => string
  generateIdentity: (address: string) => Promise<PrivateKey | null>
  storePrivateKey: (address: string, secret: string) => Promise<PrivateKey>
  fetchIdentity: (address: string, secret: string) => Promise<PrivateKey | null>
  authorize: () => Promise<Client | null>
  refreshAuthorization: () => Promise<Client | null>
  listInboxMessages: () => Promise<DecryptedInbox[]>
  sendMessage: (to: string, message: string) => Promise<UserMessage | null>
  deleteMessage: (id: string) => Promise<void>
}

const Textile: TextileInterface = {
  user: null,
  client: null,
  privateKey: null,
  authorized: null, // Authorized Address
  lastAuthorization: null,

  generateMessageForEntropy(
    address: string,
    application_name: string,
    secret: string
  ): string {
    return (
      'READ THIS MESSAGE CAREFULLY. ' +
      'DO NOT SHARE THIS SIGNED MESSAGE WITH ANYONE OR THEY WILL HAVE READ AND WRITE' +
      'ACCESS TO THIS APPLICATION. ' +
      'DO NOT SIGN THIS MESSAGE IF THE FOLLOWING IS NOT TRUE OR YOU DO NOT CONSENT' +
      'TO THE CURRENT APPLICATION HAVING ACCESS TO THE FOLLOWING APPLICATION. \n\n' +
      'The Ethereum address used by this application is: \n' +
      address +
      '\n\n' +
      'By signing this message, you authorize the current application to use the ' +
      'following app associated with the above address: \n' +
      '\n' +
      application_name +
      '\n\n' +
      'The hash of your non-recoverable, private, non-persisted password or secret ' +
      'phrase is: \n' +
      '\n' +
      secret +
      '\n\n' +
      'ONLY SIGN THIS MESSAGE IF YOU CONSENT TO THE CURRENT PAGE ACCESSING THE KEYS ' +
      'ASSOCIATED WITH THE ABOVE ADDRESS AND APPLICATION. ' +
      'AGAIN, DO NOT SHARE THIS SIGNED MESSAGE WITH ANYONE OR THEY WILL HAVE READ AND ' +
      'WRITE ACCESS TO THIS APPLICATION. \n'
    )
  },

  generateIdentity: async function (
    address: string
  ): Promise<PrivateKey | null> {
    const web3: Web3 = window.web3
    // avoid sending the raw secret by hashing it first
    // const secret: string = hashSync('very secret', 10)
    const secret = 'very secret'
    const secretHashed = web3.utils.sha3(secret)
    console.log('SECRET:', secret)
    if (!secretHashed) return null
    const message = this.generateMessageForEntropy(
      address,
      'otoco-dapp',
      secretHashed
    )
    const signedText = await web3.eth.personal.sign(message, address)
    console.log('SIGNED:', signedText)
    const signatureHash = web3.utils.keccak256(signedText).replace('0x', '')
    // console.log('HASH:', signatureHash)
    // The following line converts the hash in hex to an array of 32 integers.
    const sigArray = signatureHash
      .match(/.{2}/g)
      .map((t) => web3.utils.hexToNumber('0x' + t))
    console.log(sigArray)
    if (sigArray.length !== 32) {
      throw new Error(
        'Hash of signature is not the correct size! Something went wrong!'
      )
    }
    this.privateKey = PrivateKey.fromRawEd25519Seed(Uint8Array.from(sigArray))
    console.log(this.privateKey.toString())
    // console.log('SECRET:', secret)
    const encrypted = aes256.encrypt(secret, this.privateKey.toString())
    localStorage.setItem(`did:eth:${address.substr(2)}`, encrypted)
    // Your app can now use this identity for generating a user Mailbox, Threads, Buckets, etc
    return this.privateKey
  },

  fetchIdentity: async function (
    address: string,
    secret: string
  ): Promise<PrivateKey | null> {
    /** Restore any cached user identity first */
    const cached = localStorage.getItem(`did:eth:${address.substr(2)}`)
    if (!cached) return null
    // console.log('CACHED', cached)
    const decrypted = aes256.decrypt(secret, cached).toString('utf8')
    // console.log('DECRYPTED', decrypted)
    this.privateKey = PrivateKey.fromString(decrypted)
    return this.privateKey
  },

  authorize: async function () {
    if (!this.privateKey) return null
    this.user = await Users.withKeyInfo(keyInfo)
    this.client = await Client.withKeyInfo(keyInfo)
    await this.client.getToken(this.privateKey)
    await this.user.getToken(this.privateKey)
    await this.user.setupMailbox()
    // window.user = this.user
    // window.client = this.client
    // window.identity = this.privateKey
    const now = new Date()
    this.lastAuthorization = now.getTime()
    console.log('AUTHORIZED')
    return this.client
  },

  refreshAuthorization: async function (): Promise<Client | null> {
    const now = new Date()
    if (!this.lastAuthorization) return await this.authorize()
    if (this.lastAuthorization + 120000 < now.getTime())
      return await this.authorize()
    return null
  },

  // MAILBOX
  listInboxMessages: async function (): Promise<DecryptedInbox[]> {
    await this.refreshAuthorization()
    console.log('MESSAGES', this.user, this.privateKey)
    if (!this.user) return []
    if (!this.privateKey) return []
    const messages = await this.user.listInboxMessages()
    console.log('MESSAGES', messages)
    const privateKey = PrivateKey.fromString(this.privateKey.toString())
    const messageList = Promise.all(
      messages.map(async function (m) {
        return await messageDecoder(m, privateKey)
      })
    )
    return messageList
  },

  sendMessage: async function (to: string, message: string) {
    await this.refreshAuthorization()
    if (!this.user) return null
    if (!this.privateKey) return null
    const toPublicKey: PublicKey = PublicKey.fromString(to)
    const encoded = new TextEncoder().encode(message)
    // const encryptedEncoded = await toPublicKey.encrypt(encoded)
    // const decoded = new TextDecoder().decode(encryptedEncoded).toString()
    return await this.user.sendMessage(this.privateKey, toPublicKey, encoded)
  },

  deleteMessage: async function (id: string) {
    await this.refreshAuthorization()
    if (!this.user) return
    return await this.user.deleteInboxMessage(id)
  },

  // SHARABLE BUCKETS
  createBucket: async function () {},

  listBuckets: async function () {},

  listFilesInBucket: async function () {},

  uploadFile: async function () {},

  updateFolderPermission: async function () {},

  eraseFile: async function () {},
}

export default Textile
