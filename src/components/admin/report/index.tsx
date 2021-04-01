import { PrivateKey, PublicKey } from '@textile/hub'
import React, { FC, useState } from 'react'
import { connect } from 'react-redux'
import { IState } from '../../../state/types'
import Textile from '../../../services/textile'
import {
  BroadcastFilter,
  BroadcastMessage,
  MessageSchema,
  PaymentMessage,
} from '../../../state/account/types'

interface Props {
  privatekey?: PrivateKey
}

const Report: FC<Props> = ({ privatekey }: Props) => {
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState<string>('')
  const [link, setLink] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [filter, setFilter] = useState<BroadcastFilter | null>(null)

  React.useEffect(() => {
    setTimeout(async () => {
      if (!privatekey) setError('No Account Key-pair found.')
      if (privatekey) setError(null)
    }, 10)
  }, [privatekey])

  const handleReportRequest = async () => {
    if (!privatekey) return
    if (!process.env.GATSBY_ORACLE_KEY) return

    await Textile.sendMessage(process.env.GATSBY_ORACLE_KEY, {
      method: 'report',
      message: {},
    })
  }

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="col-12 card">
            {!error && (
              <button
                className="btn btn-primary mb-2"
                onClick={handleReportRequest}
              >
                Request Report
              </button>
            )}
            {error && <p>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect((state: IState) => ({
  privatekey: state.account.privatekey,
}))(Report)
