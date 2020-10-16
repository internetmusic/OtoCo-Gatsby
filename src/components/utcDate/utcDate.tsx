import React, { FC } from 'react'

interface Props {
  date: Date
  separator: string
}

const UTCDate: FC<Props> = ({ date, separator }: Props) => {
  const getDate = () => {
    return (
      ('0' + date.getDate()).slice(-2) +
      '/' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '/' +
      date.getFullYear()
    )
  }

  const getTime = () => {
    const time =
      ('0' + date.getUTCHours()).slice(-2) +
      ':' +
      ('0' + (date.getUTCMinutes() + 1)).slice(-2)
    return <span>{time}</span>
  }

  return (
    <span>
      {getDate()} {separator} {getTime()} UTC{' '}
    </span>
  )
}

export default UTCDate
