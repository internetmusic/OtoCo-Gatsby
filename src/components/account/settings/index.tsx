import React, { Dispatch, FC, useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { Link } from 'gatsby'
import { connect } from 'react-redux'
import { IState } from '../../../state/types'
import Textile from '../../../services/textile'
import { PrivateKey } from '@textile/hub'
import KeyWidget from '../../keyWidget/keyWidget'
import NotificationForm from '../welcomeForm'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Icon from '../../icon/icon'
import Web3Modal from '../../../services/web3-integrate'
import { requestPaymentWyre, WyreEnv } from '../../../services/wyre'

import {
  SeriesType,
  ManagementActionTypes,
} from '../../../state/management/types'
import {
  AccountActionTypes,
  SET_ALIAS,
  DecryptedMailbox,
  CachedWallet,
  SET_PRIVATEKEY,
  PaymentMessage,
  SET_INBOX_MESSAGES,
  SET_OUTBOX_MESSAGES,
} from '../../../state/account/types'
import ReactJson from 'react-json-view'

import '../style.scss'

interface Props {
  account?: string
  network?: string
  managing?: SeriesType
  alias?: string
  privatekey?: PrivateKey
  inboxMessages: DecryptedMailbox[]
  outboxMessages: DecryptedMailbox[]
  dispatch: Dispatch<ManagementActionTypes | AccountActionTypes>
}

interface ListMessagesProps {
  messages: DecryptedMailbox[]
  handleDelete: (id: string) => Promise<void>
}

const ListMessages = ({ messages, handleDelete }: ListMessagesProps) => {
  return messages.map((m) => (
    <tr key={m.id}>
      {/* <td>{m.from.substring(0, 5)} ...</td> */}
      <td>
        {m.from.substring(0, 5)}...
        {m.from.substring(m.from.length - 5, m.from.length)}
      </td>
      <td>
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
      </td>
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
  inboxMessages,
  outboxMessages,
  dispatch,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [hasEmail, setHasEmail] = useState<boolean>(false)
  const [email, setEmail] = useState('')
  const [aliasTemp, setAlias] = useState<string | undefined>(undefined)
  // const [messagesIn, setInMessages] = useState<DecryptedMailbox[]>([])
  // const [messagesOut, setOutMessages] = useState<DecryptedMailbox[]>([])

  React.useEffect(() => {
    setTimeout(async () => {
      dispatch({
        type: SET_INBOX_MESSAGES,
        payload: await Textile.listInboxMessages(),
      })
      dispatch({
        type: SET_OUTBOX_MESSAGES,
        payload: await Textile.listOutboxMessages(),
      })
    }, 0)
  }, [account])

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
      // await oracle.saveWallet(account, email, [])
      await Textile.sendMessage(process.env.GATSBY_ORACLE_KEY, {
        method: 'wallet',
        message: {
          _id: account,
          email,
        },
      })
      if (!account) return
      const cachedString = localStorage.getItem(`did:eth:${account.substr(2)}`)
      if (!cachedString) return null
      const cached: CachedWallet = JSON.parse(cachedString)
      cached.password = true
      localStorage.setItem(
        `did:eth:${account.substr(2)}`,
        JSON.stringify(cached)
      )
      setHasEmail(true)
    } catch (err) {
      // setError('Some error occurred creating mailbox.')
      console.error(err)
    }
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
        to={`/account/`}
      >
        <Icon icon={faChevronLeft} />
        <span style={{ paddingLeft: '10px' }}>Back to Account</span>
      </Link>
      {!privatekey && <NotificationForm></NotificationForm>}
      {privatekey && (
        <div>
          <div className="card">
            <div className="card-body">
              <ul className="nav justify-content-left">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to="/account/messages"
                  >
                    Messages
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/account/settings"
                  >
                    Settings
                  </Link>
                </li>
              </ul>
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
              {/* <div>
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
              </div> */}
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
        </div>
      )}
    </div>
  )
}

export default connect((state: IState) => ({
  account: state.account.account,
  network: state.account.network,
  alias: state.account.alias,
  inboxMessages: state.account.inboxMessages,
  outboxMessages: state.account.outboxMessages,
  privatekey: state.account.privatekey,
  managing: state.management.managing,
}))(SeriesIdentity)
