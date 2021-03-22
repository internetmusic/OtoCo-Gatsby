import React, { Dispatch, FC, useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { Link } from 'gatsby'
import { connect } from 'react-redux'
import { IState } from '../../../state/types'
import Textile from '../../../services/textile'
import { PrivateKey } from '@textile/hub'
import NotificationForm from '../welcomeForm'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Icon from '../../icon/icon'
import Web3Modal from '../../../services/web3-integrate'
import { requestPaymentWyre, WyreEnv } from '../../../services/wyre'
import { ListInboxMessages } from './listInboxMessages'
import { ListOutboxMessages } from './listOutboxMessages'

import { ManagementActionTypes } from '../../../state/management/types'
import {
  AccountActionTypes,
  DecryptedMailbox,
  PaymentMessage,
  SET_INBOX_MESSAGES,
  SET_OUTBOX_MESSAGES,
} from '../../../state/account/types'

interface Props {
  account?: string
  privatekey?: PrivateKey
  inboxMessages: DecryptedMailbox[]
  outboxMessages: DecryptedMailbox[]
  dispatch: Dispatch<ManagementActionTypes | AccountActionTypes>
}

const SeriesIdentity: FC<Props> = ({
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
  }, [privatekey])

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
                  <ListInboxMessages
                    publicKey={privatekey.public.toString()}
                    messages={inboxMessages}
                    handleDelete={handleDelete}
                  ></ListInboxMessages>
                </tbody>
              </table>
              <h5>sent</h5>
              <table className="table table-hover mb-5">
                <thead>
                  <tr>
                    <th scope="col">Message</th>
                    <th scope="col" className="d-none d-md-block">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <ListOutboxMessages
                    publicKey={privatekey.public.toString()}
                    messages={outboxMessages}
                    handleDelete={handleDelete}
                  ></ListOutboxMessages>
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
  inboxMessages: state.account.inboxMessages,
  outboxMessages: state.account.outboxMessages,
  privatekey: state.account.privatekey,
}))(SeriesIdentity)
