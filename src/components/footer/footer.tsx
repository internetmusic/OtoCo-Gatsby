import { Link } from 'gatsby'
import React from 'react'
import './style.scss'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Footer = () => (
  <div className="footer container">
    <div className="row">
      <div className="col-12 col-md-6 d-flex text-left mt-4">
        ©️ 2021 Otonomos Blockchain Technologies Ltd.
      </div>
      <div className="col-12 col-md-6 d-flex justify-content-right mt-4">
        <div className="row footer-links">
          <div className="col-4 d-block">
            <div className="mb-1">
              <Link to="/terms/">Terms</Link>
            </div>
            <div className="mb-1">
              <Link to="/privacy/">Privacy</Link>
            </div>
          </div>
          <div className="col-4 d-block">
            <div className="mb-1">
              <Link to="https://t.me/TheRoadToOtoco" target="_blank">
                Telegram
              </Link>
            </div>
            <div className="mb-1">
              <Link to="https://twitter.com/otonomos" target="_blank">
                Twitter
              </Link>
            </div>
            <div className="mb-1">
              <Link to="https://github.com/otocorp" target="_blank">
                Github
              </Link>
            </div>
          </div>
          <div className="col-4 d-block">
            <div className="mb-1">
              <Link to="/spinup/">Spin up new Company</Link>
            </div>
            <div className="mb-1">
              <Link to="/dashboard/">Dashpanel</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Footer
