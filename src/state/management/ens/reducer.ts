import { ENSActionTypes, IENSState, SET_ENS_DOMAINS } from './types'

const reducer = (state: IENSState = {}, action: ENSActionTypes): IENSState => {
  switch (action.type) {
    case SET_ENS_DOMAINS:
      return {
        ...state,
        ensDomains: action.payload,
      }
    default:
      return state
  }
}

export default reducer
