import {
  SET_MULTISIG_CONFIG,
  SET_MULTISIG_DEPLOYED,
  SET_MULTISIG_BALANCES,
  CLEAR_MULTISIG_DEPLOYED,
  IMultisigState,
  MultisigActionTypes,
} from './types'

const reducer = (
  state: IMultisigState = {},
  action: MultisigActionTypes
): IMultisigState => {
  switch (action.type) {
    case SET_MULTISIG_CONFIG:
      return {
        ...state,
        multisigConfig: action.payload,
      }
    case SET_MULTISIG_DEPLOYED:
      return {
        ...state,
        multisigDeployed: action.payload,
      }
    case SET_MULTISIG_BALANCES:
      return {
        ...state,
        multisigBalances: action.payload,
      }
    case CLEAR_MULTISIG_DEPLOYED:
      return {
        ...state,
        multisigConfig: undefined,
        multisigBalances: undefined,
        multisigDeployed: undefined,
      }
    default:
      return state
  }
}

export default reducer
