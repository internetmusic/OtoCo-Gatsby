import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout/layout'
import Icon from '../components/icon/icon'
import SpinUp from '../components/spinUp/spinUp'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

interface Props {
  location: Location
}

const SpinUpPage: React.FC<Props> = ({ location }: Props) => {
  return (
    <Layout location={location}>
      <div className="container-sm limiter-md">
        <SpinUp></SpinUp>
      </div>
    </Layout>
  )
}

export default SpinUpPage
