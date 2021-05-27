import React, { FC, useState } from 'react'
import web3 from 'web3'
import BN from 'bn.js'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { Link } from 'gatsby'
import { connect } from 'react-redux'
import { IState } from '../../../state/types'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import LaunchPoolContract from '../../../smart-contracts/LaunchPool'
import Icon from '../../icon/icon'

import '../style.scss'

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
}

interface LaunchPoolInterface {
  title?: string
  description?: string
  startTimestamp?: Date
  endTimestamp?: Date
  stakesMin?: BN
  stakesMax?: BN
  stakesTotal?: BN
  stakesCount?: number
  stakeAmountMin?: BN
  curveReducer?: number
  stage?: number
  minimumPrice?: number
  maximumPrice?: number
}

interface Props {
  id: string
  account?: string
  network?: string
}

const LaunchPool: FC<Props> = ({ id, account }: Props) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [launchPoolInfo, setPoolInfo] = useState<LaunchPoolInterface>({})
  const [stakes, setStakes] = useState<Array>

  const fetchGeneralInfo = () => {
    try {
      const infosContract = await LaunchPoolContract.getContract(id)
        .methods.getGeneralInfos()
        .call({ from: account })
      const infos: LaunchPoolInterface = {}
      infos.startTimestamp = new Date(
        parseInt(infosContract[0].toString()) * 1000
      )
      infos.endTimestamp = new Date(
        parseInt(infosContract[1].toString()) * 1000
      )
      infos.stakesMin = infosContract[2]
      infos.stakesMax = infosContract[3]
      infos.stakesTotal = infosContract[4]
      infos.stakesCount = parseInt(infosContract[5].toString())
      infos.curveReducer = parseInt(infosContract[6].toString())
      infos.stage = parseInt(infosContract[7].toString())
      infos.stakeAmountMin = infosContract[8]
      infos.minimumPrice = parseFloat(
        web3.utils.fromWei(infosContract[9].toString())
      )
      infos.maximumPrice = parseFloat(
        web3.utils.fromWei(infosContract[10].toString())
      )
      infos.stage = parseInt(infosContract[7].toString())
      const metadata = await LaunchPoolContract.getContract(id)
        .methods.getMetadata()
        .call({ from: account })
      const res: AxiosResponse = await axios.get(
        'https://cloudflare-ipfs.com/ipfs/' + metadata,
        options
      )
      infos.title = res.data.title
      infos.description = res.data.description
      setPoolInfo(infos)
    } catch (err) {
      setError('Not possible to load Launch pool icon.')
    }
  }

  React.useEffect(() => {
    setTimeout(async () => {
      setLoading(true)
      if (account && id) {
        await fetchGeneralInfo()
      }
      setLoading(false)
    }, 0)
  }, [account])

  return (
    <div className="container-sm limiter-md content">
      <Link
        className="btn btn-back btn-primary-outline btn-sm"
        to={`/dashpanel/`}
      >
        <Icon icon={faChevronLeft} />
        <span style={{ paddingLeft: '10px' }}>Back</span>
      </Link>
      {!error && account && !loading && (
        <div className="row">
          <div className="col-12 text-left">
            Start Date: {launchPoolInfo.startTimestamp}
          </div>
          <div className="col-12 text-left">
            End Date: {launchPoolInfo.endTimestamp}
          </div>
          <div className="col-12 text-left">
            Stakes Min: {launchPoolInfo.stakesMin}
          </div>
          <div className="col-12 text-left">
            Stakes Max: {launchPoolInfo.stakesTotal}
          </div>
          <div className="col-12 text-left">
            Stake Amount Min: {launchPoolInfo.stakeAmountMin}
          </div>
          <div className="col-12 text-left">
            Curve Reducer: {launchPoolInfo.curveReducer}
          </div>
          <div className="col-12 text-left">Stage: {launchPoolInfo.stage}</div>
          <div className="col-12 text-left">
            Min Price: {launchPoolInfo.minimumPrice}
          </div>
          <div className="col-12 text-left">
            Max Price: {launchPoolInfo.maximumPrice}
          </div>
        </div>
      )}
      {!account && (
        <div className="d-flex justify-content-center">
          <div className="row">
            <div className="col-12 text-center">No account connected.</div>
          </div>
        </div>
      )}
      {loading && (
        <div className="d-flex justify-content-center">
          <div className="row">
            <div className="col-12 text-center">Loading</div>
            <div className="col-12 text-center">
              <div className="spinner-border" role="status"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default connect((state: IState) => ({
  account: state.account.account,
  network: state.account.network,
}))(LaunchPool)
