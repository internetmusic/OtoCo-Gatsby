import { IAccountState } from './account/types'
import { ISpinUpState } from './spinUp/types'
import { IManagementState } from './management/types'

export interface IState {
  spinUp: ISpinUpState
  account: IAccountState
  management: IManagementState
}
