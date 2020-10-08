import React, { Dispatch, FC, useState } from 'react'
import Web3 from 'web3'
import { TransactionReceipt } from 'web3-core'
import Web3Integrate from '../../services/web3-integrate'
import { connect } from 'react-redux'
import { IState } from '../../state/types'
import {
  SET_ACCOUNT,
  SET_NETWORK,
  AccountActionTypes,
} from '../../state/account/types'
import { SET_CURRENT_STEP, SpinUpActionTypes } from '../../state/spinUp/types'
import TransactionMonitor from '../transactionMonitor/transactionMonitor'

interface Props {
  account: string | null
  network: string | null
  dispatch: Dispatch<AccountActionTypes | SpinUpActionTypes>
}

const ConnectWallet: FC<Props> = ({ account, network, dispatch }: Props) => {
  const handleSuccess = (receipt: TransactionReceipt) => {
    console.log(receipt)
  }

  const handleError = (error: string) => {
    console.log(error)
  }

  return (
    <div>
      <TransactionMonitor
        hash="aaaaa"
        title="AH mizeravi"
        callbackSuccess={handleSuccess}
        callbackError={handleSuccess}
      ></TransactionMonitor>
    </div>
  )
}

export default connect((state: IState) => ({
  account: state.account.account,
  network: state.account.network,
}))(ConnectWallet)
