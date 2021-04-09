import React, { Dispatch, FC, useState } from 'react'
import web3 from 'web3'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { SeriesType, ManagementActionTypes } from '../../state/management/types'
import { IState } from '../../state/types'
import './style.scss'
import { XDiamond, CreditCard, Diamond } from 'react-bootstrap-icons'
import ERC20Contract from '../../smart-contracts/ERC20'
import TransactionUtils from '../../services/transactionUtils'
import { requestPaymentWyre, WyreEnv } from '../../services/wyre'
import { PrivateKey } from '@textile/crypto'
import { PaymentMessage, PaymentProps } from '../../state/account/types'
import Textile from '../../services/textile'

enum StatusType {
  CLOSED = 'closed',
  OPENED = 'opened',
  PROCESSING = 'processing',
  SUCCESS = 'success',
}

interface Props {
  account?: string
  network?: string
  privatekey?: PrivateKey
  managing?: SeriesType
  show: boolean
  product: string
  amount: number
  closeModal: () => void
  dispatch: Dispatch<ManagementActionTypes>
}

const PaymentWidget: FC<Props> = ({
  account,
  network,
  privatekey,
  managing,
  show,
  product,
  amount,
  closeModal,
  dispatch,
}: Props) => {
  const [status, setStatus] = useState<StatusType>(StatusType.CLOSED)
  const [countdown, setCountdown] = useState<boolean>(false)
  // Recept informations
  const [receipt, setReceipt] = useState<PaymentProps | null>(null)
  const [error, setError] = useState<string>('')

  React.useEffect(() => {
    if (show) {
      setStatus(StatusType.OPENED)
      setTimeout(() => {
        setCountdown(true)
      }, 200)
    } else {
      setStatus(StatusType.CLOSED)
      setCountdown(false)
    }
  }, [show])

  const handleWyrePayment = async () => {
    const env = network == 'main' ? WyreEnv.PROD : WyreEnv.TEST
    if (!account || !network) return
    setStatus(StatusType.PROCESSING)
    try {
      const response = await requestPaymentWyre(env, amount)
      const receipt: PaymentProps = {
        receipt: response.id,
        method: 'WYRE',
        currency: 'USD',
        timestamp: response.timestamp,
      }
      setReceipt(receipt)
      setStatus(StatusType.SUCCESS)
      await sendPaymentMessage(receipt)
    } catch (err) {
      setStatus(StatusType.OPENED)
      setError('Payment failed or cancelled.')
      console.log('PAYMENT CANCELLED', err)
    }
  }
  const handleDAIPayment = async () => {
    if (!account || !network) return
    setError('')
    setStatus(StatusType.PROCESSING)
    try {
      const requestInfo = await TransactionUtils.getTransactionRequestInfo(
        account,
        '60000'
      )
      const r = await ERC20Contract.getContractDAI(network)
        .methods.transfer(
          process.env.GATSBY_WYRE_WALLET,
          web3.utils.toWei(amount.toString(), 'ether')
        )
        .send(requestInfo)
      if (!r.status) throw 'Transaction Errored'
      console.log('receipt', r)
      const receipt: PaymentProps = {
        receipt: r.transactionHash,
        method: 'DAI',
        currency: 'DAI',
        timestamp: Date.now(),
      }
      setReceipt(receipt)
      setStatus(StatusType.SUCCESS)
      await sendPaymentMessage(receipt)
    } catch (err) {
      setStatus(StatusType.OPENED)
      setError('Payment failed or cancelled.')
      console.log('PAYMENT CANCELLED', err)
    }
  }
  const handleUSDTPayment = async () => {
    if (!account || !network) return
    setError('')
    setStatus(StatusType.PROCESSING)
    try {
      const requestInfo = await TransactionUtils.getTransactionRequestInfo(
        account,
        '60000'
      )
      const r = await ERC20Contract.getContractUSDT(network)
        .methods.transfer(
          process.env.GATSBY_WYRE_WALLET,
          web3.utils.toWei(amount.toString(), 'ether')
        )
        .send(requestInfo)
      if (!r.status) throw 'Transaction Errored'
      console.log('receipt', r)
      const receipt: PaymentProps = {
        receipt: r.transactionHash,
        method: 'USDT',
        currency: 'USDT',
        timestamp: Date.now(),
      }
      setReceipt(receipt)
      setStatus(StatusType.SUCCESS)
      // TODO In case of error sending message, suggest to RESEND receipt.
      await sendPaymentMessage(receipt)
    } catch (err) {
      // In case of error sending confirmation message
      if (status != StatusType.SUCCESS) {
        setStatus(StatusType.OPENED)
        setError('Payment failed or cancelled.')
        console.log('PAYMENT CANCELLED', err)
      } else {
        setError(
          'Error sending receipt to oracle, wait some minutes and click Re-send message.'
        )
      }
    }
  }
  const handleCloseModal = async () => {
    setError('')
    setReceipt(null)
    setStatus(StatusType.CLOSED)
  }
  const sendPaymentMessage = async (receipt: PaymentProps) => {
    if (!privatekey) throw 'Error sending payment. No Private Key present.'
    if (!process.env.GATSBY_ORACLE_KEY)
      throw 'Error sending payment. No Oracle public key set.'
    if (!managing) throw 'Error sending payment. No receipt/company found.'
    console.log('PAYMENT', receipt)
    const message: PaymentMessage = {
      _id: receipt.receipt,
      method: receipt.method,
      currency: receipt.currency,
      entity: managing.contract,
      environment: network,
      timestamp: receipt.timestamp,
      product,
      amount,
      status: 'PROCESSING',
    }
    await Textile.sendMessage(process.env.GATSBY_ORACLE_KEY, {
      method: 'payment',
      message,
    })
    console.log('PAYMENT MESSAGE SENT')
  }

  return (
    <div>
      {status !== StatusType.CLOSED && (
        <div className="modal-widget">
          <CSSTransition
            in={countdown}
            timeout={{
              appear: 200,
              enter: 200,
              exit: 200,
            }}
            classNames="slide-up"
            unmountOnExit
          >
            <div className="modal-content">
              <div
                className={`close ${
                  status == StatusType.OPENED || status == StatusType.SUCCESS
                }`}
                onClick={handleCloseModal}
              >
                &times;
              </div>
              {status == StatusType.OPENED && (
                <div>
                  <h3>Payment method</h3>
                  <div className="small">{product}</div>
                  <div className="row justify-content-center">
                    <button
                      className="btn btn-primary modal-option"
                      onClick={handleWyrePayment}
                    >
                      <CreditCard
                        className="text-primary"
                        size={48}
                      ></CreditCard>
                      <div className="label">Credit card ${amount}</div>
                    </button>
                    <button
                      className="btn btn-primary modal-option"
                      onClick={handleDAIPayment}
                    >
                      <XDiamond className="text-primary" size={48}></XDiamond>
                      <div className="label">{amount} DAI</div>
                    </button>
                    <button
                      className="btn btn-primary modal-option"
                      onClick={handleUSDTPayment}
                    >
                      <Diamond className="text-primary" size={48}></Diamond>
                      <div className="label">{amount} USDT</div>
                    </button>
                  </div>
                  <p className="small">
                    After payment is confirmed by our system, you will receive
                    an e-mail and a confirmation will appear on respective
                    screen.
                  </p>
                  {error && <p className="small text-warning">{error}</p>}
                </div>
              )}
              {status == StatusType.PROCESSING && (
                <div>
                  <h3>Processing Payment</h3>
                  <div className="small">{product}</div>
                  <div
                    className="row justify-content-center align-items-center"
                    style={{ minHeight: '230px' }}
                  >
                    <div className="col">
                      <div className="col-12 text-center">
                        <div className="spinner-border" role="status"></div>
                      </div>
                      <div className="col-12 text-center">
                        <b>Waiting payment conclusion</b>
                      </div>
                      <div className="col-12 text-center text-warning">
                        Do not close or refresh page
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {status == StatusType.SUCCESS && (
                <div>
                  <h3>Payment Successfull</h3>
                  <div
                    className="row  align-items-center justify-content-center small"
                    style={{ minHeight: '230px' }}
                  >
                    <div className="col-12">
                      <b>{product}</b>
                    </div>
                    <div className="col-12">
                      <b>company: </b>
                      <span className="text-primary">
                        {managing?.name} ({managing?.jurisdiction})
                      </span>
                    </div>
                    <div className="col-12">
                      <b>receipt: </b>
                      <span className="text-primary">{receipt?.receipt}</span>
                    </div>
                    <div className="col-12">
                      <b>method: </b>
                      <span className="text-primary">{receipt?.method}</span>
                    </div>
                    <div className="col-12">
                      <b>amount: </b>
                      <span className="text-primary">{amount}</span>
                    </div>
                  </div>
                  {error && <p className="small text-warning">{error}</p>}
                </div>
              )}
            </div>
          </CSSTransition>
        </div>
      )}
    </div>
  )
}

export default connect((state: IState) => ({
  account: state.account.account,
  network: state.account.network,
  privatekey: state.account.privatekey,
  managing: state.management.managing,
}))(PaymentWidget)
