import { IAccountState } from './account/types'
import { ISpinUpState } from './spinUp/types'
import { IManagementState } from './management/types'
import { ITokenState } from './management/token/types'
import { IMultisigState } from './management/multisig/types'
import { IENSState } from './management/ens/types'

export interface IState {
  spinUp: ISpinUpState
  account: IAccountState
  management: IManagementState
  token: ITokenState
  multisig: IMultisigState
  ens: IENSState
}
