import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../../components/dashboard/layout/layout'
import Messages from '../../components/account/messages'

interface Props {
  location: Location
}

const AccountMessages: React.FC<Props> = ({ location }: Props) => {
  return (
    <Layout location={location}>
      <Helmet title="Otoco - Account - Messages" defer={false} />
      <Messages></Messages>
    </Layout>
  )
}

export default AccountMessages
