import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import BN from 'bn.js'
import times from 'lodash/fp/times'
import accounting from 'accounting'
import { format, fromUnixTime, isBefore } from 'date-fns'

//style
import './StakeDisplay.scss'

//components
import Graph from '../Graph/Graph'
import InfoCard from '../InfoCard/InfoCard'
import { start } from 'repl'
import { startCase } from 'lodash'

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
    minimumPrice,
    stakesMax,
    stakesTotal,
    stakesCount,
    stage,
    startTimestamp,
  } = poolInfo

  // startTimestamp = new Date('August 19, 2021 23:15:30')
  // endTimestamp = new Date('December 19 2021 23:15:30')

  const [currentIdx, setCurrentIdx] = useState(49)

  const getTimePeriod = () => {
    if (isBefore(new Date(), new Date(startTimestamp))) return 'before'
    else if (isBefore(new Date(), new Date(endTimestamp))) return 'during'
    else if (isBefore(new Date(endTimestamp), new Date())) return 'after'
  }

  const [countdownTime, setCountdownTime] = useState(
    isBefore(new Date(), new Date(startTimestamp))
      ? Math.round(new Date(startTimestamp).getTime() / 1000)
      : Math.round(new Date(endTimestamp).getTime() / 1000)
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

    const difference = +new Date(countdownTime * 1000) - +new Date()

    const timeLeft =
      difference < 0
        ? { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true }
        : {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            isOver: false,
          }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(getTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        countdownTime ===
          Math.round(new Date(startTimestamp).getTime() / 1000) &&
        !isBefore(new Date(), new Date(startTimestamp))
      )
        setCountdownTime(Math.round(new Date(endTimestamp).getTime() / 1000))

      setTimeLeft(getTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  const [timeDisplay, setTimeDisplay] = useState('loading...')

  const [timeText, setTimeText] = useState('')
  const [titleText, setTitleText] = useState('LIVE!')

  useEffect(() => {
    if (!timeLeft.isOver) {
      setTimeDisplay(
        `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`
      )
    } else if (timeLeft.isOver) {
      setTimeDisplay('Staking is over')
    }

    switch (getTimePeriod()) {
      case 'before':
        setTimeText('starts')
        setTitleText('is coming...')
        break
      case 'during':
        setTimeText('ends')
        setTitleText('is LIVE!')
        break
      case 'after':
        setTimeText('closed')
        setTitleText('is over.')
        break
      default:
        if (isBefore(new Date(), new Date(startTimestamp)))
          setTimeText('starts')
        else if (isBefore(new Date(), new Date(endTimestamp)))
          setTimeText('ends')
        break
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
            infoText={`total currently staked, out of US$${
              parseInt(Web3.utils.fromWei(stakesMax)) / 1000000
            } million hard cap`}
            useGraidentBackground={true}
          />
          <InfoCard
            titleText={`${accounting.formatMoney(tokenSum, {
              symbol: '',
              precision: 0,
            })}`}
            infoText={`tokens currently pre-ordered by ${stakesCount} stakers`}
            useGraidentText={true}
          />
          <InfoCard
            titleText={timeDisplay}
            infoText={`Pre-order window ${timeText}
                 ${format(
                   fromUnixTime(countdownTime),
                   'EEE d MMM, h:mmaaa O'
                 )}`}
            useGraidentText={true}
          />
        </div>
        <div className="stake-container">
          <div className="title">
            {`Token pre-order book ${titleText}`}
            <br />
            <a
              href={'https://github.com/otoco-io/OtoGo-SmartContracts'}
              rel="noopener noreferrer"
              target="_blank"
            >
              {'>Learn how to stake here.'}
            </a>
          </div>
          <Graph
            currentIdx={currentIdx}
            currentPrice={parseInt(currentPrice)}
            specs={specs}
          />
          <div className="button-container">
            <button
              className={
                stage === 1 && getTimePeriod() === 'during'
                  ? 'unstake'
                  : 'unstake disabled'
              }
              disabled={stage === 1 && getTimePeriod() === 'during'}
              onClick={() => onStake}
            >
              Unstake
            </button>
            <button
              className={
                stage === 1 && getTimePeriod() === 'during'
                  ? 'stake'
                  : 'stake disabled'
              }
              disabled={stage === 1 && getTimePeriod() === 'during'}
              onClick={() => onUnstake}
            >
              Stake Now!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StakeDisplay
