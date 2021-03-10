import React, { Dispatch, FC, useState } from 'react'
import { Link } from 'gatsby'
import { connect } from 'react-redux'
import { IState } from '../../../state/types'
import Textile from '../../../services/textile'
import { PrivateKey } from '@textile/hub'
import KeyWidget from '../../keyWidget/keyWidget'
import NotificationForm from './notificationForm'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Icon from '../../icon/icon'
import oracle from '../../../services/oracle'

import {
  SeriesType,
  ManagementActionTypes,
} from '../../../state/management/types'
import {
  AccountActionTypes,
  SET_ALIAS,
  DecryptedInbox,
  CachedWallet,
  SET_PRIVATEKEY,
} from '../../../state/account/types'

interface Props {
  account?: string
  network?: string
  managing?: SeriesType
  alias?: string
  privatekey?: PrivateKey
  dispatch: Dispatch<ManagementActionTypes | AccountActionTypes>
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
  alias,
  privatekey,
  dispatch,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [hasEmail, setHasEmail] = useState<boolean>(false)
  const [email, setEmail] = useState('')
  const [aliasTemp, setAlias] = useState<string | undefined>(undefined)
  const [messages, setMessages] = useState<DecryptedInbox[]>([])

  const handleClickCreate = async () => {
    if (!account) return
    dispatch({
      type: SET_PRIVATEKEY,
      payload: PrivateKey.fromString(
        await Textile.generateIdentity(account).toString()
      ),
    })
  }
  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }
  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }
  const handleUpdateEmail = async () => {
    if (!validateEmail(email) && email.length > 0) {
      //setError('* please fill a valid e-mail.')
      return
    }
    try {
      if (email.length == 0) return
      await oracle.saveWallet(account, email, [])
      setHasEmail(true)
    } catch (err) {
      // setError('Some error occurred creating mailbox.')
      console.error(err)
    }
  }
  const handleClickFetchMessages = async () => {
    setMessages(await Textile.listInboxMessages())
  }
  const handleClickSendMessage = async () => {
    await Textile.sendMessage(
      'bbaareicl5xlgj3ebo6txtbhugsnx6idu4rnvw6w55zr4ejlapb2az2yusm',
      JSON.stringify({
        _id: 'SOME HASH OR URL',
        plugin: 'EIN',
        currency: 'DAI',
        amount: 5,
        body: {
          field1: 'aaaa',
          field2: 'bbbb',
        },
      })
    )
  }
  const handleDelete = async (id: string) => {
    if (!privatekey) return
    await Textile.deleteMessage(id)
  }
  const handleChangeAliasTemp = (event) => {
    setAlias(event.target.value)
  }
  const handleChangeAlias = async () => {
    if (!aliasTemp || !account) return
    const cachedString = localStorage.getItem(`did:eth:${account.substr(2)}`)
    if (!cachedString) return null
    const cached: CachedWallet = JSON.parse(cachedString)
    cached.alias = aliasTemp
    localStorage.setItem(`did:eth:${account.substr(2)}`, JSON.stringify(cached))
    dispatch({ type: SET_ALIAS, payload: aliasTemp })
  }

  return (
    <div className="container-sm limiter-md content">
      <Link
        className="btn btn-back btn-primary-outline btn-sm"
        to={`/dashpanel/`}
      >
        <Icon icon={faChevronLeft} />
        <span style={{ paddingLeft: '10px' }}>Back to Dashpanel</span>
      </Link>
      <h1>Wallet Mailbox</h1>
      <h5 className="mb-4">
        Local stored mailbox. With end-to-end encryption to send/receive
        messages, create verified certifications and store encrypted documents
        on IPFS.
      </h5>
      {!privatekey && <NotificationForm></NotificationForm>}
      {privatekey && (
        <div>
          <div className="card">
            <div className="card-body">
              <h5>inbox</h5>
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
                    handleDelete={handleDelete}
                  ></ListMessages>
                </tbody>
              </table>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5>sent</h5>
              <table className="table table-hover mb-5">
                <thead>
                  <tr>
                    <th scope="col">To</th>
                    <th scope="col">Message</th>
                    <th scope="col" className="d-none d-md-block">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <ListMessages
                    messages={messages}
                    handleDelete={handleDelete}
                  ></ListMessages>
                </tbody>
              </table>
            </div>
          </div>
          <h1>Wallet Settings</h1>
          <div className="card">
            <div className="card-body">
              Your Public Key:{' '}
              <KeyWidget publickey={privatekey.public.toString()}></KeyWidget>
              {!hasEmail && (
                <div>
                  <h5 className="mt-4">
                    Use following form to update/add your contact e-mail:
                  </h5>
                  <div className="input-group my-2 col-12 col-md-8">
                    <input
                      type="text"
                      className="form-control right"
                      placeholder="johndoe@domain.com"
                      onChange={handleChangeEmail}
                    />
                    <div className="input-group-append">
                      <div
                        onClick={handleUpdateEmail}
                        className="btn btn-primary"
                      >
                        update e-mail
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {!hasEmail && (
                <div>
                  <h5 className="mt-4">
                    Use following form to encrypt your private-key locally:
                  </h5>
                  <div className="input-group my-2 col-12 col-md-8">
                    <input
                      type="text"
                      className="form-control right"
                      placeholder="choose a password"
                      onChange={handleChangeEmail}
                    />
                    <div className="input-group-append">
                      <div
                        onClick={handleUpdateEmail}
                        className="btn btn-primary disabled"
                      >
                        create password
                      </div>
                    </div>
                  </div>
                  <div className="input-group my-2 col-12 col-md-8">
                    <input
                      type="text"
                      className="form-control right"
                      placeholder="repeat password"
                      onChange={handleChangeEmail}
                    />
                    <div className="input-group-append">
                      <div
                        onClick={handleUpdateEmail}
                        className="btn btn-primary"
                      >
                        encrypt keys
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <h5 className="mt-4">Create an alias to your wallet:</h5>
              <div className="input-group my-2 col-12 col-md-8">
                <input
                  type="text"
                  className="form-control right"
                  placeholder={alias || 'choose an alias'}
                  onChange={handleChangeAliasTemp}
                />
                <div className="input-group-append">
                  <div onClick={handleChangeAlias} className="btn btn-primary">
                    {alias ? 'update alias' : 'create alias'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={handleClickFetchMessages}
          >
            Refresh Messages
          </button>
          <button
            className="btn btn-primary mx-2"
            onClick={handleClickSendMessage}
          >
            Send Payment Message
          </button>
        </div>
      )}
    </div>
  )
}

export default connect((state: IState) => ({
  account: state.account.account,
  network: state.account.network,
  alias: state.account.alias,
  privatekey: state.account.privatekey,
  managing: state.management.managing,
}))(SeriesIdentity)
