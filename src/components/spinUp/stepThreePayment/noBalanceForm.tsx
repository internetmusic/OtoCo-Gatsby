import React, { Dispatch, FC, useState } from 'react'
import Wyre from 'wyre-widget'
import { connect } from 'react-redux'
import { IState } from '../../../state/types'
import AddressWidget from '../../addressWidget/addressWidget'
import { TokenConversionWidget } from 'react-defi-widget'
import {
  SET_CURRENT_STEP,
  SpinUpActionTypes,
} from '../../../state/spinUp/types'

interface Props {
  balance: string
  fee: number
  currency: string
  environment: string
  account?: string
  network?: string
  dispatch: Dispatch<SpinUpActionTypes>
}

const NoBalanceForm: FC<Props> = ({
  balance,
  fee,
  currency,
  environment,
  account,
  dispatch,
}: Props) => {
  const [formVisible, setFormVisible] = useState(false)
  const [swapVisible, setSwapVisible] = useState(false)
  const [paymentCompleted, setPaymentCompleted] = useState(false)

  const clickBackHandler = () => {
    dispatch({ type: SET_CURRENT_STEP, payload: 0 })
  }

  const genSecretKey = () => {
    return Array.prototype.map
      .call(window.crypto.getRandomValues(new Uint8Array(25)), (x) =>
        ('00' + x.toString(16)).slice(-2)
      )
      .join('')
  }

  return (
    <div>
      <p>
        You have not enough <b>{currency}</b> to pay for spin up tax.{' '}
        <b>
          {balance} {currency}
        </b>{' '}
        available from{' '}
        <b>
          {fee} {currency}
        </b>{' '}
        needed.
      </p>
      {/* <p className="small">Choose a form of payment to proceed:</p> */}
      <div className="small">
        Some suggested places to swap some DAI:
        <ul>
          <li>
            <a href="http://app.uniswap.org" target="_blank" rel="noreferrer">
              UniSwap Dex
            </a>{' '}
            Trade ETH/DAI
          </li>
          <li>
            <a href="http://1inch.exchange" target="_blank" rel="noreferrer">
              1inch Enchange
            </a>{' '}
            Trade ETH/DAI
          </li>
          <li>
            <a href="http://1inch.exchange" target="_blank" rel="noreferrer">
              Maker DAO Oasis
            </a>{' '}
            Trade or Borrow ETH/DAI
          </li>
        </ul>
        <Wyre
          config={{
            env: 'testwyre',
            accountId: 'AC_JEFLTVQQPQH', // put your account number here
            auth: {
              type: 'secretKey',
              secretKey: 'SK-4EZV7WXH-HPR9XZ9J-NZ4WDNU7-3YJZ4GQP', // make an API key, put the secret here :)
            },
            operation: {
              type: 'debitcard',
              destCurrency: currency,
              destAmount: fee,
              dest: `ethereum:${account}`,
            },
            style: {
              primaryColor: '#2EE8CF',
            },
          }}
          onReady={() => console.log('ready')}
          onClose={() => console.log('close', () => setFormVisible(false))}
          onComplete={() =>
            console.log('complete', () => setPaymentCompleted(true))
          }
          open={formVisible}
        >
          <span>
            You can also{' '}
            <a href="#" className="" onClick={() => setFormVisible(true)}>
              Buy {currency}
            </a>{' '}
            with Wyre using debit-card.
          </span>
        </Wyre>
      </div>
      {!paymentCompleted && (
        <div className="align-right mt-4">
          <button className="btn btn-primary mr-4" onClick={clickBackHandler}>
            Back
          </button>
        </div>
      )}
      {paymentCompleted && (
        <p>
          Payment procedure completed. You will be redirected to next step soon
          enough balance appear on your account.
        </p>
      )}
    </div>
  )
}

export default connect((state: IState) => ({
  account: state.account.account,
  network: state.account.network,
}))(NoBalanceForm)
