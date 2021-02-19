import React, { Dispatch, FC, useState } from 'react'
import { connect } from 'react-redux'
import { SeriesType, ManagementActionTypes } from '../../state/management/types'
import { IState } from '../../state/types'
import Textile, { DecryptedInbox } from '../../services/textile'
import { PrivateKey } from '@textile/hub'
import KeyWidget from '../keyWidget/keyWidget'

interface Props {
  account: string | undefined
  network: string | undefined
  managing?: SeriesType
  dispatch: Dispatch<ManagementActionTypes>
}

interface ListMessagesProps {
  messages: DecryptedInbox[]
  handleDelete: (id: string) => Promise<void>
}

const ListMessages = ({ messages, handleDelete }: ListMessagesProps) => {
  return messages.map((m) => (
    <tr key={m.id}>
      <td>{m.from.substring(0, 5)} ...</td>
      <td>{m.body}</td>
      <td className="d-none d-md-block">
        <button
          className="btn btn-primary btn-sm"
          onClick={handleDelete.bind(undefined, m.id)}
        >
          erase
        </button>
      </td>
    </tr>
  ))
}

const SeriesIdentity: FC<Props> = ({
  account,
  network,
  managing,
  dispatch,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [identity, setIdentity] = useState<PrivateKey | null>(null)
  const [messages, setMessages] = useState<DecryptedInbox[]>([])

  React.useEffect(() => {
    setTimeout(async () => {
      if (!account) return
      const id = await Textile.fetchIdentity(account, 'very secret')
      if (id) setIdentity(PrivateKey.fromString(id.toString()))
      else setIdentity(null)
    }, 0)
  }, [account])

  const handleClickCreate = async () => {
    if (!account) return
    setIdentity(
      PrivateKey.fromString(await Textile.generateIdentity(account).toString())
    )
  }

  const handleClickFetchMessages = async () => {
    setMessages(await Textile.listInboxMessages())
  }
  const handleClickSendMessage = async () => {
    if (!identity) return
    await Textile.sendMessage(
      identity?.public.toString(),
      'Test message asd as asd sad asd sad asdsadsaad asd as '
    )
  }
  const handleDeleteMessage = async (id: string) => {
    if (!identity) return
    await Textile.deleteMessage(id)
  }

  return (
    <div className="card">
      <h6 className="card-header">Identity</h6>
      <div className="card-body">
        <div>
          Create an identity related to your account, this would be useful to
          receive messages and share documents.
        </div>
        {identity && (
          <div>
            Your Public Key:{' '}
            <KeyWidget publickey={identity.public.toString()}></KeyWidget>
          </div>
        )}
        <div className="mt-2">
          {!identity && (
            <button
              className="btn btn-small btn-primary"
              onClick={handleClickCreate}
            >
              Create identity
            </button>
          )}
          {identity && (
            <div>
              <button
                className="btn btn-small btn-primary"
                onClick={handleClickFetchMessages}
              >
                Fetch Inbox
              </button>
              <button
                className="btn btn-small btn-primary mx-2"
                onClick={handleClickSendMessage}
              >
                Send Message
              </button>
            </div>
          )}
          <table className="table table-hover mb-5">
            <thead>
              <tr>
                <th scope="col">From</th>
                <th scope="col">Message</th>
                <th scope="col" className="d-none d-md-block">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <ListMessages
                messages={messages}
                handleDelete={handleDeleteMessage}
              ></ListMessages>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default connect((state: IState) => ({
  account: state.account.account,
  network: state.account.network,
  managing: state.management.managing,
}))(SeriesIdentity)
