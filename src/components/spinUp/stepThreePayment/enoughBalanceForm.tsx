import React, { Dispatch, FC, useState } from 'react'
import Web3 from 'web3'
import BN from 'bn.js'
import { connect } from 'react-redux'
import { IState } from '../../../state/types'
import AddressWidget from '../../addressWidget/addressWidget'
import TransactionMonitor from '../../transactionMonitor/transactionMonitor'

import ERC20Contract from '../../../smart-contracts/ERC20'
import MainContract from '../../../smart-contracts/MainContract'

interface Props {
  account?: string | null
  network?: string | null
  jurisdictionSelected: string
}

const EnoughBalanceForm: FC<Props> = ({ account, network }: Props) => {
  const web3: Web3 = window.web3
  const [transaction, setTransaction] = useState('')
  const [accountAllowance, setAllowance] = useState('0')
  const [accountBalance, setBalance] = useState('0')
  const [decimals, setDecimals] = useState(18)
  const [erc20Target, setERC20Target] = useState('')

  const erc20 = {
    symbol: 'DAI',
    spinUpFee: 5,
  }

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
        .methods.approve(
          erc20Target,
          (erc20.spinUpFee * 10 ** decimals).toString()
        )
        .send(requestInfo, (error: any, hash: string) => {
          setTransaction(hash)
        })
    } catch (err) {
      console.log(err)
    }
  }

  const nextStepHandler = () => {
    dispatch({ type: SET_CURRENT_STEP, payload: 3 })
  }

  const clickBackHandler = () => {
    dispatch({ type: SET_CURRENT_STEP, payload: 0 })
  }

  return (
    <div>
      <p>
        Now to activate your LLC is to approve
        <b style={{ padding: '0px 8px' }}>
          {erc20.spinUpFee} {erc20.symbol}
        </b>
        to OtoCo from your connected wallet.
      </p>
      <p>
        Approved
        <b style={{ padding: '0px 8px' }}>
          {accountAllowance} {erc20.symbol}
        </b>
        of total
        <b style={{ padding: '0px 8px' }}>
          {accountBalance} {erc20.symbol}
        </b>
        available.
      </p>
      {account && (
        <p>
          From Your Account: <AddressWidget address={account}></AddressWidget>
        </p>
      )}
      {erc20Target && (
        <p>
          To Address: <AddressWidget address={erc20Target}></AddressWidget>
        </p>
      )}
    </div>
  )
}

export default connect((state: IState) => ({
  account: state.account.account,
  network: state.account.network,
  jurisdictionSelected: state.spinUp.jurisdictionSelected,
}))(EnoughBalanceForm)
