import React, { Dispatch, FC, useState } from 'react'
import Web3 from 'web3'
import BN from 'bn.js'
import { connect } from 'react-redux'
import { IState } from '../../../state/types'
import {
  SET_CURRENT_STEP,
  SpinUpActionTypes,
} from '../../../state/spinUp/types'
import TransactionMonitor from '../../transactionMonitor/transactionMonitor'

import ERC20Contract from '../../../smart-contracts/ERC20'
import MainContract from '../../../smart-contracts/MainContract'

// import  EnoughBalance from './enoughBalanceForm'
import NoBalanceForm from './noBalanceForm'

interface Props {
  account?: string
  network?: string
  availableName: string
  jurisdictionSelected: string
  dispatch: Dispatch<SpinUpActionTypes>
}

const Payment: FC<Props> = ({
  account,
  network,
  jurisdictionSelected,
  dispatch,
}: Props) => {
  const web3: Web3 = window.web3
  const [transaction, setTransaction] = useState('')
  const [accountAllowance, setAllowance] = useState('0')
  const [accountBalance, setBalance] = useState('0')
  const [decimals, setDecimals] = useState(18)
  const [erc20Target, setERC20Target] = useState('')

  const erc20 = {
    symbol: 'DAI',
    spinUpFee: 20,
  }

  // TODO : Verify if company already not allow master to address payment
  React.useEffect(() => {
    setTimeout(async () => {
      const allowance: BN = await ERC20Contract.getContract(network)
        .methods.allowance(
          account,
          MainContract.addresses[network + '_' + jurisdictionSelected]
        )
        .call({ from: account })
      const balance: BN = await ERC20Contract.getContract(network)
        .methods.balanceOf(account)
        .call({ from: account })
      const dec: number = await ERC20Contract.getContract(network)
        .methods.decimals()
        .call({ from: account })
      //const allowance = parseFloat(allowance / 10 ** dec)
      // balance = parseFloat(balance / 10 ** dec)
      setERC20Target(
        MainContract.addresses[network + '_' + jurisdictionSelected]
      )
      setDecimals(dec)
      const decimalBN = new BN(dec)
      const divisor = new BN(10).pow(decimalBN)
      const allowanceBN = new BN(allowance)
      const balanceBN = new BN(balance)

      console.log(allowance, balance)

      setAllowance(allowanceBN.div(divisor).toString())
      setBalance(balanceBN.div(divisor).toString())
      //setBalance(parseFloat(balance / 10 ** dec))
      if (
        erc20.spinUpFee <= allowanceBN.div(divisor).toNumber() &&
        balance >= allowance
      )
        dispatch({ type: SET_CURRENT_STEP, payload: 3 })
    }, 0)
  }, [account, network, jurisdictionSelected])

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
      <div>
        {transaction && (
          <div className="animate-slide-left">
            <TransactionMonitor
              hash={transaction}
              title="Approving Tokens"
              callbackSuccess={nextStepHandler}
            ></TransactionMonitor>
            <p>
              * Once transaction is confirmed, it will automatically proceed to
              next step.
            </p>
          </div>
        )}
        {parseInt(accountBalance) < erc20.spinUpFee && (
          <NoBalanceForm
            balance={accountBalance}
            fee={erc20.spinUpFee}
            currency={erc20.symbol}
            environment="testwyre"
          ></NoBalanceForm>
        )}
        {/* {parseInt(accountAllowance) < erc20.spinUpFee &&
          parseInt(accountBalance) >= erc20.spinUpFee && (
            <EnoughBalance></EnoughBalance>
          )} */}
      </div>
    </div>
  )
}

export default connect((state: IState) => ({
  account: state.account.account,
  network: state.account.network,
  availableName: state.spinUp.availableName,
  jurisdictionSelected: state.spinUp.jurisdictionSelected,
}))(Payment)
