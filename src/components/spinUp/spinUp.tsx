import React, { FC } from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'

import { IState } from '../../state/types'
import Introduction from './stepIntroduction/base'
import CheckName from './stepCheckName/base'
import ConnectWallet from './stepConnectWallet/base'
import Payment from './stepPayment/base'
import ActivateCompany from './stepActivateCompany/base'
import Confirmation from './stepConfirmation/base'
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
            <Navigator step={currentStep}></Navigator>
          </div>
        )}
        <div className="col-12">
          <CSSTransition
            in={currentStep === 0}
            timeout={{
              appear: 200,
              enter: 200,
              exit: 0,
            }}
            classNames="my-node"
            unmountOnExit
          >
            <Introduction></Introduction>
          </CSSTransition>
          <CSSTransition
            in={currentStep === 1}
            timeout={{
              appear: 200,
              enter: 200,
              exit: 0,
            }}
            classNames="my-node"
            unmountOnExit
          >
            <CheckName></CheckName>
          </CSSTransition>
          <CSSTransition
            in={currentStep === 2}
            timeout={{
              appear: 200,
              enter: 200,
              exit: 0,
            }}
            classNames="my-node"
            unmountOnExit
          >
            <ConnectWallet></ConnectWallet>
          </CSSTransition>
          <CSSTransition
            in={currentStep === 3}
            timeout={{
              appear: 200,
              enter: 200,
              exit: 0,
            }}
            classNames="my-node"
            unmountOnExit
          >
            <Payment></Payment>
          </CSSTransition>
          <CSSTransition
            in={currentStep === 4}
            timeout={{
              appear: 200,
              enter: 200,
              exit: 0,
            }}
            classNames="my-node"
            unmountOnExit
          >
            <ActivateCompany></ActivateCompany>
          </CSSTransition>
          <CSSTransition
            in={currentStep === 5}
            timeout={{
              appear: 200,
              enter: 200,
              exit: 0,
            }}
            classNames="my-node"
            unmountOnExit
          >
            <Confirmation></Confirmation>
          </CSSTransition>
        </div>
      </div>
    </div>
  )
}

export default connect((state: IState) => ({
  currentStep: state.spinUp.currentStep,
}))(SpinUp)
