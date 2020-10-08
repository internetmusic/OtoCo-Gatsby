import { createStore, combineReducers, StoreCreator } from 'redux'

import spinUpState from './spinUp/reducer'
import accountState from './account/reducer'
import { IState } from './types'

const rootReducer = combineReducers({
  spinUp: spinUpState,
  account: accountState,
})

const getLoadedState = (preloadedState: IState) => ({
  ...preloadedState,
})

export default (preloadedState: IState): StoreCreator => {
  return createStore(rootReducer, getLoadedState(preloadedState))
}
