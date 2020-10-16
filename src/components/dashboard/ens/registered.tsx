import React, { Dispatch, FC } from 'react'
import { connect } from 'react-redux'
import {
  SET_ENS_CONFIG,
  SeriesType,
  ENSConfig,
  ManagementActionTypes,
} from '../../../state/management/types'
import AddressWidget from '../../addressWidget/addressWidget'
import { IState } from '../../../state/types'

interface Props {
  account?: string | null
  network?: string | null
  managing?: SeriesType
  ensConfig?: ENSConfig
  dispatch: Dispatch<ManagementActionTypes>
}

const Registered: FC<Props> = ({
  account,
  network,
  managing,
  ensConfig,
  dispatch,
}: Props) => {
  return (
    <div className="small">
      You successfully claimed <AddressWidget address={managing?.contract} /> as
      the name for your company address {managing.contract}.
    </div>
  )
}

export default connect((state: IState) => ({
  account: state.account.account,
  network: state.account.network,
  managing: state.management.managing,
  ensConfig: state.management.ensConfig,
}))(Registered)
