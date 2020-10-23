import React, { Dispatch, FC, useState } from 'react'
import Web3 from 'web3'
import BN from 'bn.js'
import { connect } from 'react-redux'
import { IState } from '../../../state/types'
import AddressWidget from '../../addressWidget/addressWidget'
import {
  SET_CURRENT_STEP,
  SpinUpActionTypes,
} from '../../../state/spinUp/types'

import ERC20Contract from '../../../smart-contracts/ERC20'

interface Props {
  balance: string
  allowance: string
  fee: number
  feeBN: string
  currency: string
  mainContractAddress: string
  setTransaction: React.Dispatch<React.SetStateAction<string>>
  account?: string | null
  network?: string | null
  jurisdictionSelected: string
  dispatch: Dispatch<SpinUpActionTypes>
}

const EnoughBalanceForm: FC<Props> = ({
  balance,
  allowance,
  fee,
  feeBN,
  currency,
  mainContractAddress,
  account,
  network,
  setTransaction,
}: Props) => {
  const web3: Web3 = window.web3

  const clickApproveHandler = async () => {
    const requestInfo = { from: account, gas: 200000, gasPrice: 0 }
    try {
      const gasFees = await axios.get(
        `https://ethgasstation.info/api/ethgasAPI.json`
      )
      requestInfo.gasPrice = parseInt(
        web3.utils.toWei((gasFees.data.fast * 0.1).toString(), 'gwei')
      )
    } catch (err) {
      console.log('Could not fetch gas fee for transaction.')
    }
    console.log(network, requestInfo)
    try {
      ERC20Contract.getContract(network)
        .methods.approve(mainContractAddress, feeBN)
        .send(requestInfo, (error: any, hash: string) => {
          setTransaction(hash)
        })
    } catch (err) {
      console.log(err)
    }
  }

  const clickBackHandler = () => {
    dispatch({ type: SET_CURRENT_STEP, payload: 0 })
  }

  return (
    <div>
      <p>
        Please approve payment of{' '}
        <b>
          {fee} {currency}
        </b>{' '}
        to OtoCo from your connected wallet to instantly activate your new LLC.
      </p>
      <p className="small">
        Approved{' '}
        <b>
          {allowance} {currency}
        </b>{' '}
        of total{' '}
        <b>
          {balance} {currency}
        </b>{' '}
        available.
      </p>
      {account && (
        <div className="small">
          From Your Account: <AddressWidget address={account}></AddressWidget>
        </div>
      )}
      <p className="small">
        To Address:{' '}
        <AddressWidget address={mainContractAddress}></AddressWidget>
      </p>
      <button className="btn btn-primary mr-4" onClick={clickBackHandler}>
        Back
      </button>
      <button className="btn btn-primary" onClick={clickApproveHandler}>
        Approve Payment
      </button>
    </div>
  )
}

export default connect((state: IState) => ({
  account: state.account.account,
  network: state.account.network,
  jurisdictionSelected: state.spinUp.jurisdictionSelected,
}))(EnoughBalanceForm)
