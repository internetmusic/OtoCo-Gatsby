import React, { Dispatch, FC, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import Web3 from 'web3'
import { connect } from 'react-redux'
import Icon from '../icon/icon'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import AddressWidget from '../addressWidget/addressWidget'

import { IState } from '../../state/types'
import Web3Integrate from '../../services/web3-integrate'
import {
  SET_MANAGE_SERIES,
  ManagementActionTypes,
  SeriesType,
} from '../../state/management/types'
import UTCDate from '../utcDate/utcDate'

interface PropsSeries {
  series: SeriesType[]
  dispatch: Dispatch<ManagementActionTypes>
}

const SeriesListing: React.FC<PropsSeries> = ({
  series,
  dispatch,
}: PropsSeries) => {
  const clickManageHandle = (s: SeriesType) => {
    dispatch({ type: SET_MANAGE_SERIES, payload: s })
  }

  const listSeries = series.map((s: SeriesType, idx) => (
    <div key={idx} className="col-12 col-md-6">
      <div className="card">
        <div className="card-header">
          <div className="row">
            <h6 className="col-9" style={{ marginBottom: '0px' }}>
              {s.name}
            </h6>
            <div className="col-3 pull-right">
              <span className="jurisdiction small pull-right">
                {s.jurisdiction}
              </span>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="card-text small">
            Manager: <AddressWidget address={s.owner}></AddressWidget>
          </div>
          <div className="card-text small">
            Address: <AddressWidget address={s.contract}></AddressWidget>
          </div>
          <div className="card-text small">
            Creation: <UTCDate date={s.created} separator="-"></UTCDate>
          </div>
          <div style={{ paddingTop: '8px' }}>
            <button
              className="btn btn-primary float-right"
              onClick={clickManageHandle.bind(undefined, s)}
            >
              <Icon icon={faCog} />
              <span style={{ paddingLeft: '10px' }}>Manage</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  ))

  return <div className="row">{listSeries}</div>
}

export default connect((state: IState) => ({
  series: state.management.series,
}))(SeriesListing)
