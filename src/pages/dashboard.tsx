import React from 'react'
import Layout from '../components/layout/layout'
import Dashboard from '../components/dashboard/dashboard'

interface Props {
  location: Location
}

const DashboardIndex: React.FC<Props> = ({ location }: Props) => {
  return (
    <Layout location={location}>
      <div className="container-xl content">
        <h1>Dashboard</h1>
        <h5 className="mb-4">Manage your on-chain companies.</h5>
        <Dashboard></Dashboard>
      </div>
    </Layout>
  )
}

export default DashboardIndex