import React from 'react'

//style
import './InfoCard.scss'

type Props = {
  classProp?: string
  titleText: string
  infoText: string
  useGraidentText?: boolean
}

const InfoCard = ({
  classProp = '',
  titleText,
  infoText,
  useGraidentText = false,
}: Props) => (
  <div className={`info-card ${classProp}`}>
    <div className={'text-wrapper'}>
      <span
        className={
          useGraidentText ? 'graident-text info-card-title' : 'info-card-title'
        }
      >
        {titleText}
      </span>
      <p>{infoText}</p>
    </div>
  </div>
)

export default InfoCard
