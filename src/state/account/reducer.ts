import {
  SET_ACCOUNT,
  SET_NETWORK,
  SET_ALIAS,
  SET_PRIVATEKEY,
  SET_INBOX_MESSAGES,
  ADD_INBOX_MESSAGES,
  SET_OUTBOX_MESSAGES,
  ADD_OUTBOX_MESSAGES,
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
  inboxMessages: [],
  outboxMessages: [],
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
    case SET_INBOX_MESSAGES:
      return {
        ...state,
        inboxMessages: action.payload,
      }
    case ADD_INBOX_MESSAGES:
      return {
        ...state,
        inboxMessages: state.inboxMessages.concat([action.payload]),
      }
    case SET_OUTBOX_MESSAGES:
      return {
        ...state,
        outboxMessages: action.payload,
      }
    case ADD_OUTBOX_MESSAGES:
      return {
        ...state,
        outboxMessages: state.outboxMessages.concat([action.payload]),
      }
    case DISCONNECT:
      return {
        ...state,
        network: undefined,
        account: undefined,
        alias: undefined,
        privatekey: undefined,
        inboxMessages: [],
        outboxMessages: [],
      }
    default:
      return state
  }
}

export default reducer
