import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout/layout'
import Icon from '../components/icon/icon'
import SpinUp from '../components/spinUp/spinUp'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

interface Props {
  location: Location
}

const BlogIndex: React.FC<Props> = ({ location }: Props) => {
  return (
    <Layout location={location}>
      <div className="container-xl content">
        <h1>Welcome to OtoCo</h1>
        <h3 className="mb-4">Instantly spin up your real-world LLC here.</h3>
        <div
          className="card w-100 text-white bg-background mb-4"
          style={{ border: '1px solid white', padding: '8px' }}
        >
          <div className="row no-gutters">
            <div className="col-4 col-sm-2 column-centered">
              <Icon icon={faExclamationTriangle} size="9x" />
            </div>
            <div className="col-8 col-sm-10">
              <h6 className="card-title">Before you start</h6>
              <small className="card-text">
                OtoCo is live on the Ethereum Mainnet. Please use a Web3
                compatible browser like Opera, or a Web3 extension like
                MetaMask. Activating a company using OtoCo will create a valid
                legal entity. PLEASE READ OUR{' '}
                <Link to="/terms">TERMS OF USE</Link>.
              </small>
            </div>
          </div>
        </div>
        <SpinUp></SpinUp>
      </div>
    </Layout>
  )
}

export default BlogIndex
