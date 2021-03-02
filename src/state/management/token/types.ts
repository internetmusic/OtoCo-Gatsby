export const SET_TOKEN_CONFIG = 'SET_TOKEN_CONFIG'
export const SET_TOKEN_DEPLOYED = 'SET_TOKEN_DEPLOYED'

export type TokenConfig = {
  shares: string
  decimals: number
  name: string
  symbol: string
}

export type TokenDeployed = {
  creation: Date
  contract: string
}

export type TokenOwner = {
  address: string
  balance: number
}

interface SetTokenConfig {
  type: typeof SET_TOKEN_CONFIG
  payload: TokenConfig
}
interface SetTokenDeployed {
  type: typeof SET_TOKEN_DEPLOYED
  payload: TokenDeployed
}

export interface ITokenState {
  tokenConfig?: TokenConfig
  tokenDeployed?: TokenDeployed
}

export type TokenActionTypes = SetTokenConfig | SetTokenDeployed
