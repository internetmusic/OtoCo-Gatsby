export const SET_MULTISIG_CONFIG = 'SET_MULTISIG_CONFIG'
export const SET_MULTISIG_DEPLOYED = 'SET_MULTISIG_DEPLOYED'
export const SET_MULTISIG_BALANCES = 'UPDATE_MULTISIG_BALANCE'
export const CLEAR_MULTISIG_DEPLOYED = 'CLEAR_MULTISIG_DEPLOYED'

export type MultisigConfig = {
  owners: string[]
  threshold: string
}

export type MultisigDeployed = {
  contract: string
}

export type MultisigBalances = {
  balances: MultisigBalance[]
}

export type MultisigBalance = {
  contract: string
  name: string
  symbol: string
  decimals: number
  amount: string
}

interface SetMultisigConfig {
  type: typeof SET_MULTISIG_CONFIG
  payload: MultisigConfig
}
interface SetMultisigDeployed {
  type: typeof SET_MULTISIG_DEPLOYED
  payload: MultisigDeployed
}
interface SetMultisigBalances {
  type: typeof SET_MULTISIG_BALANCES
  payload: MultisigBalances
}
interface ClearMultisigDeployed {
  type: typeof CLEAR_MULTISIG_DEPLOYED
}

export interface IMultisigState {
  multisigConfig?: MultisigConfig
  multisigDeployed?: MultisigDeployed
  multisigBalances?: MultisigBalances
}

export type MultisigActionTypes =
  | SetMultisigConfig
  | SetMultisigDeployed
  | SetMultisigBalances
  | ClearMultisigDeployed
