import React, { Dispatch, FC, useState } from 'react'
import { connect } from 'react-redux'
import { IState } from '../../state/types'
import {
  SET_JURISDICTION,
  SpinUpActionTypes,
  ISpinUpState,
  IJurisdictionOption,
} from '../../state/spinUp/types'
import './style.scss'

interface Props {
  jurisdictionSelected: string
  jurisdictionName: string
  jurisdictionOptions: IJurisdictionOption[]
  jurisdictionStreet: { [key: string]: string }
  dispatch: Dispatch<SpinUpActionTypes>
}

const JurisdictionSelector: FC<Props> = ({
  jurisdictionSelected,
  jurisdictionOptions,
  jurisdictionName,
  dispatch,
}: Props) => {
  const clickHandle = () => {
    // dispatch({ type: SET_CURRENT_STEP, payload: 1 })
  }

  const selectJurisdictionHandler = (val: IJurisdictionOption) => {
    console.log(val)
    dispatch({ type: SET_JURISDICTION, payload: val })
  }

  const listJurisdictions = jurisdictionOptions.map((j, idx) => (
    <a
      key={idx}
      className="dropdown-item"
      onClick={selectJurisdictionHandler.bind(undefined, j)}
    >
      {j.text}
    </a>
  ))

  return (
    <div className="input-group-append">
      <button type="button" className="btn disabled">
        LLC
      </button>
      <button
        className="btn btn-outline-secondary dropdown-toggle"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {jurisdictionName}
      </button>
      <div className="dropdown-menu">{listJurisdictions}</div>
    </div>
  )
}

export default connect((state: IState) => ({
  jurisdictionSelected: state.spinUp.jurisdictionSelected,
  jurisdictionOptions: state.spinUp.jurisdictionOptions,
  jurisdictionName: state.spinUp.jurisdictionName,
  jurisdictionStreet: state.spinUp.jurisdictionStreet,
}))(JurisdictionSelector)
