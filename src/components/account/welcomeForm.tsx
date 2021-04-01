import React, { Dispatch, FC, useState } from 'react'
import { connect } from 'react-redux'
import { IState } from '../../state/types'

import BotImage from '../../../static/img/small-bot2.png'
import BotSmallImage from '../../../static/img/small-bot.png'
import Textile from '../../services/textile'

import {
  SET_CONTACT_FORM,
  SeriesType,
  ManagementActionTypes,
} from '../../state/management/types'
import {
  SET_PRIVATEKEY,
  AccountActionTypes,
  DecryptedMailbox,
} from '../../state/account/types'
import { PrivateKey } from '@textile/hub'
import { Link } from 'gatsby'

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
  const [creation, setCreation] = useState<{
    step: number
    message: string
  } | null>(null)

  React.useEffect(() => {
    setTimeout(async () => {
      setLoading(true)
      if (!privatekey) return setLoading(false)
      setLoading(false)
    }, 0)
  }, [privatekey])

  const setWaitTimer = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 1000)
    })
  }

  const handleClickCreate = async () => {
    try {
      if (!process.env.GATSBY_ORACLE_KEY) throw 'No oracle public key found.'
      setCreation({
        step: 1,
        message: 'First we ask to sign a message to create a key pair.',
      })
      await setWaitTimer()
      const pk = await Textile.generateIdentity(account)
      if (!pk) throw 'Error: Private Key not created.'
      setCreation({
        step: 2,
        message:
          'Now we ask you to sign a message to proof link between publickey and your wallet account.',
      })
      await setWaitTimer()
      const signature = await Textile.generatePublicKeyValidation(
        account,
        pk.public.toString()
      )
      if (!signature) throw 'Error: Signature not created'
      const message = {
        _id: account,
        signature: signature,
      }
      await Textile.sendMessage(process.env.GATSBY_ORACLE_KEY, {
        method: 'wallet',
        message,
      })
      Textile.storeKeys(account)
      dispatch({ type: SET_PRIVATEKEY, payload: pk })
    } catch (err) {
      setCreation(null)
      console.error(err)
    }
  }

  return (
    <div className="card welcome">
      <div className="ui celled contact-form animate-slide">
        {!loading && privatekey == undefined && (
          <div className="row">
            {!creation && (
              <div className="col-6 col-lg-8">
                <h4>Access everything in one place</h4>
                <p className="small">
                  Sign with your connected wallet to send and receive encrypted
                  messages related to your entities, get file storage on IPFS,
                  and authenticate your role in each company you're involved
                  with.
                </p>
                <p>
                  <button
                    className="btn btn-primary"
                    onClick={handleClickCreate}
                  >
                    Activate
                  </button>
                </p>
              </div>
            )}
            {creation && (
              <div className="col-6 col-lg-8">
                <h4>{creation.step == 1 ? 'First' : 'Last'} step</h4>
                <p className="small">{creation.message}</p>
                <p>
                  <button
                    className="btn btn-primary disabled"
                    onClick={handleClickCreate}
                  >
                    activate
                  </button>
                </p>
              </div>
            )}
            <div className="d-none d-md-block col-6 col-lg-4">
              <img className="bot-icon" src={BotImage} />
            </div>
          </div>
        )}
        {!loading && privatekey != undefined && (
          <div>
            <div className="row">
              <div className="col-8">
                {inboxMessages.length == 0 && (
                  <div>
                    <h4>Encrypted messaging and file storage activated!</h4>
                    <p className="small">No new messages.</p>
                    <Link
                      className="btn btn-primary-outline btn-sm"
                      to={`/account/settings/`}
                    >
                      Go to Account Settings
                    </Link>
                  </div>
                )}
                {inboxMessages.length > 0 && (
                  <div>
                    <h4>Encrypted messaging and file storage activated!</h4>
                    <p className="small">
                      You have {inboxMessages.length} new messages.
                    </p>
                    <Link
                      className="btn btn-primary-outline btn-sm"
                      to={`/account/messages/`}
                    >
                      Go to Messages
                    </Link>
                  </div>
                )}
              </div>
              <div className="d-none d-sm-block col-4 col-lg-4">
                <img
                  className="bot-icon-small"
                  src={BotSmallImage}
                  alt="Big Feature Icon"
                  height="128px"
                />
              </div>
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
  )
}

export default connect((state: IState) => ({
  account: state.account.account,
  privatekey: state.account.privatekey,
  managing: state.management.managing,
  inboxMessages: state.account.inboxMessages,
}))(MailboxForm)
