// DOCS => https://docs.sendwyre.com/v3/docs/wyre-checkout-hosted-dialog
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Wyre from './wyre-core'

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
): Promise<{
  id: string
  timestamp: number
}> => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(
        `${env}/v3/orders/reserve`,
        {
          destCurrency: 'BTC',
          paymentMethod: 'debit-card',
          referrerAccountId: process.env.GATSBY_WYRE_ID,
          // dest: `ethereum:${target != undefined ? target : paymentAddress}`,
          dest: `bitcoin:18CMC3NivVu3ywFbCvtzWLc6nAnzLCpgNS`,
          amount,
          lockFields: ['dest', 'destCurrency', 'paymentMethod', 'amount'],
        },
        options
      )
      const wyre = Wyre()
      const widget = new wyre.Widget({
        debug: true,
        apiKey: process.env.GATSBY_WYRE_KEY,
        reservation: res.data.reservation,
        auth: { type: 'metamask' },
        env: env == WyreEnv.TEST ? 'test' : 'prod',
        operation: {
          type: 'debitcard-hosted-dialog',
        },
        type: 'offramp',
        web3PresentInParentButNotChild: false,
      })
      if (!widget) {
        throw 'Failed to initialize Wyre widget' + res.data.reservation
      }
      widget.open()
      widget.on('paymentSuccess', async (e) => {
        console.log('event', e)
        const order = await axios.get(`${env}/v3/orders/${e.data.orderId}`)
        resolve({
          timestamp: order.data.createdAt,
          id: order.data.id,
        })
      })
      const checkWindowOpen = () => {
        try {
          if (!widget.getTargetWindow().closed) {
            setTimeout(checkWindowOpen, 1000)
          } else {
            widget.removeAllListeners()
            widget.getTargetWindow().close()
            console.log('Cleared Widget Listeners')
            reject()
          }
        } catch (err) {
          setTimeout(checkWindowOpen, 1000)
        }
      }
      checkWindowOpen()
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}

// data:
//   data:
//     accountId: "account:AC_ZVFDXHDNVG9"
//     blockchainNetworkTx: null
//     dest: "ethereum:0xa484165bd8E535F11C5820205E98d18DF8d22Bf7"
//     destAmount: 39
//     fees: "{"USD":5,"DAI":3}"
//     orderId: "WO_F2AAQQWYL6"
//     transferId: "TF_ZEFYMPBRBBW"
