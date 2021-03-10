import axios, { AxiosError, AxiosResponse } from 'axios'
import { PublicKey, UserAuth } from '@textile/hub'

const oraclePath: string = process.env.GATSBY_ORACLE_URL
const oraclePublicKey: PublicKey = PublicKey.fromString(
  process.env.GATSBY_ORACLE_KEY
)

// Typescript Interfaces
type OracleRequest = {
  method: string
  signature?: string // Sender signature
  message: any // Sender message
}

type OracleResult = {
  method: string
  status: string
}

const postRequest = async (data: OracleRequest): Promise<any> => {
  const encoded = new TextEncoder().encode(data.message)
  data.message = Buffer.from(await oraclePublicKey.encrypt(encoded)).toJSON()
  const res: AxiosResponse = await axios.post(oraclePath, data)
  if (res.data.method == 'error') throw res.data
  return res.data
}

interface OracleInterface {
  saveWallet: (
    wallet: string,
    email?: string,
    keys?: string[]
  ) => Promise<boolean>
  existWallet: (wallet: string) => Promise<{ address: boolean; email: boolean }>
}

const Oracle: OracleInterface = {
  saveWallet: async function (
    wallet: string,
    email?: string,
    keys?: string[]
  ): Promise<boolean> {
    try {
      const data: OracleRequest = {
        method: 'saveWallet',
        message: JSON.stringify({
          wallet,
          email,
          keys,
        }),
      }
      return await postRequest(data)
    } catch (err) {
      console.error(err)
      return false
    }
  },
  existWallet: async function (
    wallet: string
  ): Promise<{ address: boolean; email: boolean }> {
    try {
      const data: OracleRequest = {
        method: 'existWallet',
        message: JSON.stringify({
          wallet,
        }),
      }
      return await postRequest(data)
    } catch (err) {
      console.error(err)
      return { address: false, email: false }
    }
  },
}
export default Oracle
