import React from 'react'
import { Link } from 'gatsby'

import { Helmet } from 'react-helmet'
// import loadable from '@loadable/component'
// const Layout = loadable(() => import('../components/layout/layout'))
import Layout from '../components/layout/layout'
import SpinUp from '../components/spinUp/spinUp'

interface Props {
  location: Location
}

const SpinUpPage: React.FC<Props> = ({ location }: Props) => {
  return (
    <Layout location={location}>
      <Helmet title="Otoco - Spin-up Company" defer={false} />
      <div className="container-sm limiter-md">
        <SpinUp></SpinUp>
      </div>
    </Layout>
  )
}

export default SpinUpPage
