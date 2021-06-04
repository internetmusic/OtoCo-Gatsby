import React, { FC, useState } from 'react'
import Web3, { EventData } from 'web3'
import BN from 'bn.js'
import axios, { AxiosResponse } from 'axios'
import { Link } from 'gatsby'
import { connect } from 'react-redux'
import { IState } from '../../state/types'
import TransactionUtils from '../../services/transactionUtils'
import { ChevronLeft } from 'react-bootstrap-icons'
import LaunchPoolContract from '../../smart-contracts/LaunchPool'
import ERC20Contract from '../../smart-contracts/OtocoToken'
import StakesList from './stakesList'
import TokensList from './tokensList'

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
  stakeAmountMax: BN
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
  const [poolInfo, setPoolInfo] = useState<LaunchPoolInterface | undefined>(
    undefined
  )
  const [allowedTokens, setAllowedTokens] = useState<TokensInterface[]>()
  const [stakes, setStakes] = useState<BN[]>([])
  const [accountStakes, setAccountStakes] = useState<StakeInterface[]>([])

  // Fetch general Launch pool info and allowed tokens
  const fetchGeneralInfo = async () => {
    try {
      const infosContract = await LaunchPoolContract.getContract(id)
        .methods.getGeneralInfos()
        .call({ from: account })
      console.log(infosContract)
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
      infos.stakeAmountMax = infosContract[10]
      infos.minimumPrice = infosContract[9]
      infos.maximumPrice = getUnitPrice(
        new BN(infosContract[3]),
        new BN(infosContract[3]),
        new BN(infosContract[6]),
        new BN(infosContract[9])
      )
      console.log(infos)
      const metadata = await LaunchPoolContract.getContract(id)
        .methods.metadata()
        .call({ from: account })
      console.log(metadata)
      const res: AxiosResponse = await axios.get(
        'https://cloudflare-ipfs.com/ipfs/' + metadata,
        options
      )
      console.log('Axios response', res)
      infos.title = res.data.title
      infos.description = res.data.description
      setPoolInfo(infos)
      const tokensList = await LaunchPoolContract.getContract(id)
        .methods.tokenList()
        .call({ from: account })
      const allowedList: TokensInterface[] = []
      for (const t of tokensList) {
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
      console.error(err)
    }
  }

  const fetchStakes = async () => {
    if (!account) return
    if (!poolInfo) return
    const web3: Web3 = window.web3
    const stakesList = await LaunchPoolContract.getContract(id)
      .methods.stakesList()
      .call({ from: account })
    setStakes(stakesList)
    const stakesAccountList: EventData[] = await LaunchPoolContract.getContract(
      id
    ).getPastEvents('Staked', {
      fromBlock: 0,
      toBlock: 'latest',
      filter: { investor: account },
    })
    console.log('Stakes Fetched', stakesAccountList)
    const listStakes: StakeInterface[] = []
    for (const stakeObject of stakesAccountList) {
      const stake: StakeInterface = {
        id: stakeObject.returnValues[0],
        token: allowedTokens?.find(
          (t) => t.address == stakeObject.returnValues[2]
        ),
        amount: parseFloat(
          Web3.utils.fromWei(stakeObject.returnValues[3].toString())
        ),
        price: 0,
        shares: 0,
        timestamp: new Date(),
      }
      const block = await web3.eth.getBlock(stakeObject.blockNumber)
      // Set stake timestamp
      stake.timestamp = new Date(parseInt(block.timestamp.toString()) * 1000)
      // Set stake price and shares to zero initially
      stake.price = 0
      stake.shares = 0
      // If if unstaked return it zeroed
      if (stake.amount == 0) return stake
      // Get pool balance until stake offer
      const poolBalance: BN = stakesList
        .slice(0, stake.id)
        .reduce((acc: BN, s: string) => acc.add(new BN(s)), new BN(0))
      // Set stake current price for each share
      stake.price = parseFloat(
        Web3.utils.fromWei(
          getUnitPrice(
            new BN(poolInfo.stakesMax),
            new BN(poolBalance),
            new BN(poolInfo.curveReducer),
            new BN(poolInfo.minimumPrice)
          )
        )
      )
      // Set stake current amount of shares result
      stake.shares = parseFloat(
        Web3.utils.fromWei(
          getShares(
            new BN(poolInfo.stakesMax),
            new BN(poolBalance),
            new BN(stakeObject.returnValues[3]),
            new BN(poolInfo.curveReducer),
            new BN(poolInfo.minimumPrice)
          )
        )
      )
      listStakes.push(stake)
    }
    setAccountStakes(listStakes)
  }

  const handleUnstake = async (index: number) => {
    if (!account) return
    console.log('Index unstaked:', index)
    const requestInfo = await TransactionUtils.getTransactionRequestInfo(
      account,
      '60000'
    )
    try {
      const hash: string = await new Promise((resolve, reject) => {
        LaunchPoolContract.getContract(id)
          .methods.unstake(index)
          .send(requestInfo, (error: Error, hash: string) => {
            if (error) reject(error.message)
            else resolve(hash)
          })
      })
      console.log(hash)
    } catch (err) {
      console.error('Staking error', err)
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

  React.useEffect(() => {
    setTimeout(async () => {
      setLoading(true)
      if (poolInfo) {
        await fetchStakes()
      }
      setLoading(false)
    }, 0)
  }, [allowedTokens])

  return (
    <div className="container-sm limiter-md content">
      <Link
        className="btn btn-back btn-primary-outline btn-sm"
        to={`/dashpanel/`}
      >
        <ChevronLeft></ChevronLeft>
        <span style={{ paddingLeft: '10px' }}>Back</span>
      </Link>
      {!error && account && !loading && poolInfo && (
        <div className="row">
          <h1 className="col-12 text-left">{poolInfo.title}</h1>
          <h2 className="col-12 text-left">{poolInfo.description}</h2>
          <div className="col-12 text-left">
            Start Date: {poolInfo.startTimestamp.toISOString()}
          </div>
          <div className="col-12 text-left">
            End Date: {poolInfo.endTimestamp.toISOString()}
          </div>
          <div className="col-12 text-left">
            Stakes Min: {Web3.utils.fromWei(poolInfo.stakesMin.toString())}
          </div>
          <div className="col-12 text-left">
            Stakes Max: {Web3.utils.fromWei(poolInfo.stakesMax.toString())}
          </div>
          <div className="col-12 text-left">
            Pool Balance: {Web3.utils.fromWei(poolInfo.stakesTotal.toString())}
          </div>
          <div className="col-12 text-left">
            Curve Reducer: {poolInfo.curveReducer}
          </div>
          <div className="col-12 text-left">Stage: {poolInfo.stage}</div>
          <div className="col-12 text-left">
            Stake Amount Min allowed:{' '}
            {Web3.utils.fromWei(poolInfo.stakeAmountMin)}
          </div>
          <div className="col-12 text-left">
            Stake Amount Max allowed:{' '}
            {Web3.utils.fromWei(poolInfo.stakeAmountMax)}
          </div>
          <div className="col-12 text-left">
            Min Price: {Web3.utils.fromWei(poolInfo.minimumPrice.toString())}
          </div>
          <div className="col-12 text-left">
            Max Price: {Web3.utils.fromWei(poolInfo.maximumPrice.toString())}
          </div>
          <div className="col-12 text-left">
            <h5>Allowed Tokens</h5>
            <table className="table table-hover mb-5">
              <thead>
                <tr>
                  <th scope="col">Address</th>
                  <th scope="col">Symbol</th>
                  <th scope="col">Decimals</th>
                </tr>
              </thead>
              <tbody>
                <TokensList tokens={allowedTokens} poolId={id}></TokensList>
              </tbody>
            </table>
          </div>
          <div className="col-12 text-left">
            <h5>Account Stakes</h5>
            <table className="table table-hover mb-5">
              <thead>
                <tr>
                  <th scope="col">Queue</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Current Price</th>
                  <th scope="col">Shares</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <StakesList
                  stakes={accountStakes}
                  handleUnstake={handleUnstake}
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
      {error && (
        <div className="d-flex justify-content-center">
          <div className="row">
            <div className="col-12 text-center">{error}</div>
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
