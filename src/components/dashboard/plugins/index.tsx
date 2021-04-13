import React, { Dispatch, FC, useState } from 'react'
import { connect } from 'react-redux'
import {
  ChevronLeft,
  ExclamationCircle,
  FileMedical,
  XDiamond,
} from 'react-bootstrap-icons'
import Address from '../../addressWidget/addressWidget'
import UTCDate from '../../utcDate/utcDate'
import {
  SeriesType,
  ManagementActionTypes,
} from '../../../state/management/types'
import { IState } from '../../../state/types'
import { IJurisdictionOption } from '../../../state/spinUp/types'
import PaymentWidget from '../../paymentWidget'
import { PaymentsList } from './paymentsList'
import Textile from '../../../services/textile'
import {
  AccountActionTypes,
  DecryptedMailbox,
  SET_OUTBOX_MESSAGES,
} from '../../../state/account/types'

interface Props {
  managing?: SeriesType
  outboxMessages: DecryptedMailbox[]
  dispatch: Dispatch<AccountActionTypes | ManagementActionTypes>
}

interface ModalProps {
  product: string
  amount: number
}

const SeriesOverview: FC<Props> = ({
  managing,
  outboxMessages,
  dispatch,
}: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalInfo, setModalInfo] = useState<ModalProps | null>(null)

  React.useEffect(() => {
    setTimeout(async () => {
      dispatch({
        type: SET_OUTBOX_MESSAGES,
        payload: await Textile.listOutboxMessages(),
      })
    }, 0)
  }, [])

  const closeModal = () => {
    setModalOpen(false)
  }

  const handleSelectPlugin = async (p: string, a: number) => {
    setModalInfo({
      product: p,
      amount: a,
    })
    setModalOpen(true)
  }

  return (
    <div>
      <div className="d-grid gap-1 mb-5">
        <h3 className="m-0">Billing</h3>
        <div className="small">
          Here you can pay for the maintenance of your entities and see what
          else you paid for.
        </div>
        {managing !== undefined && (
          <div className="row">
            <div className="py-4">
              <button
                className="btn btn-primary plugin-option"
                onClick={handleSelectPlugin.bind(undefined, 'Annual Dues', 39)}
              >
                <div className="label">Annual Dues</div>
                <FileMedical size={48}></FileMedical>
                <div className="label">39 USD</div>
              </button>
              {modalOpen}
            </div>
            <PaymentWidget
              show={modalOpen}
              product={modalInfo?.product}
              amount={modalInfo?.amount}
              closeModal={closeModal}
            ></PaymentWidget>
          </div>
        )}
      </div>
      <h3 className="m-0">Payments made</h3>
      <div className="small">
        Easy place to check the payments you have made using plugins
      </div>
      <table className="table small">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">ID/Hash</th>
            <th scope="col" className="text-end">
              Timestamp
            </th>
            <th scope="col" className="text-end">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          <PaymentsList
            contract={managing?.contract}
            messages={outboxMessages}
          ></PaymentsList>
        </tbody>
      </table>
    </div>
  )
}

export default connect((state: IState) => ({
  account: state.account.account,
  network: state.account.network,
  managing: state.management.managing,
  outboxMessages: state.account.outboxMessages,
  jurisdictionOptions: state.spinUp.jurisdictionOptions,
}))(SeriesOverview)
