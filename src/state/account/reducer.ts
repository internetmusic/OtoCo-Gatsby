import {
  SET_ACCOUNT,
  SET_NETWORK,
  DISCONNECT,
  AccountActionTypes,
  IAccountState,
} from './types'

export const initialState = {
  account: null,
  network: null,
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
    case DISCONNECT:
      return {
        ...state,
        network: null,
        account: null,
      }
    default:
      return state
  }
}

export default reducer
