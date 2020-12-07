import React from 'react'

import { navigate } from '@reach/router'
import bigIcon from '../../../static/img/big-icon.svg'
import './style.scss'

const Features: React.FC<unknown> = () => {
  const handleClickSpinUp = () => {
    navigate(`/spinup/`)
  }

  return (
    <div>
      <div className="content feature-background">
        <div className="row">
          <div className="col-12 col-md-4 d-flex justify-content-center">
            <div className="align-self-top text-center">
              <img
                className="feature-icon"
                src={bigIcon}
                alt="Big Feature Icon"
              />
              <div className="feature-text">
                <div>
                  <h4>Onchain entity formation</h4>
                </div>
                <div>
                  Simply use your Ethereum wallet to spin up a Delaware or
                  Wyoming LLC by sending 39 DAI to the OtoCo company assembly
                  smart contract. Activation is instant without loss of legal
                  validity.
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 d-flex justify-content-center">
            <div className="align-self-top text-center">
              <img
                className="feature-icon"
                src={bigIcon}
                alt="Big Feature Icon"
              />
              <div className="feature-text">
                <div>
                  <h4>No-code token generation</h4>
                </div>
                <div>
                  Immediately use your new entity to issue security or utility
                  tokens. Distribute them to raise capital, reward token holders
                  and decentralize governance.
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 d-flex justify-content-center">
            <div className="align-self-top text-center">
              <img
                className="feature-icon"
                src={bigIcon}
                alt="Big Feature Icon"
              />
              <div className="feature-text">
                <div>
                  <h4>Add the components you need</h4>
                </div>
                <div>
                  SOON! Shop around our dAppstore to pick up additional parts
                  made by a growing number of outside developers. Bolt them on
                  to your entity in one click.
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 d-flex counter-spacing justify-content-center">
            <div className="align-self-top text-center">
              <div className="">
                <div>
                  <h5>COUNTER</h5>
                  <div className="styled-counter">156</div>
                </div>
                <div>on-chain LLCs created as of today on OtoCo</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features
