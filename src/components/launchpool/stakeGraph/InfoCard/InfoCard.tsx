import React from 'react'

//style
import './InfoCard.scss'

type Props = {
  titleText: string
  infoText: string
  useGraidentText?: boolean
  useGraidentBackground?: boolean
}

const InfoCard = ({
  titleText,
  infoText,
  useGraidentText = false,
  useGraidentBackground = false,
}: Props) => (
  <div
    className={
      useGraidentBackground ? 'info-card graident-background' : 'info-card'
    }
  >
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
