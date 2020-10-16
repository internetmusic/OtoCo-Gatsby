export const SET_OWN_SERIES = 'SET_OWN_SERIES'
export const SET_MANAGE_SERIES = 'SET_MANAGE_SERIES'
export const CLEAR_MANAGE_SERIES = 'CLEAR_MANAGE_SERIES'
export const SET_MANAGE_OPTION = 'SET_MANAGE_OPTION'
export const SET_TOKEN_CONFIG = 'SET_TOKEN_CONFIG'
export const SET_TOKEN_DEPLOYED = 'SET_TOKEN_DEPLOYED'
export const SET_ENS_CONFIG = 'SET_ENS_CONFIG'
export const SET_CONTACT_FORM = 'SET_CONTACT_FORM'

export type SeriesType = {
  contract: string
  owner: string
  name: string
  jurisdiction: string
  created: Date
}

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

export type ENSConfig = {
  domain?: string
  name?: string
}

interface SetOwnSeries {
  type: typeof SET_OWN_SERIES
  payload: SeriesType[]
}
interface SetManageSeries {
  type: typeof SET_MANAGE_SERIES
  payload: SeriesType
}
interface ClearManageSeries {
  type: typeof CLEAR_MANAGE_SERIES
}
interface SetManageOption {
  type: typeof SET_MANAGE_OPTION
  payload: number
}
interface SetTokenConfig {
  type: typeof SET_TOKEN_CONFIG
  payload: TokenConfig
}
interface SetTokenDeployed {
  type: typeof SET_TOKEN_DEPLOYED
  payload: TokenDeployed
}
interface SetENSConfig {
  type: typeof SET_ENS_CONFIG
  payload: ENSConfig
}
interface SetContactForm {
  type: typeof SET_CONTACT_FORM
  payload: boolean
}
export interface IManagementState {
  series: SeriesType[]
  managing?: SeriesType
  manageOption: number
  tokenConfig?: TokenConfig
  tokenDeployed?: TokenDeployed
  ensConfig?: ENSConfig
  contactForm: boolean
}

export type ManagementActionTypes =
  | SetOwnSeries
  | SetManageSeries
  | ClearManageSeries
  | SetManageOption
  | SetTokenConfig
  | SetTokenDeployed
  | SetENSConfig
  | SetContactForm
