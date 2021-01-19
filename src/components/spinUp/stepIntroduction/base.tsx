import React, { Dispatch, FC, useState } from 'react'
import { Link } from 'gatsby'
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

const StepIntroduction: FC<Props> = ({ account, network, dispatch }: Props) => {
  React.useEffect(() => {
    // if (account && network) dispatch({ type: SET_CURRENT_STEP, payload: 2 })
  }, [account, dispatch, network])

  const clickNextHandler = async () => {
    dispatch({ type: SET_CURRENT_STEP, payload: 1 })
  }

  return (
    <div>
      <div className="pb-4">
        <h6 className="card-header mb-3">
          Spin up your real-world LLC
          <br /> using your Ethereum wallet
        </h6>
        <p className="pb-4">Just four steps and you’re done!</p>
        <p>
          <b>Before you start</b>
        </p>
        <p>
          OtoCo is live on the Ethereum Mainnet! Activating a company using
          OtoCo will create a valid legal entity.
        </p>
        <p>
          Please use a Web3 compatible browser like Firefox or Chrome with
          MetaMask.
        </p>
        <p>
          By proceding, you agree with our{' '}
          <Link to="/terms/">Terms of Use</Link>.
        </p>
      </div>
      <div className="d-flex pt-4 gap-2 flex-row">
        <button
          type="button"
          className="btn btn-primary flex-fill"
          onClick={clickNextHandler}
        >
          Get Started
        </button>
      </div>
    </div>
  )
}

export default connect((state: IState) => ({
  account: state.account.account,
  network: state.account.network,
}))(StepIntroduction)
