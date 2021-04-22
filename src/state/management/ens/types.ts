export const SET_ENS_DOMAINS = 'SET_ENS_DOMAINS'
export const CLEAR_ENS_DOMAINS = 'CLEAR_ENS_DOMAINS'

export type ENSDomain = {
  domain: string
  address: string
  reverse?: string
}

export type ENSDomains = {
  domains: ENSDomain[]
}

interface SetENSDomains {
  type: typeof SET_ENS_DOMAINS
  payload: ENSDomains
}

interface ClearENSDomains {
  type: typeof CLEAR_ENS_DOMAINS
}

export interface IENSState {
  ensDomains?: ENSDomains
}

export type ENSActionTypes = SetENSDomains | ClearENSDomains
