import React from 'react'
import { Helmet } from 'react-helmet'
import { Router } from '@reach/router'
import Layout from '../../components/dashboard/layout/layout'
import Identity from '../../components/identity/Identity'

interface Props {
  location: Location
}

const IdentityIndex: React.FC<Props> = ({ location }: Props) => {
  return (
    <Layout location={location}>
      <Helmet title="Otoco - Identity" defer={false} />
      <Identity path="/identity" />
    </Layout>
  )
}

export default IdentityIndex
