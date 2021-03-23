import React, { FC } from 'react'
import ReactJson from 'react-json-view'
import { DecryptedMailbox } from '../../../state/account/types'
import { BroadcastMessage } from './broadcastMessage'
import { WalletMessage } from './walletMessage'
import { Trash } from 'react-bootstrap-icons'

interface ListMessagesProps {
  publicKey: string
  messages: DecryptedMailbox[]
  handleDelete: (id: string) => Promise<void>
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ListOutboxMessages = ({
  publicKey,
  messages,
  handleDelete,
}: ListMessagesProps) => {
  return messages.map((m) => (
    <tr key={m.id}>
      <td>
        {m.body.method == 'other' && (
          <ReactJson
            src={m.body}
            theme="monokai"
            collapseStringsAfterLength={8}
            displayDataTypes={false}
            displayObjectSize={false}
            collapsed={true}
            enableClipboard={false}
            style={{
              background: 'transparent',
            }}
          />
        )}
        {m.body.method == 'wallet' && (
          <WalletMessage message={m}></WalletMessage>
        )}
        {m.body.method == 'broadcast' && (
          <BroadcastMessage message={m}></BroadcastMessage>
        )}
      </td>
      <td className="d-none d-md-block" style={{ textAlign: 'right' }}>
        <button
          className="btn btn-primary btn-sm"
          onClick={handleDelete.bind(undefined, m.id)}
        >
          <Trash></Trash>
        </button>
      </td>
    </tr>
  ))
}
