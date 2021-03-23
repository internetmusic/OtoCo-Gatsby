import React from 'react'
import { Router } from '@reach/router'
import { Helmet } from 'react-helmet'
import Token from '../components/token/token'
import loadable from '@loadable/component'
const Layout = loadable(() => import('../components/dashboard/layout/layout'))
// import Layout from '../components/dashboard/layout/layout'

interface Props {
  location: Location
}

const TokenIndex: React.FC<Props> = ({ location }: Props) => {
  return (
    <Layout location={location}>
      <Helmet title="Otoco - Token Transfer Tool" defer={false} />
      <Router>
        <Token path="/token/:id" />
      </Router>
    </Layout>
  )
}

export default TokenIndex
