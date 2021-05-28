import React, { FC } from 'react'
import ReactJson from 'react-json-view'
import { DecryptedMailbox } from '../../../state/account/types'
import { DashSquareFill } from 'react-bootstrap-icons'
import UTCDate from '../../utcDate/utcDate'

import { StakeInterface } from './index'

interface ListMessagesProps {
  stakes: StakeInterface[]
  handleUnstake: (index: number) => void
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const StakeList = ({ stakes, handleUnstake }: ListMessagesProps) => {
  return (
    <>
      {stakes.map((m) => (
        <tr className="small" key={m.id}>
          <td>#{m.id}</td>
          <td className="text-end">
            {m.amount} {m.token.symbol}
          </td>
          <td className="text-end">{m.price} USD</td>
          <td className="text-end">
            {m.amount > 0 && (
              <button
                className="btn btn-primary btn-sm"
                onClick={handleUnstake.bind(undefined, m.id)}
              >
                unstake <DashSquareFill></DashSquareFill>
              </button>
            )}
            {m.amount == 0 && <span className="text-gray"> unstaked </span>}
          </td>
        </tr>
      ))}
    </>
  )
}

export default StakeList
