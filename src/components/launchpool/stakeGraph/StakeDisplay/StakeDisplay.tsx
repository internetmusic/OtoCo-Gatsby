import React, { FC, useEffect, useState } from 'react'
import Web3 from 'web3'
import BN from 'bn.js'
import accounting from 'accounting'
import { format, fromUnixTime } from 'date-fns'

import { LaunchPoolInterface, getUnitPrice } from '../../index'

//style
import './StakeDisplay.scss'

//components
import Graph from '../Graph/Graph'
import InfoCard from '../InfoCard/InfoCard'

type Props = {
  infos: LaunchPoolInterface
  tokenSum: BN
  stakesTotal: BN
  stakesCount: number
  onStake: () => void
  onUnstake: () => void
}

const StakeDisplay: FC<Props> = ({
  infos,
  tokenSum,
  stakesTotal,
  stakesCount,
  onStake,
  onUnstake,
}: Props) => {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [countdownTime, setCountdownTime] = useState<number>(0)
  const [currentPrice, setCurrentPrice] = useState<number>(0)
  const [timeDisplay, setTimeDisplay] = useState('loading...')
  const [timeText, setTimeText] = useState('')
  const [titleText, setTitleText] = useState('LIVE!')
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  })

  const getTimePeriod = () => {
    if (Date.now() < infos.startTimestamp.getTime()) return 'before'
    else if (Date.now() < infos.endTimestamp.getTime()) return 'during'
    else if (infos.endTimestamp.getTime() < Date.now()) return 'after'
  }

  const specs = () => {
    const max: number = parseFloat(Web3.utils.fromWei(infos.stakesMax))
    return new Array(100).fill(0).map((val, idx) => {
      const currentX = (idx + 1) * (max / 100)
      const currentY = currentX ** 2 / max
      return {
        x: currentX,
        y: currentY,
      }
    })
  }

  useEffect(() => {
    const total = parseInt(Web3.utils.fromWei(stakesTotal))
    const max = parseInt(Web3.utils.fromWei(infos.stakesMax))
    setCurrentIdx(total < max / 100 ? 0 : Math.floor((total / max) * 100) - 1)
    setCurrentPrice(
      parseFloat(
        Web3.utils.fromWei(
          getUnitPrice(
            infos.stakesMax,
            new BN(stakesTotal),
            infos.curveReducer,
            infos.minimumPrice
          )
        )
      )
    )
  }, [stakesCount, stakesTotal])

  const getTimeLeft = () => {
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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        countdownTime === Math.round(infos.startTimestamp.getTime() / 1000) &&
        !(Date.now() < infos.startTimestamp.getTime())
      )
        setCountdownTime(
          Math.round(new Date(infos.endTimestamp).getTime() / 1000)
        )

      setTimeLeft(getTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

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
        if (Date.now() < infos.startTimestamp.getTime()) setTimeText('starts')
        else if (Date.now() < infos.endTimestamp.getTime()) setTimeText('ends')
        break
    }
  }, [timeLeft])

  return (
    <div className="stake-display">
      <div className="content-container">
        <div className="info-container">
          <InfoCard
            titleText={`US$ ${accounting.formatMoney(
              Web3.utils.fromWei(stakesTotal),
              {
                symbol: '',
                precision: 0,
              }
            )}`}
            infoText={`total currently staked, out of US$${
              parseInt(Web3.utils.fromWei(infos.stakesMax)) / 1000000
            } million hard cap`}
            useGraidentBackground={true}
          />
          <InfoCard
            titleText={`${accounting.formatMoney(Web3.utils.fromWei(tokenSum), {
              symbol: '',
              precision: 0,
            })}`}
            infoText={`tokens currently pre-ordered by ${stakesCount} stakers`}
            useGraidentText={true}
          />
          <InfoCard
            titleText={timeDisplay}
            infoText={`Pre-order window ${timeText}
                 ${format(fromUnixTime(countdownTime), 'd MMM, h:mmaaa O')}`}
            useGraidentText={true}
          />
        </div>
        <div className="stake-container">
          <div className="title">
            {`Token pre-order book ${titleText}`}
            <br />
            <a
              href={'https://otonomos.gitbook.io/otoco/'}
              rel="noopener noreferrer"
              target="_blank"
            >
              {'>Learn how to stake here.'}
            </a>
          </div>
          <Graph
            currentIdx={currentIdx}
            currentPrice={currentPrice}
            specs={specs()}
          />
          <div className="button-container">
            <button
              className={
                infos.stage === 1 && getTimePeriod() === 'during'
                  ? 'unstake'
                  : 'unstake disabled'
              }
              disabled={infos.stage === 1}
              onClick={onUnstake}
            >
              Unstake
            </button>
            <button
              className={
                infos.stage === 1 && getTimePeriod() === 'during'
                  ? 'stake'
                  : 'stake disabled'
              }
              disabled={infos.stage === 1}
              onClick={onStake}
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
