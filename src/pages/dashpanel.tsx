import React from 'react'
import { withPrefix } from 'gatsby'
import { Helmet } from 'react-helmet'
import { Router } from '@reach/router'
import Layout from '../components/dashboard/layout/layout'
import Dashboard from '../components/dashboard/dashboard'

interface Props {
  location: Location
}

const DashpanelIndex: React.FC<Props> = ({ location }: Props) => {
  return (
    <Layout location={location}>
      <Helmet title="Otoco - Dashpanel" defer={false} />
      {/* <Router> */}
      <Dashboard></Dashboard>
      {/* </Router> */}
    </Layout>
  )
}

export default DashpanelIndex
