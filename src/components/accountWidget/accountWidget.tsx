import React, { useEffect, Dispatch, FC, useState } from 'react'
import Web3 from 'web3'
import { CSSTransition } from 'react-transition-group'
import Web3Integrate from '../../services/web3-integrate'
import { connect } from 'react-redux'
import { IState } from '../../state/types'
import { CaretRightFill } from 'react-bootstrap-icons'
import {
  SET_ACCOUNT,
  SET_NETWORK,
  AccountActionTypes,
  DISCONNECT,
} from '../../state/account/types'

import './style.scss'

interface Props {
  account: string | null
  network: string | null
  dispatch: Dispatch<AccountActionTypes>
}

const AccountWidget: FC<Props> = ({ account, network, dispatch }: Props) => {
  const [show, setShow] = useState(true)

  const handleConnect = async () => {
    const web3: Web3 = await Web3Integrate.callModal()
    //const web3: Web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    dispatch({
      type: SET_NETWORK,
      payload: await web3.eth.net.getNetworkType(),
    })
    dispatch({ type: SET_ACCOUNT, payload: accounts[0] })
  }

  const handleScroll = (event) => {
    if (event.target.scrollTop < 20) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, true)
  }, [])

  const handleDisconnect = () => {
    Web3Integrate.disconnect()
    dispatch({ type: DISCONNECT })
  }

  return (
    <CSSTransition in={show} timeout={200} classNames="slide-up" unmountOnExit>
      <div className="account-widget">
        {account && (
          <div className="small disabled font-monospace" onClick={handleDisconnect}>
            {account.substring(0, 12)}...{' '}
            <span>
              <CaretRightFill className="fix-icon-alignment"/>
            </span>
            <span className="network">{network}</span>
          </div>
        )}
        {!account && (
          <div className="account-details">
            <p>
              <span onClick={handleConnect}>disconnected</span>
            </p>
          </div>
        )}
      </div>
    </CSSTransition>
  )
}

export default connect((state: IState) => ({
  account: state.account.account,
  network: state.account.network,
}))(AccountWidget)
