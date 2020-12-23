import React, { Dispatch, FC, useState } from 'react'
import Web3 from 'web3'
import { navigate } from '@reach/router'
import { connect } from 'react-redux'
import { IState } from '../../../state/types'
import illustrationConfirmation from '../../../../static/img/illustration-3.png'

interface Props {
  companyName: string
}

const StepConfirmation: FC<Props> = ({ companyName }: Props) => {
  const clickToDashboard = async () => {
    navigate('/dashboard')
  }

  return (
    <div className="row">
      <div className="col-12 text-center mb-4 mt-2">
        <img
          className="feature-icon"
          src={illustrationConfirmation}
          alt="Big Feature Icon"
          height="192px"
        />
      </div>
      <div className="col-12 mb-4">
        All set! {companyName} is activated. Go to the dashpanel to manage it
        and read our FAQ or use our help desk if you have any questions.
      </div>
      <div className="d-flex row-cols-2 pt-4 gap-5 flex-row">
        <button
          type="button"
          className="btn btn-primary flex-fill"
          onClick={clickToDashboard}
        >
          Go To Dashpanel
        </button>
      </div>
    </div>
  )
}

export default connect((state: IState) => ({
  companyName: state.spinUp.companyName,
}))(StepConfirmation)
