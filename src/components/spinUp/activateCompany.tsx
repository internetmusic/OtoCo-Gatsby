import React, { Dispatch, FC, useState } from 'react'
import Web3 from 'web3'
import axios from 'axios'
import { navigate } from '@reach/router'
import { connect } from 'react-redux'
import { IState } from '../../state/types'
import TransactionMonitor from '../transactionMonitor/transactionMonitor'
import MainContract from '../../smart-contracts/MainContract'
import {
  SET_ACCOUNT,
  SET_NETWORK,
  AccountActionTypes,
} from '../../state/account/types'
import { SET_CURRENT_STEP, SpinUpActionTypes } from '../../state/spinUp/types'
import transactionMonitor from '../transactionMonitor/transactionMonitor'

interface Props {
  account?: string
  network?: string
  availableName?: string
  jurisdictionName: string
  jurisdictionSelected: string
  dispatch: Dispatch<AccountActionTypes | SpinUpActionTypes>
}

interface Request {
  from?: string
  gas: number
  gasPrice?: string
}

const ActivateCompany: FC<Props> = ({
  account,
  network,
  availableName,
  jurisdictionSelected,
  jurisdictionName,
  dispatch,
}: Props) => {
  const web3: Web3 = window.web3
  const [transaction, setTransaction] = useState('')
  const [fee, setFee] = useState(0)
  const [totalCost, setTotalCost] = useState(0)
  const gasCost = 710000

  React.useEffect(() => {
    // When enter activate page
    async function populateFees() {
      const gasFees = await axios.get(
        `https://ethgasstation.info/api/ethgasAPI.json`
      )
      const fee = gasFees.data.fast * 0.1
      let total = web3.utils.toWei((gasCost * fee).toString(), 'gwei')
      total = web3.utils.fromWei(total, 'ether')
      total = total.match(/^-?\d+(?:\.\d{0,3})?/)[0]
      console.log(gasCost, fee, total)
      setFee(fee)
      setTotalCost(total)
    }
    populateFees()
  }, [])

  const clickCancelHandler = () => {
    dispatch({ type: SET_CURRENT_STEP, payload: 0 })
  }

  const clickActivateHandler = async () => {
    const requestInfo: Request = { from: account, gas: 800000 }
    try {
      const gasFees = await axios.get(
        `https://ethgasstation.info/api/ethgasAPI.json`
      )
      requestInfo.gasPrice = web3.utils.toWei(
        (gasFees.data.fast * 0.1).toString(),
        'gwei'
      )
    } catch (err) {
      console.log('Could not fetch gas fee for transaction.')
    }
    console.log(network, requestInfo)
    // MainContract.getContract(network, jurisdictionSelected)
    //   .methods.createSeries(availableName)
    //   .send(requestInfo, (error: any, hash: string) => {
    //     if (error) alert('Something went wrong! Please Try Again Later!')
    //     else {
    //       setTransaction(hash)
    //     }
    //   })
    setTransaction(
      '0x628048caa2a7e94d994556fc2fbd3ebddb20bb4e99df191cc45bff7558977cf0'
    )
  }

  const handleConfirmedTransaction = () => {
    navigate('/dashboard')
  }

  return (
    <div className="animate-slide-left">
      {!transaction && (
        <div>
          <p className="normal-text">
            The current deployment cost is approximately. <b>{totalCost} ETH</b>
            .
          </p>
          <p className="normal-text">
            Click `<b>Activate</b>` to spin up `<b>{availableName}</b>` in{' '}
            <b>{jurisdictionName}</b>.
          </p>
          <button className="btn btn-primary mr-4" onClick={clickCancelHandler}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={clickActivateHandler}>
            Activate Company
          </button>
        </div>
      )}
      {transaction && (
        <TransactionMonitor
          hash={transaction}
          title="Activating Company"
          callbackSuccess={handleConfirmedTransaction}
        ></TransactionMonitor>
      )}
    </div>
  )
}

export default connect((state: IState) => ({
  account: state.account.account,
  network: state.account.network,
  availableName: state.spinUp.availableName,
  jurisdictionSelected: state.spinUp.jurisdictionSelected,
  jurisdictionName: state.spinUp.jurisdictionName,
}))(ActivateCompany)
