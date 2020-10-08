import React, { Dispatch, FC, useState } from 'react'
import Web3 from 'web3'
import Web3Integrate from '../../services/web3-integrate'
import { connect } from 'react-redux'
import { IState } from '../../state/types'
import {
  SET_ACCOUNT,
  SET_NETWORK,
  AccountActionTypes,
  DISCONNECT,
} from '../../state/account/types'

import './style.scss'

interface Props {
  account: string | null
  network: string | null
  dispatch: Dispatch<AccountActionTypes>
}

const AccountWidget: FC<Props> = ({ account, network, dispatch }: Props) => {
  const handleConnect = async () => {
    await Web3Integrate.callModal()
    const web3: Web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    dispatch({
      type: SET_NETWORK,
      payload: await web3.eth.net.getNetworkType(),
    })
    dispatch({ type: SET_ACCOUNT, payload: accounts[0] })
  }

  const handleManage = () => {}

  const handleDisconnect = () => {
    Web3Integrate.disconnect()
    dispatch({ type: DISCONNECT })
  }

  return (
    <div className="account-widget">
      {account && (
        <div>
          <p className="small disabled" onClick={handleManage}>
            {account.substring(0, 8)}...{' '}
            <span className="network">{network}</span>
          </p>
          <p>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={handleDisconnect}
            >
              disconnect
            </button>
          </p>
        </div>
      )}
      {!account && (
        <div className="account-details">
          <p>
            <span onClick={handleConnect}>disconnected</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default connect((state: IState) => ({
  account: state.account.account,
  network: state.account.network,
}))(AccountWidget)
