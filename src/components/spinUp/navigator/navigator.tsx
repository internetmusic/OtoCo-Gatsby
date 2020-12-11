import React, { FC } from 'react'
import { connect } from 'react-redux'
import { IState } from '../../state/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import step1Icon from '../../../../public/img/spinup1.svg'
import step2Icon from '../../../../public/img/spinup2.svg'
import step3Icon from '../../../../public/img/spinup3.svg'
import step4Icon from '../../../../public/img/spinup4.svg'
import './style.scss'
interface Props {
  step: number
}

const Navigator: FC<Props> = ({ step }: Props) => {
  const iconClass = 'nav-icon flex-sm-fill'

  return (
    <nav className="nav flex-row">
      <FontAwesomeIcon
        className={step > 1 ? 'nav-badge' : 'invisible'}
        icon={faCheckCircle}
        size="xs"
      ></FontAwesomeIcon>
      <div className="text-sm-start">
        <img src={step1Icon} alt="Step 1 Icon" />
        <div className="small text-sm-center text-primary">Check Name</div>
      </div>
      <div className="nav-hr flex-sm-fill text-sm-start">
        <hr></hr>
      </div>
      <FontAwesomeIcon
        className={step > 2 ? 'nav-badge' : 'invisible'}
        icon={faCheckCircle}
        size="xs"
      ></FontAwesomeIcon>
      <div
        className={
          step > 2
            ? iconClass + 'text-sm-center'
            : iconClass + 'text-sm-center o-50'
        }
      >
        <img src={step2Icon} alt="Step 2 Icon" />
        <div className="small text-sm-center text-primary">Connect Wallet</div>
      </div>
      <div className="nav-hr flex-sm-fill text-sm-start">
        <hr></hr>
      </div>
      <FontAwesomeIcon
        className={step > 3 ? 'nav-badge' : 'invisible'}
        icon={faCheckCircle}
        size="xs"
      ></FontAwesomeIcon>
      <div
        className={
          step > 3
            ? iconClass + 'text-sm-center'
            : iconClass + 'text-sm-center o-50'
        }
      >
        <img src={step3Icon} alt="Step 3 Icon" />
        <div className="small text-sm-center text-primary">Approve Payment</div>
      </div>
      <div className="nav-hr flex-sm-fill text-sm-start">
        <hr></hr>
      </div>
      <FontAwesomeIcon
        className={step > 4 ? 'nav-badge' : 'invisible'}
        icon={faCheckCircle}
        size="xs"
      ></FontAwesomeIcon>
      <div
        className={
          step > 2 ? iconClass + 'text-sm-end' : iconClass + 'text-sm-end o-50'
        }
      >
        <img src={step4Icon} alt="Step 4 Icon" />
        <div className="small text-sm-center text-primary">
          Review & Activate
        </div>
      </div>
    </nav>
  )
}

export default connect((state: IState) => ({
  currentStep: state.spinUp.currentStep,
}))(Navigator)
