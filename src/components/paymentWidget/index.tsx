import React, { Dispatch, FC, useState } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { SeriesType, ManagementActionTypes } from '../../state/management/types'
import { IState } from '../../state/types'
import './style.scss'
import {
  Bell,
  BellFill,
  XDiamond,
  Clipboard,
  ChevronDown,
  PencilSquare,
  BoxArrowRight,
} from 'react-bootstrap-icons'

interface Props {
  account?: string | null
  network?: string | null
  managing?: SeriesType
  show: boolean
  amount: number
  closeModal: () => void
  dispatch: Dispatch<ManagementActionTypes>
}

enum StatusType {
  CLOSED = 'closed',
  OPENED = 'opened',
  PROCESSING = 'processing',
  SUCCESS = 'success',
}

const PaymentWidget: FC<Props> = ({
  account,
  network,
  managing,
  show,
  amount,
  closeModal,
  dispatch,
}: Props) => {
  const [status, setStatus] = useState<StatusType>(StatusType.CLOSED)
  const [countdown, setCountdown] = useState<boolean>(false)

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
              <div className="close" onClick={closeModal}>
                &times;
              </div>
              <h3>Payment method</h3>
              <div className="row  justify-content-center">
                <button className="btn btn-primary modal-option">
                  <div className="label">Credit-card</div>
                  <XDiamond size={48}></XDiamond>
                </button>
                <button className="btn btn-primary modal-option">
                  <div className="label">{amount} DAI</div>
                  <XDiamond size={48}></XDiamond>
                </button>
                <button className="btn btn-primary modal-option">
                  <div className="label">{amount} USDT</div>
                  <XDiamond size={48}></XDiamond>
                </button>
              </div>
              <p className="small">
                After payment is confirmed by our system, you will receive an
                e-mail and a confirmation will appear on respective screen.
              </p>
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
  managing: state.management.managing,
}))(PaymentWidget)
