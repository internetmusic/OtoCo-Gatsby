import React from 'react'
import Layout from '../components/layout/layout'
import Admin from '../components/admin/admin'
import Dashboard from '../components/dashboard/dashboard'

interface Props {
  location: Location
}

const DashboardIndex: React.FC<Props> = ({ location }: Props) => {
  return (
    <Layout location={location}>
      <div className="container-sm limiter-md content">
        <h1>Admin Tool</h1>
        <h5 className="mb-4">Change taxes and token used.</h5>
        <Admin></Admin>
      </div>
    </Layout>
  )
}

export default DashboardIndex
