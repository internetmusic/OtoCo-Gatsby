import React, { useState, FC } from 'react'
import { connect } from 'react-redux'
import { IState } from '../../../state/types'

import Logo from '../../logo/logo'
import './style.scss'

interface Props {
  address: string
  network?: string
  managing?: string
}

const SidebarSeries: FC<Props> = ({ address, network, managing }: Props) => {
  return (
    <nav id="sidebar" className={managing ? '' : 'collapsed'}>
      <div id="sidebar-content">
        <Logo />
        <div className="mt-5">
          <h5>Overview</h5>
          <h5>Entity Legals</h5>
          <h5>Token</h5>
          <h5>Multisig</h5>
          <h5>ENS</h5>
        </div>
      </div>
    </nav>
  )
}

export default connect((state: IState) => ({
  network: state.account.network,
  managing: state.management.managing,
}))(SidebarSeries)
