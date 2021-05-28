import React, { FC, useState } from 'react'
import Web3 from 'web3'
import BN from 'bn.js'
import axios, { AxiosResponse } from 'axios'
import { Link } from 'gatsby'
import { connect } from 'react-redux'
import { IState } from '../../../state/types'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import LaunchPoolContract from '../../../smart-contracts/LaunchPool'
import ERC20Contract from '../../../smart-contracts/OtocoToken'
import StakesList from './stakesList'
import Icon from '../../icon/icon'

import '../style.scss'

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export interface TokensInterface {
  address: string
  name: string
  symbol: string
  decimals: number
}

export interface StakeInterface {
  id: number
  token: TokensInterface
  amount: number
  price: number
  shares: number
  timestamp: Date
}

// Get returned shares for a specific stake, pool balance and minimum price
export function getShares(
  supply: BN,
  pool: BN,
  stake: BN,
  reducer: BN,
  minPrice: BN
): BN {
  const curve = pool.mul(pool).div(supply.mul(new BN(100000)).mul(reducer))
  const unitPrice = curve.add(minPrice)
  return stake.mul(new BN(Web3.utils.toWei('1'))).div(unitPrice)
}

// Get unit price based on minimumPrice and pool balance
export function getUnitPrice(
  supply: BN,
  pool: BN,
  reducer: BN,
  minPrice: BN
): BN {
  const curve = pool.mul(pool).div(supply.mul(new BN(100000)).mul(reducer))
  return curve.add(minPrice)
}

// Ignore minimum price amount, just the increment is returned
export function getCurve(supply: BN, pool: BN, reducer: BN): BN {
  return pool.mul(pool).div(supply.mul(new BN(100000)).mul(reducer))
}

interface LaunchPoolInterface {
  title?: string
  description?: string
  startTimestamp: Date
  endTimestamp: Date
  stakesMin: BN
  stakesMax: BN
  stakesTotal: BN
  stakesCount: number
  stakeAmountMin: BN
  curveReducer: BN
  stage: number
  minimumPrice: BN
  maximumPrice: BN
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
  const [allowedTokens, setAllowedTokens] = useState<TokensInterface[]>()
  const [stakes, setStakes] = useState<BN[]>([])
  const [accountStakes, setAccountStakes] = useState<StakeInterface[]>([])

  const unstake = async (index: number) => {
    console.log('Index unstaked:', index)
  }

  // Fetch general Launch pool info and allowed tokens
  const fetchGeneralInfo = async () => {
    try {
      const infosContract = await LaunchPoolContract.getContract(id)
        .methods.getGeneralInfos()
        .call({ from: account })
      const infos: any = {}
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
      infos.curveReducer = infosContract[6].toString()
      infos.stage = parseInt(infosContract[7].toString())
      infos.stakeAmountMin = infosContract[8]
      infos.minimumPrice = infosContract[9].toString()
      infos.maximumPrice = infosContract[10].toString()
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
      const tokensList = await LaunchPoolContract.getContract(id)
        .methods.tokenList()
        .call({ from: account })
      const allowedList: TokensInterface[] = []
      for (const t in tokensList) {
        const name = await ERC20Contract.getContract(t)
          .methods.name()
          .call({ from: account })
        const symbol = await ERC20Contract.getContract(t)
          .methods.symbol()
          .call({ from: account })
        const decimals = await ERC20Contract.getContract(t)
          .methods.decimals()
          .call({ from: account })
        allowedList.push({ address: t, name, symbol, decimals })
      }
      setAllowedTokens(allowedList)
    } catch (err) {
      setError('Not possible to load Launch pool.')
    }
  }

  const fetchStakes = async () => {
    const web3: Web3 = window.web3
    const stakesList = await LaunchPoolContract.getContract(id)
      .methods.stakesList()
      .call({ from: account })
    setStakes(stakesList)
    const stakesAccountList: any[] = await LaunchPoolContract.getContract(
      id
    ).events.getPastEvents('Staked', {
      filter: { investor: account },
      fromBlock: 0,
      toBlock: 'latest',
    })
    for (const stake of stakesAccountList) {
      delete stake.investor
      // Set token object
      stake.token = allowedTokens?.find((t) => t.address == stake.token)
      // Set shares amount
      stake.amount = parseFloat(Web3.utils.fromWei(stakesList[stake.id]))
      const block = await web3.eth.getBlock(stake.blockNumber)
      // Set stake timestamp
      stake.timestamp = new Date(parseInt(block.timestamp.toString()) * 1000)
      // Set stake price and shares to zero initially
      stake.price = 0
      stake.shares = 0
      // If if unstaked return it zeroed
      if (stakesList[stake.id].eq(new BN(0))) return stake
      // Get pool balance until stake offer
      const poolBalance: BN = stakesList
        .slice(0, id)
        .reduce((acc: BN, s: BN) => acc.add(s), new BN(0))
      // Set stake current price for each share
      stake.price = Web3.utils.fromWei(
        getUnitPrice(
          launchPoolInfo.stakesMax,
          poolBalance,
          launchPoolInfo.curveReducer,
          launchPoolInfo.minimumPrice
        )
      )
      // Set stake current amount of shares result
      stake.shares = Web3.utils.fromWei(
        getShares(
          launchPoolInfo.stakesMax,
          poolBalance,
          stakesList[stake.id],
          launchPoolInfo.curveReducer,
          launchPoolInfo.minimumPrice
        )
      )
      return stake
    }
    setAccountStakes(stakesAccountList)
  }

  React.useEffect(() => {
    setTimeout(async () => {
      setLoading(true)
      if (account && id) {
        await fetchGeneralInfo()
        await fetchStakes()
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
          <div className="col-12 text-left">
            <table className="table table-hover mb-5">
              <thead>
                <tr>
                  <th scope="col">Queue</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Current Price</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <StakesList
                  stakes={accountStakes}
                  handleUnstake={unstake}
                ></StakesList>
              </tbody>
            </table>
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
