import React, { useState, FC, Dispatch } from 'react'
import { connect } from 'react-redux'
import { IState } from '../../../state/types'

import Logo from '../../logo/logo'
import './style.scss'

import {
  SET_MANAGE_SECTION,
  ManageSection,
  ManagementActionTypes,
} from '../../../state/management/types'

interface Props {
  address: string
  network?: string
  managing?: string
  dispatch: Dispatch<ManagementActionTypes>
}

const SidebarSeries: FC<Props> = ({
  address,
  network,
  managing,
  dispatch,
}: Props) => {
  const handleChangeSection = (section: ManageSection | undefined) => {
    dispatch({
      type: SET_MANAGE_SECTION,
      payload: section,
    })
  }

  return (
    <nav id="sidebar" className={managing ? '' : 'collapsed'}>
      <div id="sidebar-content">
        <Logo />
        <div className="row mt-5">
          <a
            className="col-12 mx-2 btn"
            onClick={handleChangeSection.bind(undefined, undefined)}
          >
            Overview
          </a>
          <a
            className="col-12 mx-2 btn"
            onClick={handleChangeSection.bind(undefined, ManageSection.LEGAL)}
          >
            Entity Legals
          </a>
          <a
            className="col-12 mx-2 btn"
            onClick={handleChangeSection.bind(undefined, ManageSection.TOKEN)}
          >
            Tokens
          </a>
          <a
            className="col-12 mx-2 btn"
            onClick={handleChangeSection.bind(
              undefined,
              ManageSection.MULTISIG
            )}
          >
            Multisig
          </a>
          <a
            className="col-12 mx-2 btn"
            onClick={handleChangeSection.bind(undefined, ManageSection.ENS)}
          >
            ENS
          </a>
        </div>
      </div>
    </nav>
  )
}

export default connect((state: IState) => ({
  network: state.account.network,
  managing: state.management.managing,
}))(SidebarSeries)
