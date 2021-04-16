import {
  CLEAR_ENS_DOMAINS,
  SET_ENS_DOMAINS,
  ENSActionTypes,
  IENSState,
} from './types'

const reducer = (state: IENSState = {}, action: ENSActionTypes): IENSState => {
  switch (action.type) {
    case SET_ENS_DOMAINS:
      return {
        ...state,
        ensDomains: action.payload,
      }
    case CLEAR_ENS_DOMAINS:
      return {
        ...state,
        ensDomains: undefined,
      }
    default:
      return state
  }
}

export default reducer
