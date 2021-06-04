import React, { FC, useState } from 'react'
import Web3 from 'web3'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { IState } from '../../../state/types'
import ERC20Contract from '../../../smart-contracts/OtocoToken'
import TransactionUtils from '../../../services/transactionUtils'
import { TokensInterface } from '../index'
import OtocoIcon from '../../icons'

import './style.scss'

interface Props {
  account?: string
  poolId: string
  tokens: TokensInterface[]
  closeModal: () => void
}

const StakeWidget: FC<Props> = ({
  account,
  poolId,
  tokens,
  closeModal,
}: Props) => {
  const [opened, setOpened] = useState<boolean>(false)
  const [countdown, setCountdown] = useState<boolean>(false)
  const [hash, setHash] = useState<string | null>(null)
  const [selectedToken, setSelectedToken] = useState<string | null>(null)
  const [amountInput, setAmountInput] = useState<string | null>(null)
  const [approved, setApproved] = useState<BN | null>(null)
  const [balance, setBalance] = useState<BN | null>(null)
  const [error, setError] = useState<string>('')

  const listTokenButtons = () => {
    return (
      <>
        {tokens.map((t: TokensInterface) => (
          <button
            key={t.address}
            className="btn btn-primary modal-option"
            onClick={setSelectedToken.bind(undefined, t.address)}
          >
            <OtocoIcon icon="dai" size={48} />
            <div className="label">{t.symbol}</div>
          </button>
        ))}
      </>
    )
  }

  const handleSetAmountInput = (event) => {
    setSelectedToken(event.target.value)
  }

  const handleApprove = async (token: string, amount: string) => {
    if (!account) return
    const requestInfo = await TransactionUtils.getTransactionRequestInfo(
      account,
      '200000'
    )
    try {
      const hash = await new Promise((resolve, reject) => {
        ERC20Contract.getContract(token)
          .methods.approve(id, amount)
          .send(requestInfo, (error: any, hash: string) => {
            if (error) reject(error.message)
            else resolve(hash)
          })
      })
      console.log(hash)
    } catch (err) {
      console.log(err)
    }
  }

  const handleStake = async (token: string, amount: string) => {
    if (!account) return
    const requestInfo = await TransactionUtils.getTransactionRequestInfo(
      account,
      '60000'
    )
    try {
      const hash: string = await new Promise((resolve, reject) => {
        LaunchPoolContract.getContract(id)
          .methods.stake(token, amount)
          .send(requestInfo, (error: Error, hash: string) => {
            if (error) reject(error.message)
            else resolve(hash)
          })
      })
      console.log(hash)
    } catch (err) {
      console.error('Staking error', err)
    }
  }

  const handleCloseModal = async () => {
    setError('')
    setReceipt(null)
    setStatus(StatusType.CLOSED)
    closeModal()
  }

  React.useEffect(() => {
    console.log('SHOW ==>> ', opened)
    if (opened) {
      setTimeout(() => {
        setCountdown(true)
      }, 200)
    } else {
      setCountdown(false)
    }
  }, [opened])

  return (
    <div>
      {opened && (
        <div className="modal-widget">
          <CSSTransition
            in={countdown}
            timeout={{
              appear: 200,
              enter: 200,
              exit: 200,
            }}
            classNames="slide-up"
            unmountOnExit
          >
            <div className="modal-content">
              <div className="close" onClick={handleCloseModal}>
                &times;
              </div>
              {!hash && (
                <div>
                  <h3>Processing Payment</h3>
                  <div className="small">Item: {product}</div>
                  <div
                    className="row justify-content-center align-items-center"
                    style={{ minHeight: '230px' }}
                  >
                    <div className="col">
                      <div className="col-12 text-center">
                        <div className="spinner-border" role="status"></div>
                      </div>
                      <div className="col-12 text-center">
                        <b>Payment confirming...</b>
                      </div>
                      <div className="col-12 text-center text-warning">
                        Do not close or refresh page
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {hash && (
                <div>
                  <h3>Select Token</h3>
                  <div className="row justify-content-center">
                    <listTokenButtons></listTokenButtons>
                  </div>
                  <p className="small">
                    You will receive a message in your dashpanel once your
                    payment is confirmed.
                  </p>
                  <input
                    type="text"
                    className="form-control right"
                    placeholder="Choose token name"
                    aria-label="Text input with dropdown button"
                    onChange={handleSetAmountInput}
                  />
                  <div className="row justify-content-left">
                  <button
                    className="btn btn-primary"
                    onClick={handleApprove}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleStake}
                  >
                    Stake {}
                  </button>
                </div>
              )}
              {error && <p className="small text-warning">{error}</p>}
            </div>
          </CSSTransition>
        </div>
      )}
    </div>
  )
}

export default connect((state: IState) => ({
  account: state.account.account,
  network: state.account.network,
  privatekey: state.account.privatekey,
  managing: state.management.managing,
}))(StakeWidget)
