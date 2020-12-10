import React, { FC } from 'react'
import { connect } from 'react-redux'
import { IState } from '../../state/types'
import CheckName from './stepCheckName/base'
import ConnectWallet from './stepConnectWallet/base'
import Payment from './stepPayment/base'
import ActivateCompany from './stepActivateCompany/base'
import Introduction from './stepIntroduction/base'
import Navigator from './navigator/navigator'

interface Props {
  currentStep: number
}

const SpinUp: FC<Props> = ({ currentStep }: Props) => {
  return (
    <div className="card">
      <div className="row">
        {currentStep > 0 && (
          <div className="col-12">
            <Navigator></Navigator>
          </div>
        )}
        <div className="col-12">
          {currentStep === 0 && <Introduction></Introduction>}
          {currentStep === 1 && <CheckName></CheckName>}
          {currentStep === 2 && <ConnectWallet></ConnectWallet>}
          {currentStep === 3 && <Payment></Payment>}
          {currentStep === 4 && <ActivateCompany></ActivateCompany>}
          {currentStep === 5 && <Confirmation></Confirmation>}
        </div>
      </div>
    </div>
  )
}

export default connect((state: IState) => ({
  currentStep: state.spinUp.currentStep,
}))(SpinUp)
