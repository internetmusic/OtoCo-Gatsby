import React from 'react'
import loadable from '@loadable/component'
import { Helmet } from 'react-helmet'
// const Layout = loadable(
//   () => import('../../components/dashboard/layout/layout')
// )
import Layout from '../../../components/dashboard/layout/layout'
const Settings = loadable(
  () => import('../../../components/dashboard/account/settings')
)
// import Settings from '../../components/account/settings'

interface Props {
  location: Location
}

const AccountSettings: React.FC<Props> = ({ location }: Props) => {
  return (
    <Layout location={location}>
      <Helmet title="Otoco - Account - Settings" defer={false} />
      <Settings></Settings>
    </Layout>
  )
}

export default AccountSettings
