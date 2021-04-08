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

interface Props {
  account?: string | null
  network?: string | null
  managing?: SeriesType
  jurisdictionOptions: IJurisdictionOption[]
  dispatch: Dispatch<ManagementActionTypes>
}

interface ModalProps {
  product: string
  amount: number
}

const SeriesOverview: FC<Props> = ({
  account,
  network,
  managing,
  jurisdictionOptions,
  dispatch,
}: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalInfo, setModalInfo] = useState<ModalProps | null>(null)

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
        <h3 className="m-0">Plugins</h3>
        <div className="small">
          Pay taxes, request documents, improve your entity.
        </div>
        {managing !== undefined && (
          <div className="row">
            <div className="py-4">
              <button
                className="btn btn-primary plugin-option"
                onClick={handleSelectPlugin.bind(undefined, 'Anual Taxes', 39)}
              >
                <div className="label">Anual Taxes</div>
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
      <h3 className="m-0">Payment Confirmation</h3>
      <div className="small">
        Easy place to check the payments you have made using plugins
      </div>
      <table className="table small">
        <thead>
          <tr>
            <th scope="col">Transaction or Plugin</th>
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
          <tr>
            <td>Teste</td>
            <td>Teste</td>
            <td>Teste</td>
            <td>Teste</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default connect((state: IState) => ({
  account: state.account.account,
  network: state.account.network,
  managing: state.management.managing,
  jurisdictionOptions: state.spinUp.jurisdictionOptions,
}))(SeriesOverview)
