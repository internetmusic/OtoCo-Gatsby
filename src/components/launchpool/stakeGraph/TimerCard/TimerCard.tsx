import React, { FC, useEffect, useState } from 'react'
import { format, fromUnixTime } from 'date-fns'

import InfoCard from '../InfoCard/InfoCard'

import { getTimePeriod } from '../../index'

type Props = {
  //required
  startDate: Date
  endDate: Date
  //optional
  classProp?: string
  setTitleText?: (title: string) => void
}

const TimerCard: FC<Props> = ({
  classProp,
  startDate,
  endDate,
  setTitleText,
}: Props) => {
  const [timeDisplay, setTimeDisplay] = useState('loading...')
  const [timeText, setTimeText] = useState('')

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  })

  const [countdownTime, setCountdownTime] = useState(
    getTimePeriod(startDate, endDate) === 'before'
      ? Math.round(new Date(startDate).getTime() / 1000)
      : Math.round(new Date(endDate).getTime() / 1000)
  )

  const getTimeLeft = () => {
    const difference = +new Date(countdownTime * 1000) - +new Date()

    const timeLeft =
      difference < 0 && getTimePeriod(startDate, endDate) === 'after'
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
        countdownTime === Math.round(startDate.getTime() / 1000) &&
        !(Date.now() < startDate.getTime())
      )
        setCountdownTime(Math.round(new Date(endDate).getTime() / 1000))

      setTimeLeft(getTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  useEffect(() => {
    if (!timeLeft.isOver) {
      timeLeft.seconds === -1
        ? setTimeDisplay('Loading...')
        : setTimeDisplay(
            `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`
          )
    } else if (timeLeft.isOver) {
      setTimeDisplay('Staking is over.')
    }

    switch (getTimePeriod(startDate, endDate)) {
      case 'before':
        setTimeText('starting')
        setTitleText && setTitleText('opening soon...')

        break
      case 'during':
        setTimeText('ending')
        setTitleText && setTitleText('LIVE!')

        break
      case 'after':
        setTimeText('closed')
        setTitleText && setTitleText('over.')

        break
      default:
        if (Date.now() < startDate.getTime()) setTimeText('starting')
        else if (Date.now() < endDate.getTime()) setTimeText('ending')
        break
    }
  }, [timeLeft])

  return (
    <InfoCard
      classProp={classProp}
      titleText={timeDisplay}
      infoText={`Order process window ${timeText} ${format(
        fromUnixTime(countdownTime),
        'd MMM, h:mmaaa O'
      )}`}
      useGraidentText={true}
    />
  )
}

export default TimerCard
