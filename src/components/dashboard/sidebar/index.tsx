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
import { Inboxes } from 'react-bootstrap-icons'
import OtocoIcon from '../../icons'

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
            <OtocoIcon icon="house" className="me-3 mb-1" />
            Overview
          </a>
          <a
            className="col-12 mx-2 btn"
            onClick={handleChangeSection.bind(undefined, ManageSection.LEGAL)}
          >
            <OtocoIcon icon="fileearmarktext" className="me-3 mb-1" />
            Files
          </a>
          <a
            className="col-12 mx-2 btn"
            onClick={handleChangeSection.bind(undefined, ManageSection.TOKEN)}
          >
            <OtocoIcon icon="box" className="me-3 mb-1" />
            Tokens
          </a>
          <a
            className="col-12 mx-2 btn"
            onClick={handleChangeSection.bind(
              undefined,
              ManageSection.MULTISIG
            )}
          >
            <OtocoIcon icon="keys" className="me-3 mb-1" />
            Multisig
          </a>
          <a
            className="col-12 mx-2 btn"
            onClick={handleChangeSection.bind(undefined, ManageSection.ENS)}
          >
            <OtocoIcon icon="globe" className="me-3 mb-1" />
            ENS
          </a>
          <a
            className="col-12 mx-2 btn"
            onClick={handleChangeSection.bind(undefined, ManageSection.PLUGINS)}
          >
            <Inboxes className="me-3 mb-1" />
            Billing
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
