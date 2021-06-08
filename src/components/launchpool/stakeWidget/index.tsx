import React, { FC, useState } from 'react'
import Web3 from 'web3'
import BN from 'bn.js'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { IState } from '../../../state/types'
import ERC20Contract from '../../../smart-contracts/OtocoToken'
import LaunchPoolContract from '../../../smart-contracts/LaunchPool'
import TransactionUtils from '../../../services/transactionUtils'
import TransactionMonitor from '../../transactionMonitor/transactionMonitor'
import { TokensInterface, displayAmountConverter } from '../index'

import './style.scss'
import TokenSelector from './tokenSelector'

interface Props {
  account?: string
  opened: boolean
  poolId: string
  tokens: TokensInterface[]
  closeModal: () => void
}

const StakeWidget: FC<Props> = ({
  account,
  opened,
  poolId,
  tokens,
  closeModal,
}: Props) => {
  const [countdown, setCountdown] = useState<boolean>(false)
  const [transaction, setHash] = useState<string | null>(null)
  const [selectedToken, setSelectedToken] = useState<TokensInterface | null>(
    null
  )
  const [amountInput, setAmountInput] = useState<string | null>(null)
  const [approved, setApproved] = useState<BN>(new BN(0))
  const [balance, setBalance] = useState<BN>(new BN(0))
  const [error, setError] = useState<string>('')
  const [closeAfterConfirm, setCloseAfterConfirm] = useState<boolean>(false)

  const handleSetAmountInput = (event) => {
    setAmountInput(event.target.value)
  }

  const refreshBalanceAndApproval = async (token: TokensInterface) => {
    setBalance(
      new BN(
        await ERC20Contract.getContract(token.address)
          .methods.balanceOf(account)
          .call({ from: account })
      )
    )
    setApproved(
      new BN(
        await ERC20Contract.getContract(token.address)
          .methods.allowance(account, poolId)
          .call({ from: account })
      )
    )
  }

  const handleSelectedToken = async (token: TokensInterface) => {
    setSelectedToken(token)
    refreshBalanceAndApproval(token)
  }

  const handleApprove = async () => {
    if (!account) return
    setError('')
    const requestInfo = await TransactionUtils.getTransactionRequestInfo(
      account,
      '200000'
    )
    try {
      if (!amountInput) throw 'No amount defined'
      const amountToWei: BN = new BN(Web3.utils.toWei(amountInput))
      const decimalsToRemove = new BN(10).pow(
        new BN(18 - selectedToken?.decimals)
      )

      const hash: string = await new Promise((resolve, reject) => {
        ERC20Contract.getContract(selectedToken?.address)
          .methods.approve(poolId, amountToWei.div(decimalsToRemove).toString())
          .send(requestInfo, (error: any, hash: string) => {
            if (error) reject(error.message)
            else resolve(hash)
          })
      })
      console.log(hash)
      setHash(hash)
      setCloseAfterConfirm(false)
    } catch (err) {
      console.log(err)
      setError(err.message)
    }
  }

  const handleStake = async () => {
    if (!account) return
    setError('')
    const requestInfo = await TransactionUtils.getTransactionRequestInfo(
      account,
      '60000'
    )
    try {
      const hash: string = await new Promise((resolve, reject) => {
        LaunchPoolContract.getContract(poolId)
          .methods.stake(selectedToken?.address, approved.toString())
          .send(requestInfo, (error: Error, hash: string) => {
            if (error) reject(error.message)
            else resolve(hash)
          })
      })
      console.log(hash)
      setHash(hash)
      setCloseAfterConfirm(true)
    } catch (err) {
      console.error('Staking error', err)
      setError(err.message)
    }
  }

  const handleCloseModal = async () => {
    setError('')
    setHash(null)
    closeModal()
  }

  const transactionFinished = async () => {
    setHash(null)
    if (closeAfterConfirm) closeModal()
    else refreshBalanceAndApproval(selectedToken)
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
              <h3>Stake Tokens</h3>
              <p className="small">Approve some tokens to be staked.</p>
              <div>
                <div className="row justify-content-center">
                  <TokenSelector
                    tokens={tokens}
                    handleSelect={handleSelectedToken}
                  ></TokenSelector>
                </div>
                {balance.gte(new BN(0)) && (
                  <div className="input-group mt-4 col-12 col-md-6">
                    <input
                      type="text"
                      className={
                        'form-control right ' + (transaction ? 'disabled' : '')
                      }
                      placeholder="Choose amount to approve"
                      aria-label="Text input with dropdown button"
                      onChange={handleSetAmountInput}
                    />
                    <div className="input-group-append">
                      <button
                        className={
                          'btn btn-primary ' + (transaction ? 'disabled' : '')
                        }
                        onClick={handleApprove}
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                )}
                {selectedToken && (
                  <div className="row my-2">
                    <div className="col-12 col-md-6 small">
                      Approved:{' '}
                      {displayAmountConverter(
                        approved,
                        selectedToken?.decimals
                      )}{' '}
                      {selectedToken?.symbol}
                    </div>
                    <div className="col-12 col-md-6 small">
                      Balance:{' '}
                      {displayAmountConverter(balance, selectedToken?.decimals)}{' '}
                      {selectedToken?.symbol}
                    </div>
                  </div>
                )}
              </div>
              {transaction && (
                <TransactionMonitor
                  hash={transaction}
                  title="Approving/Staking Tokens"
                  callbackSuccess={transactionFinished}
                ></TransactionMonitor>
              )}
              {!transaction && (
                <div>
                  {approved.gt(new BN(0)) && (
                    <div className="row p-3">
                      <button className="btn btn-primary" onClick={handleStake}>
                        Stake{' '}
                        {displayAmountConverter(
                          approved,
                          selectedToken?.decimals
                        )}{' '}
                        {selectedToken?.symbol}
                      </button>
                    </div>
                  )}
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
}))(StakeWidget)
