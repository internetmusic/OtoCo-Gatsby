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

  const handleClickSendMessage = async () => {
    // ASSINAR COM TEXTILE IDENTITY
    const web3 = await Web3Modal.getWeb3()
    if (!web3 || !privatekey) return
    // await requestPaymentWyre(WyreEnv.TEST, 5)
    const message: PaymentMessage = {
      _id: 'SOME HASH OR URL',
      plugin: 'EIN',
      currency: 'DAI',
      amount: 5,
      body: {
        field1: 'aaaa',
        field2: 'bbbb',
      },
    }
    await Textile.sendMessage(privatekey.public.toString(), {
      method: 'payment',
      message,
    })
  }
  const handleDelete = async (id: string) => {
    if (!privatekey) return
    await Textile.deleteMessage(id)
    console.log('DELETED', id)
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
                    className="nav-link active"
                    aria-current="page"
                    to="/account/messages"
                  >
                    Messages
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to="/account/settings"
                  >
                    Settings
                  </Link>
                </li>
              </ul>
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
                    messages={inboxMessages}
                    handleDelete={handleDelete}
                  ></ListMessages>
                </tbody>
              </table>
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
                    messages={outboxMessages}
                    handleDelete={handleDelete}
                  ></ListMessages>
                </tbody>
              </table>
            </div>
          </div>
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
  inboxMessages: state.account.inboxMessages,
  outboxMessages: state.account.outboxMessages,
  privatekey: state.account.privatekey,
  managing: state.management.managing,
}))(SeriesIdentity)
