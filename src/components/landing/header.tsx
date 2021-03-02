import React from 'react'
import { Link } from 'gatsby'
import { navigate } from '@reach/router'
import Logo from '../logo/logo'
import HeaderIllustration from '../../../static/img/header-illustration.png'
import HeaderAnimationWebm from '../../../static/video/header-animation.webm'
import './style.scss'

const Header: React.FC<unknown> = () => {
  const handleClickSpinUp = () => {
    navigate(`/spinup/`)
  }

  return (
    <div>
      <Logo></Logo>
      <div className="quick-links">
        <Link className="styled-link" to="/dashpanel/">
          Dashpanel
        </Link>
      </div>
      <div className="content">
        <div className="row">
          <div className="col-12 d-lg-none d-flex justify-content-center">
            <div className="align-self-center text-center">
              <h5>OTONOMOS PRESENTS</h5>
              <h1 className="display-6">
                Automated Company Assembly on Blockchain
              </h1>
            </div>
          </div>
          <div className="col-5 d-none d-lg-flex justify-content-center">
            <div className="align-self-center">
              <h5>OTONOMOS PRESENTS</h5>
              <h1 className="mt-2 display-5">
                Automated Company Assembly on Blockchain
              </h1>
              <button
                className="btn styled-button mt-4 mb-4"
                onClick={handleClickSpinUp}
              >
                Spin up your company now →
              </button>
            </div>
          </div>
          <div className="col-12 col-lg-7 py-4 justify-content-center">
            <video
              width={'100%'}
              muted
              autoPlay
              loop
              preload={'auto'}
              poster={HeaderIllustration}
            >
              <source src={HeaderAnimationWebm} type={'video/webm'} />
            </video>
          </div>
          <div className="col-12 d-lg-none d-flex justify-content-center">
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
