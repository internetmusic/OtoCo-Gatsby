import React, { FC, useState } from 'react'
import Web3 from 'web3'
import { TransactionReceipt } from 'web3-core'
import { connect } from 'react-redux'
import { IState } from '../../state/types'
import Icon from '../icon/icon'
import {
  faCheck,
  faCheckDouble,
  faExclamationCircle,
  faSpinner,
  faClock,
} from '@fortawesome/free-solid-svg-icons'

interface Props {
  hash: string
  title: string
  network: string | null
  // eslint-disable-next-line @typescript-eslint/ban-types
  callbackSuccess?: Function<TransactionReceipt> | null | undefined
  // eslint-disable-next-line @typescript-eslint/ban-types
  callbackError?: Function<string> | null | undefined
}

const TransactionMonitor: FC<Props> = ({
  hash,
  title,
  network,
  callbackSuccess,
  callbackError,
}: Props) => {
  const web3: Web3 = window.web3
  const [exists, setExists] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState('Fetching transaction')
  const [receipt, setReceipt] = useState<TransactionReceipt | null>()
  const [cost, setCost] = useState(0)
  const [counter, setCounter] = useState(0)
  const [blockNumber, setBlockNumber] = useState(0)
  const [confirmations, setConfirmations] = useState(0)

  React.useEffect(() => {
    setTimeout(async () => {
      if (confirmations > 0) {
        if (callbackSuccess) callbackSuccess(receipt)
      }
      try {
        const transaction = await new Promise((resolve, reject) => {
          web3.eth.getTransaction(hash, (err, tx) => {
            try {
              setCost(parseFloat(web3.utils.fromWei(tx.gasPrice)) * tx.gas)
            } catch (err) {}
            if (err) reject(err)
            else resolve(tx)
          })
        })
        if (transaction) setExists(true)
        else setMessage('Fetching transaction')
        if (receipt) {
          setBlockNumber(receipt.blockNumber)
          web3.eth.getBlockNumber((error, blockNum) => {
            setConfirmations(Math.max(0, blockNum - receipt.blockNumber))
            setReceipt(receipt)
            if (blockNum - receipt.blockNumber <= 0)
              setMessage('Waiting for confirmation')
            if (blockNum - receipt.blockNumber > 0)
              setMessage('Transaction confimed')
          })
        } else setMessage('Waiting to be mined')
      } catch (err) {
        console.log(err)
        if (hash.length !== 66) {
          setError('Not a valid transaction hash')
        }
        setTimeout(() => {
          if (callbackError) callbackError(err)
        }, 3000)
      }
      setCounter(counter + 2)
    }, 2000)
  }, [hash, counter])

  return (
    <div className="card transaction-card">
      <div className="card-body">
        <div className="card-title">
          <i className="file outline massive icon"></i>
          {error && <Icon icon={faExclamationCircle} size="10x" />}
          {!exists && !error && <Icon icon={faSpinner} size="9x" />}
          {exists && !error && <Icon icon={faCheck} size="9x" />}
          {confirmations === 0 && !error && (
            <Icon icon={faSpinner} size="2x" spin={true} />
          )}
          {confirmations > 0 && !error && (
            <Icon icon={faCheckDouble} size="9x" />
          )}
        </div>
        <div className="card-title">{title}</div>
        <div className="card-text">
          <div className="small">
            Transaction hash:{' '}
            <a
              href={`https://${
                network === 'main' ? '' : network + '.'
              }etherscan.io/tx/${hash}`}
              target="_blank"
              rel="noreferrer"
            >
              {hash.substring(0, 32)} ...
            </a>{' '}
          </div>
          <div className="small">Transaction Block: {blockNumber}</div>
          <div className="small">Confirmations: {confirmations}</div>
          <div className="small">Estimated cost: {cost} ETH</div>
        </div>
        <div className="card-footer">
          <Icon icon={faClock} size="1x" spin={true} /> {counter} seconds ...
          {error && <div style={{ float: 'right' }}>{error}</div>}
          {!error && <div style={{ float: 'right' }}>{message}</div>}
        </div>
      </div>
    </div>
  )
}

export default connect((state: IState) => ({
  network: state.account.network,
}))(TransactionMonitor)
