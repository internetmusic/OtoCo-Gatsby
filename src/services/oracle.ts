import axios, { AxiosError, AxiosResponse } from 'axios'
import { PublicKey } from '@textile/hub'

const oraclePath: string = process.env.GATSBY_ORACLE_URL
const oraclePublicKey: PublicKey = PublicKey.fromString(
  process.env.GATSBY_ORACLE_KEY
)

// Typescript Interfaces
type OracleRequest = {
  method: string
  signature?: string // Sender signature
  message: string // Sender message
}

type OracleResult = {
  method: string
  status: string
}

const postRequest = async (data: OracleRequest): Promise<any> => {
  const encoded = new TextEncoder().encode(data.message)
  data.message = (await oraclePublicKey.encrypt(encoded)).toString()
  const res: AxiosResponse = await axios.post(oraclePath, data)
  if (res.data.method == 'error') throw res.data
  return res.data
}

interface OracleInterface {
  saveIdentity: (
    wallet: string,
    email: string,
    publicKey?: string
  ) => Promise<boolean>
  existIdentity: (wallet: string) => Promise<boolean>
}

const Oracle: OracleInterface = {
  saveIdentity: async function (
    wallet: string,
    email: string
  ): Promise<boolean> {
    try {
      const data: OracleRequest = {
        method: 'saveIdentity',
        message: JSON.stringify({
          wallet,
          email,
        }),
      }
      return await postRequest(data)
    } catch (err) {
      console.error(err)
      return false
    }
  },

  existIdentity: async function (wallet: string): Promise<boolean> {
    try {
      const data: OracleRequest = {
        method: 'existIdentity',
        message: JSON.stringify({
          wallet,
        }),
      }
      return await postRequest(data)
    } catch (err) {
      console.error(err)
      return false
    }
  },
}
export default Oracle
