import React, { FC } from 'react'
import { connect } from 'react-redux'
import { IState } from '../../state/types'
import CheckName from './stepOneCheckName/base'
import ConnectWallet from './stepTwoConnectWallet/base'
import Payment from './stepThreePayment/base'
import ActivateCompany from './stepFourActivateCompany/base'

interface Props {
  currentStep: number
}

const SpinUp: FC<Props> = ({ currentStep }: Props) => {
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
        {currentStep === 2 && <Payment></Payment>}
        {currentStep === 3 && <ActivateCompany></ActivateCompany>}
      </div>
    </div>
  )
}

export default connect((state: IState) => ({
  currentStep: state.spinUp.currentStep,
}))(SpinUp)
