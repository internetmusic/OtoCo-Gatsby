import React, { Dispatch, FC, useState } from 'react'
import { connect } from 'react-redux'
import { ChevronLeft, ExclamationCircle, XDiamond } from 'react-bootstrap-icons'
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

const SeriesOverview: FC<Props> = ({
  account,
  network,
  managing,
  jurisdictionOptions,
  dispatch,
}: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <div className="container-sm limiter-md content">
      <div className="card">
        <h6 className="card-header">Plugins</h6>
        <div className="card-body">
          <div className="small">
            Pay taxes, request documents, improve your entity.
          </div>
          {managing !== undefined && (
            <div className="row">
              <div className="mb-5 p-4">
                <button
                  className="btn btn-primary plugin-option"
                  onClick={setModalOpen.bind(undefined, true)}
                >
                  <div className="label">Annual Taxes</div>
                  <XDiamond size={48}></XDiamond>
                  <div className="label">39 USD</div>
                </button>
                {modalOpen}
              </div>
              <PaymentWidget
                show={modalOpen}
                amount={39}
                closeModal={closeModal}
              ></PaymentWidget>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default connect((state: IState) => ({
  account: state.account.account,
  network: state.account.network,
  managing: state.management.managing,
  jurisdictionOptions: state.spinUp.jurisdictionOptions,
}))(SeriesOverview)
