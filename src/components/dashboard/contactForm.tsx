import React, { Dispatch, FC, useState } from 'react'
import { connect } from 'react-redux'
import { IState } from '../../state/types'
import {
  SET_CONTACT_FORM,
  SeriesType,
  ManagementActionTypes,
} from '../../state/management/types'

import oracle from '../../services/oracle'

interface Props {
  account: string
  managing?: SeriesType
  dispatch: Dispatch<ManagementActionTypes>
}

const ContactForm: FC<Props> = ({ account, dispatch }: Props) => {
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleClickNext = () => {
    if (!email) {
      setError('* to save your contact we need at least your e-mail.')
      return
    }
    if (!validateEmail(email)) {
      setError('* please fill a valid e-mail.')
      return
    }
    setError('')
    //database.fillForm(account, email)
    oracle.saveIdentity(account, email)
    dispatch({ type: SET_CONTACT_FORM, payload: false })
  }

  const handleClickSkip = () => {
    window.localStorage.setItem('contactFormLastRequest', new Date().toString())
    dispatch({ type: SET_CONTACT_FORM, payload: false })
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="ui celled contact-form animate-slide">
          <p>
            Before accessing your dashboard, we ask you to provide us with basic
            contact information. The only required field is your email address.
            We will only ever use your address to send you reminders about
            expiring services (annual company renewal, etc) and to update you
            about OtoCo`s development.
          </p>
          <p></p>
          <div className="row">
            <div className="input-group mb-4 col-12 col-md-8">
              <input
                type="text"
                className="form-control right"
                placeholder="johndoe@domain.com"
                onChange={handleChangeEmail}
              />
              <div className="input-group-append">
                <div className="btn btn-primary disabled">E-mail Address</div>
              </div>
            </div>
          </div>
          {error && <p className="text-danger">{error}</p>}
          <p>
            <button className="btn btn-primary" onClick={handleClickNext}>
              Save Contact Information
            </button>
          </p>
          <p style={{ fontSize: '11px', width: '60%' }}>
            You can also decide not to provide any contact information, but in
            this case we can’t remind you about expiry dates and other important
            deadlines.{' '}
            <a href="#" onClick={handleClickSkip}>
              Click Here
            </a>{' '}
            to skip this form.
          </p>
        </div>
      </div>
    </div>
  )
}

export default connect((state: IState) => ({
  account: state.account.account,
  managing: state.management.managing,
}))(ContactForm)
