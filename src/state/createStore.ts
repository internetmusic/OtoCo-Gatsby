import { createStore, combineReducers, StoreCreator } from 'redux'

import spinUpState from './spinUp/reducer'
import accountState from './account/reducer'
import managementState from './management/reducer'
import tokenState from './management/token/reducer'
import multisigState from './management/multisig/reducer'
import ensState from './management/ens/reducer'
import { IState } from './types'

const rootReducer = combineReducers({
  spinUp: spinUpState,
  account: accountState,
  management: managementState,
  token: tokenState,
  multisig: multisigState,
  ens: ensState,
})

const getLoadedState = (preloadedState: IState) => ({
  ...preloadedState,
})

export default (preloadedState: IState): StoreCreator => {
  return createStore(rootReducer, getLoadedState(preloadedState))
}
