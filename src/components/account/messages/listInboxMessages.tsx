import React, { FC } from 'react'
import ReactJson from 'react-json-view'
import { DecryptedMailbox } from '../../../state/account/types'
import { BroadcastMessage } from './broadcastMessage'
import { WalletMessage } from './walletMessage'

interface ListMessagesProps {
  publicKey: string
  messages: DecryptedMailbox[]
  handleDelete: (id: string) => Promise<void>
}

const oraclePublicKey = process.env.GATSBY_ORACLE_KEY

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ListInboxMessages = ({
  publicKey,
  messages,
  handleDelete,
}: ListMessagesProps) => {
  return messages.map((m) => (
    <tr key={m.id}>
      {publicKey == m.from && <span>me</span>}
      {oraclePublicKey == m.from && <span>oracle</span>}
      {oraclePublicKey != m.from && publicKey != m.from && (
        <td>
          {m.from.substring(0, 5)} ...
          {m.from.substring(m.from.length - 5, m.from.length)}
        </td>
      )}
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
      <td className="d-none d-md-block">
        {m.body.method == 'broadcast' && (
          <a className="btn btn-primary btn-sm me-2" href={m.body.message.link}>
            visit
          </a>
        )}
        <button
          className="btn btn-primary btn-sm me-2"
          onClick={handleDelete.bind(undefined, m.id)}
        >
          erase
        </button>
      </td>
    </tr>
  ))
}
