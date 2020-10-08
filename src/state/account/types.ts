export const DISCONNECT = 'DISCONNECT'
export const SET_ACCOUNT = 'SET_ACCOUNT'
export const SET_NETWORK = 'SET_NETWORK'

interface Disconnect {
  type: typeof DISCONNECT
}

interface SetAccount {
  type: typeof SET_ACCOUNT
  payload: string
}

interface SetNetwork {
  type: typeof SET_NETWORK
  payload: string
}

export interface IAccountState {
  account: string | null
  network: string | null
}

export type AccountActionTypes = Disconnect | SetAccount | SetNetwork
