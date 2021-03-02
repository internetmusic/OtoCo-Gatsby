import React, { useEffect, Dispatch, FC, useState } from 'react'
import Web3 from 'web3'
import { CSSTransition } from 'react-transition-group'
import Web3Integrate from '../../services/web3-integrate'
import { connect } from 'react-redux'
import { IState } from '../../state/types'
import {
  Bell,
  ChevronDown,
  XDiamond,
  PencilSquare,
  Clipboard,
  BoxArrowRight,
} from 'react-bootstrap-icons'
import {
  SET_ACCOUNT,
  SET_NETWORK,
  AccountActionTypes,
  DISCONNECT,
} from '../../state/account/types'

import './style.scss'
import { Link } from 'gatsby'

interface Props {
  account: string | null
  network: string | null
  dispatch: Dispatch<AccountActionTypes>
}

const AccountWidget: FC<Props> = ({ account, network, dispatch }: Props) => {
  const [show, setShow] = useState(true)
  const [collapsed, setCollapse] = useState(true)

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
    setCollapse(true)
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, true)
    setCollapse(true)
  }, [account, show])

  const handleDisconnect = () => {
    Web3Integrate.disconnect()
    dispatch({ type: DISCONNECT })
  }

  const handleDropdown = () => {
    setCollapse(!collapsed)
  }

  return (
    <CSSTransition in={show} timeout={200} classNames="slide-up" unmountOnExit>
      <div className="account-widget">
        {account && (
          <div className="vert">
            <div className="p-3 shine-on-hover" onClick={handleDropdown}>
              <XDiamond className="me-3" />
              {account.substring(0, 8)}...
              {account.substring(account.length - 4, account.length)}
              <Bell className="mx-3" />
              <ChevronDown className={collapsed ? 'icon' : 'icon rotated'} />
            </div>
            {!collapsed && (
              <div className="pt-3 pb-2 px-3 with-divider shine-on-hover">
                <Clipboard className="me-3" />
                Copy Public Key
              </div>
            )}
            {!collapsed && (
              <Link
                className="pb-3 pt-2 px-3 shine-on-hover"
                to="/dashpanel/identity"
              >
                <PencilSquare className="me-3" />
                Edit Wallet Identity
              </Link>
            )}
            {!collapsed && (
              <div
                className="p-3 with-divider shine-on-hover"
                onClick={handleDisconnect}
              >
                <BoxArrowRight className="me-3" />
                Disconnect
              </div>
            )}
          </div>
        )}
        {!account && (
          <div className="p-3" onClick={handleConnect}>
            Connect your Wallet <XDiamond className="ms-3" />
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
