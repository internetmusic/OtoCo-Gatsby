import React, { Dispatch, FC, useState } from 'react'
import Web3 from 'web3'
import { connect } from 'react-redux'
import { ChevronLeft } from 'react-bootstrap-icons'
import Web3Integrate from '../../services/web3-integrate'

import { SET_ACCOUNT, SET_NETWORK } from '../../state/account/types'
import {
  SeriesType,
  ManageSection,
  SET_MANAGE_SERIES,
  ManagementActionTypes,
} from '../../state/management/types'
import { IState } from '../../state/types'
import { IJurisdictionOption } from '../../state/spinUp/types'

import MainContract from '../../smart-contracts/MainContract'
import SeriesContract from '../../smart-contracts/SeriesContract'

import SeriesDocuments from './legal'
import SeriesENS from './ens'
import SeriesToken from './token'
import SeriesMultisig from './multisig'
import SeriesOverview from './overview'
import Plugins from './plugins'
import { Link } from 'gatsby'
import { CSSTransition } from 'react-transition-group'

interface Props {
  id: string
  account?: string
  network?: string
  managing?: SeriesType
  section?: ManageSection
  jurisdictionOptions: IJurisdictionOption[]
  dispatch: Dispatch<ManagementActionTypes>
}

const SeriesManagement: FC<Props> = ({
  id,
  account,
  network,
  managing,
  section,
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
          badges: [],
        }
        for (const j of jurisdictionOptions) {
          const seriesAddresses: string[] = await MainContract.getContract(
            network,
            j.value
          )
            .methods.mySeries()
            .call({ from: account })
          if (
            seriesAddresses
              .map((sa) => sa.toLowerCase())
              .includes(id.toLowerCase())
          ) {
            newSeries.jurisdiction = j.text
          }
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
    <div>
      <Link
        className="btn btn-back btn-primary-outline btn-sm"
        to={`/account/`}
      >
        <ChevronLeft className="fix-icon-alignment" />
        <span style={{ paddingLeft: '0.5em' }}>Back to Account</span>
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
      <CSSTransition
        in={!section && !loading}
        timeout={{
          appear: 200,
          enter: 200,
          exit: 200,
        }}
        classNames="slide-up"
        unmountOnExit
      >
        <SeriesOverview></SeriesOverview>
      </CSSTransition>
      <CSSTransition
        in={section == ManageSection.LEGAL}
        timeout={{
          appear: 200,
          enter: 200,
          exit: 200,
        }}
        classNames="slide-up"
        unmountOnExit
      >
        <SeriesDocuments></SeriesDocuments>
      </CSSTransition>
      <CSSTransition
        in={section == ManageSection.TOKEN}
        timeout={{
          appear: 200,
          enter: 200,
          exit: 200,
        }}
        classNames="slide-up"
        unmountOnExit
      >
        <SeriesToken></SeriesToken>
      </CSSTransition>
      <CSSTransition
        in={section == ManageSection.MULTISIG}
        timeout={{
          appear: 200,
          enter: 200,
          exit: 200,
        }}
        classNames="slide-up"
        unmountOnExit
      >
        <SeriesMultisig></SeriesMultisig>
      </CSSTransition>
      <CSSTransition
        in={section == ManageSection.ENS}
        timeout={{
          appear: 200,
          enter: 200,
          exit: 200,
        }}
        classNames="slide-up"
        unmountOnExit
      >
        <SeriesENS></SeriesENS>
      </CSSTransition>
      <CSSTransition
        in={section == ManageSection.PLUGINS}
        timeout={{
          appear: 200,
          enter: 200,
          exit: 200,
        }}
        classNames="slide-up"
        unmountOnExit
      >
        <Plugins></Plugins>
      </CSSTransition>
    </div>
  )
}

export default connect((state: IState) => ({
  account: state.account.account,
  network: state.account.network,
  managing: state.management.managing,
  section: state.management.section,
  jurisdictionOptions: state.spinUp.jurisdictionOptions,
}))(SeriesManagement)
