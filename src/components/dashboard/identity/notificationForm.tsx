import React, { Dispatch, FC, useState } from 'react'
import { connect } from 'react-redux'
import { IState } from '../../../state/types'

import BotImage from '../../../../static/img/bot.svg'
import Textile from '../../../services/textile'

import {
  SET_CONTACT_FORM,
  SeriesType,
  ManagementActionTypes,
} from '../../../state/management/types'
import {
  SET_PRIVATEKEY,
  AccountActionTypes,
  DecryptedMailbox,
} from '../../../state/account/types'
import { PrivateKey } from '@textile/hub'
import { Link } from 'gatsby'
import { Mailbox } from 'react-bootstrap-icons'

interface Props {
  account: string
  privatekey?: PrivateKey
  managing?: SeriesType
  inboxMessages: DecryptedMailbox[]
  dispatch: Dispatch<AccountActionTypes | ManagementActionTypes>
}

const MailboxForm: FC<Props> = ({
  account,
  privatekey,
  inboxMessages,
  dispatch,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(true)

  React.useEffect(() => {
    setTimeout(async () => {
      setLoading(true)
      if (!privatekey) return setLoading(false)
      setLoading(false)
    }, 0)
  }, [privatekey])

  const handleClickCreate = async () => {
    try {
      const pk = await Textile.generateIdentity(account)
      if (!pk) return
      const signature = await Textile.generatePublicKeyValidation(
        account,
        pk.public.toString()
      )
      if (!signature) return
      const message = {
        _id: account,
        signature: signature,
      }
      await Textile.sendMessage(process.env.GATSBY_ORACLE_KEY, {
        method: 'wallet',
        message,
      })
      dispatch({ type: SET_PRIVATEKEY, payload: pk })
      dispatch({ type: SET_CONTACT_FORM, payload: false })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="ui celled contact-form animate-slide">
          {!loading && privatekey == undefined && (
            <div className="row">
              <div className="col-6 col-lg-8">
                {/* <h3>Welcome to your Dashboard</h3> */}
                <p className="small">
                  Create an local mailbox to stabilish a communication gateway.
                  This mailbox will store your data encrypted end-by-end with
                  ECDSA key-pairs. For this, you only have to sign a message.
                </p>
                <p>
                  <button
                    className="btn btn-primary"
                    onClick={handleClickCreate}
                  >
                    Create Mailbox
                  </button>
                </p>
              </div>
              <div className="d-none d-md-block col-6 col-lg-4">
                <img
                  className="bot-icon"
                  src={BotImage}
                  alt="Big Feature Icon"
                  height="128px"
                />
              </div>
            </div>
          )}
          {!loading && privatekey != undefined && (
            <div className="row">
              <div className="col-6 col-lg-8">
                {inboxMessages.length == 0 && <p>No new messages.</p>}
                {inboxMessages.length > 0 && (
                  <div>
                    <p>You have {inboxMessages.length} new messages.</p>
                    <Link
                      className="btn btn-primary-outline"
                      to={`/dashpanel/identity/`}
                    >
                      <Mailbox className="me-2" />
                      Go to Mailbox
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
          {loading && (
            <div className="row">
              <div className="col-12 text-center">Loading</div>
              <div className="col-12 text-center">
                <div className="spinner-border" role="status"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default connect((state: IState) => ({
  account: state.account.account,
  privatekey: state.account.privatekey,
  managing: state.management.managing,
  inboxMessages: state.account.inboxMessages,
}))(MailboxForm)
