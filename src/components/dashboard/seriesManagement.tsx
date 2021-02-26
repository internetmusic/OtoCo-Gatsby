import React, { Dispatch, FC, useState } from 'react'
import Web3 from 'web3'
import { connect } from 'react-redux'
import { navigate } from '@reach/router'
import { ChevronLeft, ExclamationCircle } from 'react-bootstrap-icons'
import Address from '../addressWidget/addressWidget'
import UTCDate from '../utcDate/utcDate'
import Web3Integrate from '../../services/web3-integrate'

import {
  SET_ACCOUNT,
  SET_NETWORK,
  AccountActionTypes,
} from '../../state/account/types'
import {
  SET_OWN_SERIES,
  SET_CONTACT_FORM,
  CLEAR_MANAGE_SERIES,
  SeriesType,
  SET_MANAGE_SERIES,
  ManagementActionTypes,
} from '../../state/management/types'
import { IState } from '../../state/types'
import { IJurisdictionOption } from '../../state/spinUp/types'

import MainContract from '../../smart-contracts/MainContract'
import SeriesContract from '../../smart-contracts/SeriesContract'

import SeriesDocuments from './seriesDocuments'
import SeriesENS from './seriesENS'
import SeriesToken from './seriesToken'
import SeriesMultisig from './seriesMultisig'
import { Link } from 'gatsby'
import { CSSTransition } from 'react-transition-group'

interface Props {
  id: string
  account?: string | null
  network?: string | null
  managing?: SeriesType
  jurisdictionOptions: IJurisdictionOption[]
  dispatch: Dispatch<ManagementActionTypes>
}

const SeriesManagement: FC<Props> = ({
  id,
  account,
  network,
  managing,
  jurisdictionOptions,
  dispatch,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(true)

  React.useEffect(() => {
    setTimeout(async () => {
      // IF NOT CONNECTED YET
      setLoading(true)
      if (!account || !network) {
        await Web3Integrate.callModal()
        const web3: Web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        dispatch({
          type: SET_NETWORK,
          payload: await web3.eth.net.getNetworkType(),
        })
        dispatch({ type: SET_ACCOUNT, payload: accounts[0] })
        return
      }
      if (!managing) {
        const web3: Web3 = window.web3
        const newSeries: SeriesType = {
          jurisdiction: '',
          contract: id,
          created: new Date(),
          name: '',
          owner: '',
        }
        for (const j of jurisdictionOptions) {
          const seriesAddresses: string[] = await MainContract.getContract(
            network,
            j.value
          )
            .methods.mySeries()
            .call({ from: account })
          if (seriesAddresses.includes(id)) newSeries.jurisdiction = j.text
        }
        // window.testContract = SeriesContract.getContract(s);
        const events = await SeriesContract.getContract(
          id
        ).getPastEvents('allEvents', { fromBlock: 0, toBlock: 'latest' })
        const timestamp = await web3.eth.getBlock(events[0].blockNumber)
        newSeries.created = new Date(
          parseInt(timestamp.timestamp.toString()) * 1000
        )
        newSeries.name = await SeriesContract.getContract(id)
          .methods.getName()
          .call({ from: account })
        newSeries.owner = await SeriesContract.getContract(id)
          .methods.owner()
          .call({ from: account })
        dispatch({ type: SET_MANAGE_SERIES, payload: newSeries })
      }
      setLoading(false)
    }, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, managing])

  return (
    <div className="container-sm limiter-md content">
      <Link
        className="btn btn-back btn-primary-outline btn-sm"
        to={`/dashpanel/`}
      >
        <ChevronLeft className="fix-icon-alignment" />
        <span style={{ paddingLeft: '0.5em' }}>Back to Series</span>
      </Link>
      <CSSTransition
        in={loading}
        timeout={{
          appear: 200,
          enter: 200,
          exit: 200,
        }}
        classNames="slide-up"
        unmountOnExit
      >
        <div className="d-flex justify-content-center">
          <div className="row">
            <div className="col-12 text-center">Loading Data</div>
            <div className="col-12 text-center">
              <div className="spinner-border" role="status"></div>
            </div>
          </div>
        </div>
      </CSSTransition>
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
  jurisdictionOptions: state.spinUp.jurisdictionOptions,
}))(SeriesManagement)
