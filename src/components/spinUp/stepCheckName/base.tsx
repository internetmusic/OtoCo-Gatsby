import React, { Dispatch, FC, useState } from 'react'
import { Link } from 'gatsby'
import axios from 'axios'
import { connect } from 'react-redux'
import { IState } from '../../../state/types'
import {
  SET_CURRENT_STEP,
  SET_COMPANY_NAME,
  SET_AVAILABLE_NAME,
  CLEAR_AVAILABLE_NAME,
  SpinUpActionTypes,
} from '../../../state/spinUp/types'

import JurisdictionSelector from '../jurisdictionSelector/jurisdictionSelector'

interface Props {
  companyName: string
  availableName: string
  jurisdictionName: string
  jurisdictionStreet: { [key: string]: string }
  jurisdictionSelected: string
  dispatch: Dispatch<SpinUpActionTypes>
}

const StepCheckName: FC<Props> = ({
  jurisdictionSelected,
  jurisdictionName,
  jurisdictionStreet,
  companyName,
  availableName,
  dispatch,
}: Props) => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const formatBreakLines = (text: string) => {
    return text.split(',').map((elem, idx) => <div key={idx}>{elem}</div>)
  }

  const clickCheckHandle = () => {
    dispatch({ type: CLEAR_AVAILABLE_NAME })
    setLoading(true)
    axios
      .get(
        `https://api.opencorporates.com/v0.4.8/companies/search?q=${encodeURIComponent(
          companyName + ' LLC'
        )}&jurisdiction_code=${jurisdictionSelected}&api_token=${
          process.env.GATSBY_OPENCORPORATES_KEY
        }`
      )
      .then(function ({ data }) {
        if (data.results.total_count === 0) {
          dispatch({ type: SET_AVAILABLE_NAME })
        } else {
          setError('taken')
          setLoading(false)
        }
      })
      .catch(function (resp) {
        setLoading(false)
        setError('unavailable')
      })
  }

  const clickBackHandle = () => {
    setError('')
    setLoading(false)
    dispatch({ type: CLEAR_AVAILABLE_NAME })
    dispatch({ type: SET_CURRENT_STEP, payload: 0 })
  }

  const clickNextHandle = () => {
    dispatch({ type: SET_CURRENT_STEP, payload: 2 })
    setError('taken')
  }

  const changeNameHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setError('')
    dispatch({ type: SET_COMPANY_NAME, payload: e.currentTarget.value })
  }

  return (
    <div className="row">
      <p>
        Congrats! <b>{availableName}</b> is available for registration with the{' '}
        <b>{jurisdictionName}</b> State Registry.
      </p>
      {jurisdictionSelected == 'us_wy' && (
        <p className="bold-text small">
          The full legal name is{' '}
          <b>OtoCo WY LLC - {availableName} - Series #</b> (the series number).
        </p>
      )}
      {!availableName && (
        <div className="col-12">
          <p>
            Enter your company name exactly
            <br />
            as you want it registered.
          </p>
        </div>
      )}
      {!availableName && (
        <div className="col-12">
          <div className="input-group mb-4">
            <input
              type="text"
              className="form-control right"
              placeholder="Choose your company name"
              aria-label="Text input with dropdown button"
              onChange={changeNameHandler}
            />
            <div className="input-group-append">
              <button type="button" className="btn disabled">
                LLC
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="col-6">
        {!availableName && (
          <div className="col">
            <JurisdictionSelector></JurisdictionSelector>
          </div>
        )}
        <div>
          {error === 'taken' && (
            <div className="mt-4">
              <div className="text-danger">Sorry! This name has been used.</div>
              <div className="small">Please Enter Another Company Name.</div>
            </div>
          )}
          {error === 'unavailable' && (
            <div className="mt-4">
              <div className="text-danger">Sorry! Please try again later.</div>
              <div className="small">Search API service is busy.</div>
            </div>
          )}
        </div>
      </div>
      <div className="col-6">
        <p>{formatBreakLines(jurisdictionStreet[jurisdictionSelected])}</p>
      </div>
      <div className="col-12">
        {!availableName && (
          <div className="d-flex pt-4 gap-2 flex-row">
            <button
              type="button"
              className="btn btn-primary flex-fill"
              onClick={clickBackHandle}
            >
              Back
            </button>
            {!loading && (
              <button
                type="button"
                className="btn btn-primary flex-fill"
                onClick={clickCheckHandle}
              >
                Check
              </button>
            )}
            {loading && (
              <button className="btn" type="button">
                Checking...{' '}
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              </button>
            )}
          </div>
        )}
        {availableName && (
          <div className="d-flex pt-4 gap-2 flex-row">
            <button
              type="button"
              className="btn btn-primary flex-fill"
              onClick={clickBackHandle}
            >
              Back
            </button>
            <button
              type="button"
              className="btn btn-primary flex-fill"
              onClick={clickNextHandle}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default connect((state: IState) => ({
  availableName: state.spinUp.availableName,
  companyName: state.spinUp.companyName,
  jurisdictionSelected: state.spinUp.jurisdictionSelected,
  jurisdictionName: state.spinUp.jurisdictionName,
  jurisdictionStreet: state.spinUp.jurisdictionStreet,
}))(StepCheckName)
