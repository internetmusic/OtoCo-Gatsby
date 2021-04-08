import React, { FC } from 'react'
import ReactJson from 'react-json-view'
import { DecryptedMailbox } from '../../../state/account/types'
import { Trash } from 'react-bootstrap-icons'

interface ListMessagesProps {
  publicKey: string
  entity: string // Company/Entity contract address
  messages: DecryptedMailbox[]
  handleDownload: (content: any) => Promise<void>
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ListPayments = ({
  publicKey,
  entity,
  messages,
  handleDownload,
}: ListMessagesProps) => {
  const tempMessages = messages
    .map((m) => {
      return {
        id: m.id,
        entity: m.body.message.entity,
        product: m.body.message.product,
        receipt: m.body.message.receipt,
        timestamp: m.body.message.timestamp,
        env: m.body.message.method + '-' + m.body.message.environment,
        amount: m.body.message.amount,
        currency: m.body.message.currency,
      }
    })
    .filter((m) => m.entity === entity)

  return tempMessages.map((m) => (
    <tr className="small" key={m.id}>
      <td>
        {m.product} - {m.env}
      </td>
      <td>
        {m.receipt.substring(0, 7)} ...
        {m.receipt.substring(m.receipt.length - 8, m.receipt.length)}
      </td>
      <td className="text-end">{new Date(m.timestamp)}</td>
      <td className="text-end">
        {m.amount} {m.currency}
      </td>
    </tr>
  ))
}
