import React from 'react'
import loadable from '@loadable/component'
import { withPrefix } from 'gatsby'
import { Helmet } from 'react-helmet'
import { Router } from '@reach/router'
const Layout = loadable(() => import('../components/dashboard/layout/layout'))
// import Layout from '../components/dashboard/layout/layout'
const Overview = loadable(() => import('../components/account/overview'))
// import Overview from '../components/account/overview'

interface Props {
  location: Location
}

const DashpanelIndex: React.FC<Props> = ({ location }: Props) => {
  return (
    <Layout location={location}>
      <Helmet title="Otoco - Account" defer={false} />
      {/* <Router> */}
      <Overview></Overview>
      {/* </Router> */}
    </Layout>
  )
}

export default DashpanelIndex
