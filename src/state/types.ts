import { IAccountState } from './account/types'
import { ISpinUpState } from './spinUp/types'

export interface IState {
  spinUp: ISpinUpState
  account: IAccountState
}
