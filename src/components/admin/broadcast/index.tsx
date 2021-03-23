import { PrivateKey, PublicKey } from '@textile/hub'
import React, { FC, useState } from 'react'
import { connect } from 'react-redux'
import { IState } from '../../../state/types'
import Textile from '../../../services/textile'
import {
  BroadcastMessage,
  MessageSchema,
  PaymentMessage,
} from '../../../state/account/types'

interface Props {
  privatekey?: PrivateKey
}

const Broadcast: FC<Props> = ({ privatekey }: Props) => {
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState<string>('')
  const [link, setLink] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [jurisdiction, setJurisdiction] = useState<string | null>('')

  React.useEffect(() => {
    setTimeout(async () => {
      if (!privatekey) setError('No Account Key-pair found.')
    }, 10)
  }, [privatekey])

  const handleChangeTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleChangeLink = (event) => {
    setLink(event.target.value)
  }
  const handleChangeDescription = (event) => {
    setDescription(event.target.value)
  }
  const handleChangeJurisdiction = (val) => {
    setJurisdiction(val)
  }

  const handleBroadcastMessage = async (val) => {
    if (!privatekey) return
    if (!process.env.GATSBY_ORACLE_KEY) return
    console.log('BROADCAST', title, link, description, jurisdiction)

    const message: BroadcastMessage = {
      title,
      message: description,
      link,
      icon: '',
    }

    if (jurisdiction) {
      message.filter = {
        jurisdiction,
      }
    }

    await Textile.sendMessage(process.env.GATSBY_ORACLE_KEY, {
      method: 'broadcast',
      message,
    })
  }

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="col-12 card">
            <div className="input-group mb-4">
              <input
                type="text"
                className="form-control right"
                placeholder="Message Title"
                onChange={handleChangeTitle}
              />
              <div className="input-group-append">
                <div className="btn btn-primary disabled">Title</div>
              </div>
            </div>
            <div className="input-group mb-4">
              <input
                type="text"
                className="form-control right"
                placeholder="Message Description"
                onChange={handleChangeDescription}
              />
              <div className="input-group-append">
                <div className="btn btn-primary disabled">Description</div>
              </div>
            </div>
            <div className="input-group mb-4">
              <input
                type="text"
                className="form-control right"
                placeholder="Message Link"
                onChange={handleChangeLink}
              />
              <div className="input-group-append">
                <div className="btn btn-primary disabled">Link</div>
              </div>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault0"
                onClick={handleChangeJurisdiction.bind(undefined, null)}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault0">
                All Users
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                onClick={handleChangeJurisdiction.bind(undefined, 'DELAWARE')}
                checked
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Only Delaware
              </label>
            </div>
            <div className="form-check pb-4">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                onClick={handleChangeJurisdiction.bind(undefined, 'WYOMING')}
                checked
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Only Wyoming
              </label>
            </div>
            <button
              className="btn btn-primary mb-2"
              onClick={handleBroadcastMessage}
            >
              Broadcast Message
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect((state: IState) => ({
  privatekey: state.account.privatekey,
}))(Broadcast)
