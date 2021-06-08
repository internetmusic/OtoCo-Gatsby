import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import BN from 'bn.js'
import times from 'lodash/fp/times'
import accounting from 'accounting'
import { format, fromUnixTime } from 'date-fns'

//style
import './StakeDisplay.scss'

//components
import Graph from '../Graph/Graph'
import InfoCard from '../InfoCard/InfoCard'

type Props = {
  poolInfo: {
    curveReducer: string
    description: string
    endTimestamp: Date
    maximumPrice: BN
    minimumPrice: string
    stage: number
    stakeAmountMax: string
    stakeAmountMin: string
    stakesCount: number
    stakesMax: string
    stakesMin: string
    stakesTotal: string
    startTimestamp: Date
    title: string
  }

  getUnitPrice: (
    maxStake: BN,
    currentVal: BN,
    curveReducer: BN,
    minPrice: BN
  ) => BN
  tokenSum: number
  onStake: () => void
  onUnstake: () => void
}

const StakeDisplay = ({
  poolInfo,
  tokenSum,
  getUnitPrice,
  onStake,
  onUnstake,
}: Props) => {
  const {
    curveReducer,
    endTimestamp,
    //maximumPrice,
    minimumPrice,
    stakesMax,
    stakesTotal,
    //startTimestamp,
  } = poolInfo

  const [currentIdx, setCurrentIdx] = useState(49)

  const [closeTime, setCloseTime] = useState(
    Math.round(new Date(endTimestamp).getTime() / 1000)
  )

  const [currentPrice, setCurrentPrice] = useState(
    Web3.utils.fromWei(
      getUnitPrice(
        new BN(stakesMax),
        new BN(stakesTotal),
        new BN(curveReducer),
        new BN(minimumPrice)
      )
    )
  )

  const specs = times((idx) => {
    let currentX = (idx + 1) * (parseInt(stakesMax) / 10 ** 18 / 100)
    let currentY = currentX ** 2 / (parseInt(stakesMax) / 10 ** 18)

    return {
      x: currentX,
      y: currentY,
    }
  })(100)

  useEffect(() => {
    setCurrentIdx(
      parseInt(stakesTotal) < parseInt(stakesMax) / 100
        ? 0
        : Math.floor((parseInt(stakesTotal) / parseInt(stakesMax)) * 100 - 1)
    )
    setCurrentPrice(
      Web3.utils.fromWei(
        getUnitPrice(
          new BN(stakesMax),
          new BN(stakesTotal),
          new BN(curveReducer),
          new BN(minimumPrice)
        )
      )
    )
  }, [stakesTotal])

  const getTimeLeft = () => {
    const year = new Date().getFullYear

    const difference = +new Date(closeTime * 1000) - +new Date()

    const timeLeft =
      difference < 0
        ? { days: 0, hours: 0, minutes: 0, seconds: 0, isClosed: true }
        : {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            isClosed: false,
          }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(getTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  const [timeDisplay, setTimeDisplay] = useState('loading...')

  useEffect(() => {
    if (timeLeft.days > 0) {
      setTimeDisplay(`${timeLeft.days} days ${timeLeft.hours} hours`)
      return
    } else if (timeLeft.days < 0 && timeLeft.hours > 0) {
      setTimeDisplay(`${timeLeft.hours} hours ${timeLeft.minutes} min`)
      return
    } else if (timeLeft.hours < 0 && timeLeft.minutes > 0) {
      setTimeDisplay(`${timeLeft.minutes} min ${timeLeft.seconds} sec`)
      return
    } else if (timeLeft.isClosed) {
      setTimeDisplay('Staking is over.')
    }
  }, [timeLeft])

  return (
    <div className="stake-display">
      <div className="content-container">
        <div className="info-container">
          <InfoCard
            titleText={`US$ ${accounting.formatMoney(
              Web3.utils.fromWei(poolInfo.stakesTotal.toString()),
              {
                symbol: '',
                precision: 0,
              }
            )}`}
            infoText={`Total staked until now, out of US$${
              parseInt(Web3.utils.fromWei(stakesMax)) / 1000000
            }mm cap`}
            useGraidentBackground={true}
          />
          <InfoCard
            titleText={`${accounting.formatMoney(tokenSum, {
              symbol: '',
              precision: 0,
            })}`}
            infoText={`Tokens pre-ordered, out of total 123mm`}
            useGraidentText={true}
          />
          <InfoCard
            titleText={timeDisplay}
            infoText={`Pre-order window ${
              timeLeft.isClosed ? 'ended on' : 'ends'
            }
                 ${format(fromUnixTime(closeTime), 'MMM do, h:mmaaa O')}`}
            useGraidentText={true}
          />
        </div>
        <div className="stake-container">
          <h1 className="title">
            Token pre-order <br />
            book is LIVE!
          </h1>
          <Graph
            currentIdx={currentIdx}
            currentPrice={parseInt(currentPrice)}
            specs={specs}
          />
          <div className="button-container">
            <button className="unstake" disabled={true} onClick={() => onStake}>
              Unstake
            </button>
            <button className="stake" onClick={() => onUnstake}>
              Stake Now!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StakeDisplay
