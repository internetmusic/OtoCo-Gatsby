import React, { Dispatch, FC, useState } from 'react'
import { connect } from 'react-redux'
import { IState } from '../../state/types'
import { SpinUpActionTypes } from '../../state/spinUp/types'
import './style.scss'
import CheckName from './checkName'
import ConnectWallet from './connectWallet'
import ApprovePayment from './approvePayment'

interface Props {
  currentStep: number
  dispatch: Dispatch<SpinUpActionTypes>
}

const SpinUp: FC<Props> = ({ currentStep, dispatch }: Props) => {
  return (
    <div className="row">
      <div className="col-4 d-none d-md-block">
        <ul className="list-group">
          <li
            className={`list-group-item ${currentStep === 0 ? 'active' : ''}`}
          >
            Check Name
          </li>
          <li
            className={`list-group-item ${currentStep === 1 ? 'active' : ''}`}
          >
            Connect Wallet
          </li>
          <li
            className={`list-group-item ${currentStep === 2 ? 'active' : ''}`}
          >
            Approve Payment
          </li>
          <li
            className={`list-group-item ${currentStep === 3 ? 'active' : ''}`}
          >
            Activate Company
          </li>
        </ul>
      </div>
      <div className="col-12 col-md-8">
        {currentStep === 0 && <CheckName></CheckName>}
        {currentStep === 1 && <ConnectWallet></ConnectWallet>}
        {currentStep === 1 && <ApprovePayment></ApprovePayment>}
      </div>
    </div>
  )
}

export default connect((state: IState) => ({
  currentStep: state.spinUp.currentStep,
}))(SpinUp)
