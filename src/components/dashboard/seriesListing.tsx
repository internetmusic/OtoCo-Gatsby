import React, { Dispatch, FC, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import Web3 from 'web3'
import { connect } from 'react-redux'
// import Icon from '../icon/icon'
// import { faCog } from '@fortawesome/free-solid-svg-icons'
import { Gear } from 'react-bootstrap-icons';
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
    <div key={idx} className="col-12">
      <div className="card">
        {/* <div className="card-header"> */}
          {/* <div className="row"> */}
            <h6 className="card-header">
              {s.name}
            </h6>
            <div className="">
              <span className="jurisdiction text-uppercase small">
                {s.jurisdiction}
              </span>
            </div>
          {/* </div> */}
        {/* </div> */}
        <div className="card-body d-grid gap-2">
          <div className="card-text">
            Manager: <AddressWidget address={s.owner}></AddressWidget>
          </div>
          <div className="card-text">
            Address: <AddressWidget address={s.contract}></AddressWidget>
          </div>
          <div className="card-text">
            Creation: <UTCDate date={s.created} separator="-"></UTCDate>
          </div>
          <div className="mt-4">
            <button
              className="btn btn-primary-outline"
              onClick={clickManageHandle.bind(undefined, s)}
            >
              {/* <Icon icon={faCog} /> */}
              <Gear className="fix-icon-alignment" />
              <span style={{ paddingLeft: '0.5em' }}>Manage</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  ))

  return <div className="">{listSeries}</div>
}

export default connect((state: IState) => ({
  series: state.management.series,
}))(SeriesListing)