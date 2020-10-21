import React, { Dispatch, FC, useState } from 'react'
import Wyre from 'wyre-widget'
import { connect } from 'react-redux'
import { IState } from '../../../state/types'
import AddressWidget from '../../addressWidget/addressWidget'
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
  const [paymentCompleted, setPaymentCompleted] = useState(false)

  const clickBackHandler = () => {
    dispatch({ type: SET_CURRENT_STEP, payload: 0 })
  }

  const WyreForm = () => (
    <Wyre
      config={{
        env: environment, // test
        // accountId: 'AC_JEFLTVQQPQH',
        accountId: 'AC_BAAA2222',
        // auth: { type: 'metamask' },
        auth: {
          type: 'secretKey',
          secretKey: 'SK-FAAJVVC2-A8LPDU9H-U2HMXUNH-HNTTW8U4',
        },
        operation: {
          type: 'debitcard',
          destCurrency: currency,
          destAmount: fee,
          dest: account,
        },
        style: {
          primaryColor: '#fff',
        },
      }}
      onReady={() => console.log('ready')}
      onClose={() => console.log('close', () => setFormVisible(false))}
      onComplete={() =>
        console.log('complete', () => setPaymentCompleted(true))
      }
      open={formVisible}
    >
      <button className="btn btn-primary" onClick={() => setFormVisible(true)}>
        Buy {currency}
      </button>
    </Wyre>
  )

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
      <p className="small">
        Your Account: <AddressWidget address={account}></AddressWidget>
      </p>
      {/* <p className="small">Choose a form of payment to proceed:</p> */}
      <p>
        Deposit enough <b>{currency}</b> on your account and try again.
      </p>
      {!formVisible && !paymentCompleted && (
        <div className="align-right">
          <button className="btn btn-primary mr-4" onClick={clickBackHandler}>
            Back
          </button>
          <WyreForm></WyreForm>
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
