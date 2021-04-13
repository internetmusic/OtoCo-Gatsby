import React, { FC } from 'react'
import { Clipboard } from 'react-bootstrap-icons'
import { Badges } from '../../../state/management/types'

interface Props {
  name: string
  jurisdiction: string
  bardges: Badges[]
}

const EntityCard: FC<Props> = ({ name, jurisdiction, badges }: Props) => {
  const clickCopyHandler = (info: string) => {
    navigator.clipboard.writeText(info)
  }

  return (
    <div className="card entity-card">
      <h3>{name}</h3>
      <div className="small">{jurisdiction}</div>
    </div>
  )
}

export default EntityCard
