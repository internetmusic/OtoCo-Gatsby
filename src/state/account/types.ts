import { PrivateKey } from '@textile/hub'

export const DISCONNECT = 'DISCONNECT'
export const SET_ACCOUNT = 'SET_ACCOUNT'
export const SET_NETWORK = 'SET_NETWORK'
export const SET_ALIAS = 'SET_ALIAS'
export const SET_PRIVATEKEY = 'SET_PRIVATEKEY'

export interface DecryptedInbox {
  id: string
  body: string
  from: string
  sent: number
  readAt?: number
}

export interface CachedWallet {
  alias: string
  password: string
  key: string
}

interface Disconnect {
  type: typeof DISCONNECT
}

interface SetAccount {
  type: typeof SET_ACCOUNT
  payload: string
}

interface SetAlias {
  type: typeof SET_ALIAS
  payload: string
}

interface SetNetwork {
  type: typeof SET_NETWORK
  payload: string
}

interface SetPrivateKey {
  type: typeof SET_PRIVATEKEY
  payload: PrivateKey
}

export interface IAccountState {
  account?: string
  network?: string
  alias?: string
  privatekey?: PrivateKey
}

export type AccountActionTypes =
  | Disconnect
  | SetAccount
  | SetNetwork
  | SetAlias
  | SetPrivateKey
