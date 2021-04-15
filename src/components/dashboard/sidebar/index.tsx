import React, { useState, FC, Dispatch } from 'react'
import { connect } from 'react-redux'
import { IState } from '../../../state/types'

import Logo from '../../logo/logo'
import './style.scss'

import {
  SET_MANAGE_SECTION,
  ManageSection,
  ManagementActionTypes,
  SeriesType,
  Badges,
} from '../../../state/management/types'
import { Inboxes } from 'react-bootstrap-icons'
import OtocoIcon from '../../icons'
import EntityCard from './entityCard'

interface Props {
  account: string
  network?: string
  managing?: SeriesType
  dispatch: Dispatch<ManagementActionTypes>
}

const SidebarSeries: FC<Props> = ({
  account,
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
        <div className="row mt-2">
          {managing && (
            <EntityCard
              name={managing.name}
              jurisdiction={managing?.jurisdiction}
              badges={managing?.badges}
            />
          )}
          {managing && managing?.badges.length > 0 && (
            <div>
              <a
                className="col-12 mx-2 btn"
                onClick={handleChangeSection.bind(undefined, undefined)}
              >
                <OtocoIcon icon="house" className="me-3 mb-1" />
                Overview
              </a>
              <a
                className="col-12 mx-2 btn"
                onClick={handleChangeSection.bind(
                  undefined,
                  ManageSection.LEGAL
                )}
              >
                <OtocoIcon icon="fileearmarktext" className="me-3 mb-1" />
                Files
              </a>
              <a
                className="col-12 mx-2 btn"
                onClick={handleChangeSection.bind(
                  undefined,
                  ManageSection.TOKEN
                )}
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
                onClick={handleChangeSection.bind(
                  undefined,
                  ManageSection.PLUGINS
                )}
              >
                <Inboxes className="me-3 mb-1" />
                Billing
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default connect((state: IState) => ({
  account: state.account.account,
  network: state.account.network,
  managing: state.management.managing,
}))(SidebarSeries)
