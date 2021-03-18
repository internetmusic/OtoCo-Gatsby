import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../../components/dashboard/layout/layout'
import Settings from '../../components/account/settings'

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
