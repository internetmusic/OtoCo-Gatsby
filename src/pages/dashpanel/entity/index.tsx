import React from 'react'
import loadable from '@loadable/component'
import { withPrefix } from 'gatsby'
import { Helmet } from 'react-helmet'
import { Router } from '@reach/router'
// const Layout = loadable(() => import('../components/dashboard/layout/layout'))
import Layout from '../../../components/dashboard/layout/layout'
const Company = loadable(() => import('../../../components/dashboard/entity'))
// import Company from '../components/dashboard'

interface Props {
  location: Location
}

const CompanyIndex: React.FC<Props> = ({ location }: Props) => {
  return (
    <Layout location={location}>
      <Helmet title="Otoco - Entity" defer={false} />
      <Router>
        <Company path="/dashpanel/entity/:id" />
      </Router>
    </Layout>
  )
}

export default CompanyIndex
