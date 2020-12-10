import React, { Dispatch, FC, useState } from 'react'
import Web3 from 'web3'
import { connect } from 'react-redux'
import { IState } from '../../../state/types'
import Web3Integrate from '../../../services/web3-integrate'
import {
  SET_ACCOUNT,
  SET_NETWORK,
  AccountActionTypes,
} from '../../../state/account/types'
import {
  SET_CURRENT_STEP,
  SpinUpActionTypes,
} from '../../../state/spinUp/types'

interface Props {
  account: string | null
  network: string | null
  dispatch: Dispatch<AccountActionTypes | SpinUpActionTypes>
}

const StepConfirmation: FC<Props> = ({ account, network, dispatch }: Props) => {
  React.useEffect(() => {
    if (account && network) dispatch({ type: SET_CURRENT_STEP, payload: 2 })
  }, [account, dispatch, network])

  const clickToDashboard = async () => {
    navigate('/dashboard')
  }

  return (
    <div>
      <div>
        <div className="small">
          <p>Connect a wallet that will own your company.</p>
          <p>{account}</p>
          <p>{network}</p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={clickConnectHandler}
        >
          Connect Wallet
        </button>
      </div>
    </div>
  )
}

export default connect((state: IState) => ({
  account: state.account.account,
  network: state.account.network,
}))(StepConfirmation)
