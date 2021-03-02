export const SET_ENS_DOMAINS = 'SET_ENS_DOMAINS'

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

export interface IENSState {
  ensDomains?: ENSDomains
}

export type ENSActionTypes = SetENSDomains
