import React from 'react'
import Layout from '../components/layout/layout'
import Dashboard from '../components/dashboard/dashboard'

interface Props {
  location: Location
}

const DashboardIndex: React.FC<Props> = ({ location }: Props) => {
  return (
    <Layout location={location}>
      <div className="container-md limiter-md mt-5">
        <h1 className="display-5 fw-light">Dashpanel</h1>
        <h5 className="mb-3 text-uppercase">Manage your on-chain companies</h5>
        <Dashboard></Dashboard>
      </div>
    </Layout>
  )
}

export default DashboardIndex