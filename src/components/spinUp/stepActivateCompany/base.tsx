import React, { Dispatch, FC, useState } from 'react'
import Web3 from 'web3'
import axios from 'axios'
import { navigate } from '@reach/router'
import { connect } from 'react-redux'
import { IState } from '../../../state/types'
import TransactionMonitor from '../../transactionMonitor/transactionMonitor'
import MainContract from '../../../smart-contracts/MainContract'
import {
  SET_ACCOUNT,
  SET_NETWORK,
  AccountActionTypes,
} from '../../../state/account/types'
import {
  SET_CURRENT_STEP,
  SpinUpActionTypes,
} from '../../../state/spinUp/types'
import transactionMonitor from '../../transactionMonitor/transactionMonitor'

interface Props {
  account?: string
  network?: string
  availableName?: string
  jurisdictionName: string
  jurisdictionSelected: string
  jurisdictionStreet: { [key: string]: string }
  dispatch: Dispatch<AccountActionTypes | SpinUpActionTypes>
}

interface Request {
  from?: string
  gas: number
  gasPrice?: string
}

const StepActivateCompany: FC<Props> = ({
  account,
  network,
  availableName,
  jurisdictionSelected,
  jurisdictionName,
  jurisdictionStreet,
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

  const formatBreakLines = (text: string) => {
    return text.split(',').map((elem, idx) => <div key={idx}>{elem}</div>)
  }

  const clickCancelHandler = () => {
    dispatch({ type: SET_CURRENT_STEP, payload: 1 })
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
    MainContract.getContract(network, jurisdictionSelected)
      .methods.createSeries(availableName)
      .send(requestInfo, (error: any, hash: string) => {
        if (error) alert('Something went wrong! Please Try Again Later!')
        else {
          setTransaction(hash)
        }
      })
    // setTransaction(
    //   '0x628048caa2a7e94d994556fc2fbd3ebddb20bb4e99df191cc45bff7558977cf0'
    // )
  }

  const handleConfirmedTransaction = () => {
    dispatch({ type: SET_CURRENT_STEP, payload: 5 })
  }

  return (
    <div className="animate-slide-left">
      {!transaction && (
        <div>
          {/* <p className="normal-text">
            The current deployment cost is approximately. <b>{totalCost} ETH</b>
            .
          </p> */}
          <div>Upon activation, your wallet with address </div>
          <p className="text-primary">{account}</p>
          <div>will be the First Member and Manager of: </div>
          {jurisdictionSelected === 'us_de' && (
            <div>
              <b>{availableName}</b> with registered address at:
            </div>
          )}
          {jurisdictionSelected === 'us_wy' && (
            <div>
              <b>{availableName} - Series ##</b> with registered address at:
            </div>
          )}
          <div className="text-muted">
            {formatBreakLines(jurisdictionStreet[jurisdictionSelected])}
          </div>
          <p>
            You will be able to download your new entity&apos;s Operating
            Agreement after activation.
          </p>
          <div className="d-flex row-cols-2 pt-4 gap-5 flex-row">
            <button
              className="btn btn-primary-outline flex-fill"
              onClick={clickCancelHandler}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary flex-fill"
              onClick={clickActivateHandler}
            >
              Activate Company
            </button>
          </div>
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
  jurisdictionStreet: state.spinUp.jurisdictionStreet,
}))(StepActivateCompany)
