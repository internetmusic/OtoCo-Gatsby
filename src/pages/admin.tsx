import loadable from '@loadable/component'
import React from 'react'
import { Helmet } from 'react-helmet'
const Layout = loadable(() => import('../components/layout/layout'))
// import Layout from '../components/layout/layout'
const Admin = loadable(() => import('../components/admin'))
// import Admin from '../components/admin'

interface Props {
  location: Location
}

const DashboardIndex: React.FC<Props> = ({ location }: Props) => {
  return (
    <Layout location={location}>
      <Helmet title="Otoco - Administration" defer={false} />
      <div className="container-sm limiter-md content">
        <h1>Admin Section</h1>
        <Admin></Admin>
      </div>
    </Layout>
  )
}

export default DashboardIndex
