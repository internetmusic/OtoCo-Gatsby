import React from 'react'
import loadable from '@loadable/component'
import { withPrefix } from 'gatsby'
import { Helmet } from 'react-helmet'
import { Router } from '@reach/router'
// const Layout = loadable(() => import('../components/dashboard/layout/layout'))
import Layout from '../../../components/dashboard/layout/layout'
const LaunchPool = loadable(
  () => import('../../../components/dashboard/launchpool')
)
// import Company from '../components/dashboard'

interface Props {
  location: Location
}

const LaunchPoolIndex: React.FC<Props> = ({ location }: Props) => {
  return (
    <Layout location={location}>
      <Helmet title="Otoco - Launch Pool" defer={false} />
      <Router>
        <LaunchPool path="/dashpanel/launchpool/:id" />
      </Router>
    </Layout>
  )
}

export default LaunchPoolIndex
