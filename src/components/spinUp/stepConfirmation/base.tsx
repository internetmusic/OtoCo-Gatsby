import React, { FC } from 'react'
import { connect } from 'react-redux'
import { IState } from '../../../state/types'
import ConfirmationIllustration from '../../../../static/img/spinup-finished-illustration.svg'
import ConfirmationAnimationWebM from '../../../../static/video/spinup-finished-animation.webm'
import { Link } from 'gatsby'

interface Props {
  companyName: string
  companyContract: string
}

const StepConfirmation: FC<Props> = ({
  companyName,
  companyContract,
}: Props) => {
  return (
    <div className="row">
      <div className="col-12 text-center mb-4 mt-2">
        <video
          width={'264px'}
          muted
          autoPlay
          loop
          preload={'auto'}
          poster={ConfirmationIllustration}
        >
          <source src={ConfirmationAnimationWebM} type={'video/webm'} />
        </video>
      </div>
      <div className="col-12 mb-4">
        All set! {companyName} is activated. Go to the dashpanel to manage it
        and read our FAQ or use our help desk if you have any questions.
      </div>
      <div className="d-flex row-cols-2 pt-4 gap-5 flex-row">
        <Link
          className="btn btn-primary flex-fill"
          to={`/dashpanel/entity/${companyContract}`}
        >
          Go To Dashpanel
        </Link>
      </div>
    </div>
  )
}

export default connect((state: IState) => ({
  companyName: state.spinUp.companyName,
  companyContract: state.spinUp.companyContract,
}))(StepConfirmation)
