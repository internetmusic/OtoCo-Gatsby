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
import TokensList from './tokensList'
import StakesList from './stakesList'

import StakeDisplay from './stakeGraph/StakeDisplay/StakeDisplay'

import '../style.scss'

import StakeWidget from './stakeWidget'
import UnstakeWidget from './unstakeWidget'

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const displayAmountConverter = (
  amount: BN,
  decimals: number
): string => {
  const conv = {
    '18': 'ether',
    '6': 'Mwei',
    '4': 'kwei',
  }
  return Web3.utils.fromWei(amount.toString(), conv[decimals.toString()])
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
  amount: BN
  price: BN
  shares: BN
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

export interface LaunchPoolInterface {
  title?: string
  description?: string
  startTimestamp: Date
  endTimestamp: Date
  stakesMin: BN
  stakesMax: BN
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
  const [stakeModalOpen, setStakeModalOpen] = useState<boolean>(false)
  const [unstakeModalOpen, setUnstakeModalOpen] = useState<boolean>(false)
  const [poolInfo, setPoolInfo] = useState<LaunchPoolInterface | undefined>(
    undefined
  )
  const [stakesTotal, setStakesTotal] = useState<BN>(new BN(0))
  const [stakesCount, setStakesCount] = useState<number>(0)
  const [allowedTokens, setAllowedTokens] = useState<TokensInterface[]>()
  const [stakes, setStakes] = useState<BN[] | undefined>()
  const [accountStakes, setAccountStakes] = useState<
    StakeInterface[] | undefined
  >()

  const openStakeModal = () => {
    console.log('SHOW MODAL')
    setStakeModalOpen(true)
  }

  const openUnstakeModal = () => {
    console.log('SHOW MODAL')
    setUnstakeModalOpen(true)
  }

  const closeModals = () => {
    setStakeModalOpen(false)
    setUnstakeModalOpen(false)
  }

  // Fetch general Launch pool info and allowed tokens
  const fetchGeneralInfo = async () => {
    try {
      const infosContract = await LaunchPoolContract.getContract(id)
        .methods.getGeneralInfos()
        .call({ from: account })
      const infosBN = infosContract.map((i: string) => new BN(i))
      const infos: LaunchPoolInterface = {
        startTimestamp: new Date(parseInt(infosBN[0].toString()) * 1000),
        endTimestamp: new Date(parseInt(infosBN[1].toString()) * 1000),
        stakesMin: infosBN[2],
        stakesMax: infosBN[3],
        curveReducer: infosBN[6],
        stage: parseInt(infosBN[7].toString()),
        stakeAmountMin: infosBN[8],
        stakeAmountMax: infosBN[10],
        minimumPrice: infosBN[9],
        maximumPrice: new BN(
          getUnitPrice(infosBN[3], infosBN[3], infosBN[6], infosBN[9])
        ),
      }
      setStakesTotal(infosBN[4])
      setStakesCount(parseInt(infosBN[5].toString()))
      setPoolInfo(infos)
    } catch (err) {
      setError('Not possible to load Pool info.')
      console.error(err)
    }
  }

  const fetchMetadata = async (infos: LaunchPoolInterface) => {
    try {
      const metadata = await LaunchPoolContract.getContract(id)
        .methods.metadata()
        .call({ from: account })
      const res: AxiosResponse = await axios.get(
        'https://cloudflare-ipfs.com/ipfs/' + metadata,
        options
      )
      infos.title = res.data.title
      infos.description = res.data.description
      setPoolInfo(infos)
    } catch (err) {
      setError('Not possible to load Pool info.')
      console.error(err)
    }
  }

  const fetchTokenAllowedList = async (poolId: string) => {
    try {
      const tokensList = await LaunchPoolContract.getContract(poolId)
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
      setError('Not possible to load Allowed Tokens.')
      console.error(err)
    }
  }

  const mountStake = async (stakeEvent: EventData, amount?: BN) => {
    if (!stakes) return
    if (!poolInfo) return
    if (!allowedTokens) return
    const stake: StakeInterface = {
      id: stakeEvent.returnValues[0],
      token: allowedTokens.find((t) => t.address == stakeEvent.returnValues[2]),
      amount: amount || stakes[parseInt(stakeEvent.returnValues[0])],
      price: new BN(0),
      shares: new BN(0),
      timestamp: new Date(),
    }
    const web3: Web3 = window.web3
    const block = await web3.eth.getBlock(stakeEvent.blockNumber)
    // Set stake timestamp
    stake.timestamp = new Date(parseInt(block.timestamp.toString()) * 1000)
    // If if unstaked return it zeroed
    if (stake.amount.gt(new BN(0))) {
      // Get pool balance until stake offer
      const poolBalance: BN = stakes
        .slice(0, stake.id)
        .reduce((acc: BN, s: BN) => acc.add(s), new BN(0))
      // Set stake current price for each share
      stake.price = new BN(
        getUnitPrice(
          poolInfo.stakesMax,
          poolBalance,
          poolInfo.curveReducer,
          poolInfo.minimumPrice
        )
      )
      // Set stake current amount of shares result
      stake.shares = new BN(
        getShares(
          poolInfo.stakesMax,
          poolBalance,
          amount || stakes[parseInt(stakeEvent.returnValues[0])],
          poolInfo.curveReducer,
          poolInfo.minimumPrice
        )
      )
    }
    return stake
  }

  const registerStake = async (err: ErrorEvent, stakeEvent: EventData) => {
    if (!stakes) return
    if (!poolInfo) return
    if (!allowedTokens) return
    if (err) return console.log(err.message)
    const token = allowedTokens.find(
      (t) => t.address == stakeEvent.returnValues[2]
    )
    const decimalsToAdd = new BN(10).pow(new BN(18 - token?.decimals))
    const normalizedStake = new BN(stakeEvent.returnValues[3]).mul(
      decimalsToAdd
    )
    if (stakeEvent.returnValues[1] == account) {
      const stake: StakeInterface | undefined = await mountStake(
        stakeEvent,
        normalizedStake
      )
      if (stake) {
        console.log('ACCOUNT STAKES ', accountStakes)
        const listAccountStakes = accountStakes || []
        listAccountStakes.push(stake)
        setAccountStakes(listAccountStakes)
      }
    }
    setStakesTotal((prevState) => new BN(prevState).add(normalizedStake))
    setStakesCount((prevState) => prevState + 1)
  }

  const registerUnstake = (err: ErrorEvent, unstakeEvent: EventData) => {
    if (!stakes) return
    if (!poolInfo) return
    if (!allowedTokens) return
    if (err) return console.log(err.message)
    const currentStakes: BN[] = stakes
    currentStakes[unstakeEvent.returnValues[0]] = new BN(0)
    setStakes(currentStakes)
    if (unstakeEvent.returnValues[1] == account) {
      setAccountStakes((prevState) => {
        const currentState = prevState
        if (!currentState) return []
        const stakeIdx: number = currentState.findIndex(
          (s) => s.id == parseInt(unstakeEvent.returnValues[0])
        )
        console.log(currentStakes.length, stakeIdx)
        currentState[stakeIdx].price = new BN(0)
        currentState[stakeIdx].amount = new BN(0)
        currentState[stakeIdx].shares = new BN(0)
        return currentState
      })
    }
    setStakesTotal((prevState) =>
      new BN(prevState).sub(new BN(unstakeEvent.returnValues[3]))
    )
    setStakesCount((prevState) => prevState - 1)
  }

  const refreshPoolStakes = async () => {
    const stakesList = await LaunchPoolContract.getContract(id)
      .methods.stakesList()
      .call({ from: account })
    setStakes(stakesList.map((s: string) => new BN(s)))
  }

  const refreshAccountStakes = async () => {
    if (!account) return
    if (!allowedTokens) return
    const stakesAccountEvents: EventData[] = await LaunchPoolContract.getContract(
      id
    ).getPastEvents('Staked', {
      fromBlock: 0,
      toBlock: 'latest',
      filter: { investor: account },
    })
    const listAccountStakes: StakeInterface[] = []
    for (const stakeEvent of stakesAccountEvents) {
      const stake: StakeInterface | undefined = await mountStake(stakeEvent)
      if (!stake) return
      listAccountStakes.push(stake)
    }
    setAccountStakes(listAccountStakes)
  }

  const calculateTotalShares = (
    infos: LaunchPoolInterface,
    currentStakes: BN[]
  ) => {
    let balance = new BN(0)
    const total: BN = currentStakes.reduce(function (acc, s) {
      const shares = getShares(
        infos.stakesMax,
        balance,
        new BN(s),
        infos.curveReducer,
        infos.minimumPrice
      )
      balance = balance.add(new BN(s))
      return acc.add(shares)
    }, new BN(0))
    return Web3.utils.fromWei(total.toString())
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
      if (account && !poolInfo) {
        await fetchGeneralInfo()
        console.log('Fetched Pool Info')
      }
      if (poolInfo && !poolInfo?.title) {
        await fetchMetadata(poolInfo)
        console.log('Fetched Metadata')
      }
      if (poolInfo && !allowedTokens) {
        await fetchTokenAllowedList(id)
        console.log('Fetched Tokens Allowed')
      }
      if (poolInfo && !stakes) {
        await refreshPoolStakes()
        console.log('Fetched Stakes')
      }
      if (poolInfo && stakes && !accountStakes) {
        await refreshAccountStakes()
        console.log('Fetched Account Stakes')
      }
      if (poolInfo && accountStakes && loading) {
        LaunchPoolContract.getContract(id).events.Staked(
          {
            fromBlock: 'latest',
          },
          registerStake
        )
        LaunchPoolContract.getContract(id).events.Unstaked(
          {
            fromBlock: 'latest',
          },
          registerUnstake
        )
        setLoading(false)
      }
    }, 0)
  }, [account, poolInfo, stakes, accountStakes])

  return (
    <div className="container-sm content container-sg">
      <Link
        className="btn btn-back btn-primary-outline btn-sm"
        to={`/dashpanel/`}
      >
        <ChevronLeft />
        <span style={{ paddingLeft: '10px' }}>Back</span>
      </Link>

      {!error && account && !loading && poolInfo && (
        <>
          <StakeDisplay
            poolInfo={poolInfo}
            getUnitPrice={getUnitPrice}
            tokenSum={20234000}
            onStake={() => {}}
            onUnstake={() => {}}
          />

          {console.log({ poolInfo })}
          {/* <div className="row">
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
              Pool Balance:{' '}
              {Web3.utils.fromWei(poolInfo.stakesTotal.toString())}
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
          </div> */}
        </>
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
