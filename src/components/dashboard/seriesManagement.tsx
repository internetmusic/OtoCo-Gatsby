import React, { Dispatch, FC, useState } from 'react'
import Web3 from 'web3'
import { connect } from 'react-redux'
// import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
// import Icon from '../icon/icon'
import { ChevronLeft, ExclamationCircle } from 'react-bootstrap-icons'
import Address from '../addressWidget/addressWidget'
import UTCDate from '../utcDate/utcDate'
import {
  CLEAR_MANAGE_SERIES,
  SeriesType,
  ManagementActionTypes,
} from '../../state/management/types'
import { IState } from '../../state/types'

import SeriesDocuments from './seriesDocuments'
import SeriesENS from './seriesENS'
import SeriesToken from './seriesToken'
import SeriesMultisig from './seriesMultisig'

interface Props {
  account?: string | null
  network?: string | null
  managing?: SeriesType
  dispatch: Dispatch<ManagementActionTypes>
}

const SeriesManagement: FC<Props> = ({
  account,
  network,
  managing,
  dispatch,
}: Props) => {
  const handleClickBack = () => {
    dispatch({ type: CLEAR_MANAGE_SERIES })
  }

  return (
    <div>
      <button
        className="btn btn-primary-outline btn-sm mb-4"
        onClick={handleClickBack}
      >
        {/* <Icon icon={faChevronLeft} /> */}
        <ChevronLeft className="fix-icon-alignment" />
        <span style={{ paddingLeft: '0.5em' }}>Back to Series</span>
      </button>
      {managing !== undefined && (
        <div className="my-4">
          <div className="card d-grid gap-1 mb-5 special-bg">
            <h3 className="m-0">
              {managing?.name} ({managing?.jurisdiction})
            </h3>
            <div className="">
              Manager: <Address address={managing.owner}></Address>
            </div>
            <div className="">
              Address: <Address address={managing.contract}></Address>
            </div>
            <div className="">
              Creation: <UTCDate date={managing.created} separator=""></UTCDate>
            </div>
            <div className="small text-warning mt-2">
              <span style={{ marginRight: '0.5em' }}>
                <ExclamationCircle className="fix-icon-alignment" />
              </span>
              Your company address is not a wallet. Please do never send{' '}
              ether/tokens to this address.
            </div>
          </div>
          <div>
            <SeriesDocuments></SeriesDocuments>
            <SeriesToken></SeriesToken>
            <SeriesMultisig></SeriesMultisig>
            <SeriesENS></SeriesENS>
          </div>
        </div>
      )}
    </div>
  )
}

export default connect((state: IState) => ({
  account: state.account.account,
  network: state.account.network,
  managing: state.management.managing,
}))(SeriesManagement)
