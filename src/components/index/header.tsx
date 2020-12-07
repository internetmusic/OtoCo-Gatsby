import React from 'react'
import { Link } from 'gatsby'
import { navigate } from '@reach/router'
import Logo from '../logo/logo'
import assembly from '../../../static/img/image1.png'
import './style.scss'

const Header: React.FC<unknown> = () => {
  const handleClickSpinUp = () => {
    navigate(`/spinup/`)
  }

  return (
    <div>
      <Logo></Logo>
      <div className="quick-links">
        <Link className="styled-link" to="/spinup/">
          Spin up company
        </Link>
        <Link className="styled-link" to="/dashpanel/">
          Dashpanel
        </Link>
      </div>
      <div className="content">
        <div className="row">
          <div className="col-12 d-md-none d-flex">
            <div className="align-self-center text-center">
              <h5>OTONOMOS PRESENTS</h5>
              <h2>Automated Company Assembly on Blockchain</h2>
            </div>
          </div>
          <div className="col-4 d-none d-md-flex justify-content-left">
            <div className="align-self-center">
              <h5>OTONOMOS PRESENTS</h5>
              <h2 className="mt-2">Automated Company Assembly on Blockchain</h2>
              <button
                className="btn styled-button mt-4"
                onClick={handleClickSpinUp}
              >
                Spin up your company now →
              </button>
            </div>
          </div>
          <div className="col-12 col-md-8 justify-content-center">
            <img src={assembly} alt="Assembly line" />
          </div>
          <div className="col-12 d-md-none d-flex justify-content-center">
            <div className="align-self-center">
              <button className="btn styled-button" onClick={handleClickSpinUp}>
                Spin up your company now →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
