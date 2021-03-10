import {
  SET_ACCOUNT,
  SET_NETWORK,
  SET_ALIAS,
  SET_PRIVATEKEY,
  DISCONNECT,
  AccountActionTypes,
  IAccountState,
} from './types'

export const initialState = {
  account: undefined,
  network: undefined,
  identity: undefined,
  alias: undefined,
  privatekey: undefined,
}

const reducer = (
  state: IAccountState = initialState,
  action: AccountActionTypes
): IAccountState => {
  switch (action.type) {
    case SET_ACCOUNT:
      return {
        ...state,
        account: action.payload,
      }
    case SET_NETWORK:
      return {
        ...state,
        network: action.payload,
      }
    case SET_ALIAS:
      return {
        ...state,
        alias: action.payload,
      }
    case SET_PRIVATEKEY:
      return {
        ...state,
        privatekey: action.payload,
      }
    case DISCONNECT:
      return {
        ...state,
        network: undefined,
        account: undefined,
        alias: undefined,
        privatekey: undefined,
      }
    default:
      return state
  }
}

export default reducer
