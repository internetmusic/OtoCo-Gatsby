import React, { useState } from 'react'
import Web3 from 'web3'
import { navigate } from '@reach/router'
import bigIcon from '../../../static/img/big-icon.svg'
import './style.scss'

import MainContract from '../../smart-contracts/MainContract'

const Features: React.FC<unknown> = () => {
  const [counter, setCounter] = useState<number>(100)

  const handleClickSpinUp = () => {
    navigate(`/spinup/`)
  }

  React.useEffect(() => {
    setTimeout(async () => {
      const ws_provider =
        'wss://mainnet.infura.io/ws/v3/f2e6a40391274a0793c63e923de0a170'
      const web3 = new Web3(new Web3.providers.WebsocketProvider(ws_provider))
      const contractDelaware = new web3.eth.Contract(
        MainContract.abi,
        MainContract.addresses['main_us_de']
      )
      const contractWyoming = new web3.eth.Contract(
        MainContract.abi,
        MainContract.addresses['main_us_wy']
      )
      const delawareCount = await contractDelaware.getPastEvents(
        'NewSeriesCreated',
        { fromBlock: 0, toBlock: 'latest' }
      )
      const wyomingCount = await contractWyoming.getPastEvents(
        'NewSeriesCreated',
        { fromBlock: 0, toBlock: 'latest' }
      )
      setCounter(delawareCount.length + wyomingCount.length)
    }, 0)
  }, [])

  return (
    <div>
      <div className="content feature-background">
        <div className="row">
          <div className="col-12 my-5">
            <h5 className="feature-title">
              Real-world Company Formation using your Digital Wallet
            </h5>
          </div>
          <div className="col-12 col-lg-4 d-flex justify-content-center">
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
          <div className="col-12 col-lg-4 d-flex justify-content-center">
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
          <div className="col-12 col-lg-4 d-flex justify-content-center">
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
              <div className="counter">
                <div>
                  <h5 className="counter-title">COUNTER</h5>
                  <div className="styled-counter">{counter}</div>
                </div>
                <div className="lead">
                  on-chain LLCs created as of today on OtoCo
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features
