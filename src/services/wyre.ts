// DOCS => https://docs.sendwyre.com/v3/docs/wyre-checkout-hosted-dialog
import axios from 'axios'

type WyreResponseType = {
  url: string
  reservation: string
}

const paymentAddress = process.env.GATSBY_WYRE_WALLET

const options = {
  headers: {
    Authorization: process.env.GATSBY_WYRE_KEY,
    'Content-Type': 'application/json',
  },
}

export enum WyreEnv {
  TEST = 'https://api.testwyre.com',
  PROD = 'https://api.sendwyre.com',
}

// https://api.testwyre.com/v3/orders/WO_74ZARHGVXZ
export const requestPaymentWyre = async (
  env: WyreEnv,
  amount: number,
  target?: string
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(
        `${env}/v3/orders/reserve`,
        {
          destCurrency: 'DAI',
          paymentMethod: 'debit-card',
          referrerAccountId: process.env.GATSBY_WYRE_ID,
          dest: `ethereum:${target != undefined ? target : paymentAddress}`,
          amount,
          lockFields: ['dest', 'destCurrency', 'paymentMethod'],
        },
        options
      )
      const widget = new Wyre({
        env: env == WyreEnv.TEST ? 'test' : 'prod',
        reservation: res.data.reservation,
        operation: {
          type: 'debitcard-hosted-dialog',
        },
      })
      if (!widget) {
        throw 'Failed to initialize Wyre Widget' + res.data.reservation
      }
      widget.open()
      widget.on('paymentSuccess', function (e) {
        console.log('paymentSuccess', e)
        resolve(`${env}/v3/orders/${e.id}`)
      })
      setTimeout(() => {
        throw 'Payment timed out.' + res.data.reservation
      }, 1000 * 60 * 30)
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}
