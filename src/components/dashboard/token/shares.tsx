import React, { Dispatch, FC, useState } from 'react'
import Web3 from 'web3'
import BN from 'bn.js'
import { navigate } from '@reach/router'
import { connect } from 'react-redux'
import UTCDate from '../../utcDate/utcDate'
import AddressWidget from '../../addressWidget/addressWidget'
import TokenContract from '../../../smart-contracts/OtocoToken'
import {
  SeriesType,
  TokenOwner,
  TokenConfig,
  TokenDeployed,
} from '../../../state/management/types'
import { IState } from '../../../state/types'

interface ListOwnerProps {
  owners: TokenOwner[]
  totalShares?: number
}

const ListOwners = ({ owners, totalShares }: ListOwnerProps) => {
  return owners.map((m, idx) => (
    <tr key={idx}>
      <td>
        <AddressWidget address={m.address}></AddressWidget>
      </td>
      <td>{m.balance}</td>
      <td className="d-none d-md-block">
        <div className="progress">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${(m.balance / totalShares) * 100}%` }}
            aria-valuenow={(m.balance / totalShares) * 100}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {(m.balance / totalShares) * 100}%
          </div>
        </div>
      </td>
    </tr>
  ))
}

interface Props {
  account?: string | null
  network?: string | null
  managing?: SeriesType
  tokenConfig?: TokenConfig
  tokenDeployed?: TokenDeployed
}

const Shares: FC<Props> = ({
  account,
  network,
  tokenConfig,
  tokenDeployed,
}: Props) => {
  const [owners, setOwners] = useState<TokenOwner[]>([])
  const getBNDecimals = (decimals: number) => {
    return new BN(10).pow(new BN(decimals))
  }

  React.useEffect(() => {
    setTimeout(async () => {
      if (!tokenDeployed || !tokenConfig) return
      const owns = new Set<string>()
      const decimals = await TokenContract.getContract(tokenDeployed.contract)
        .methods.decimals()
        .call({ from: account })
      // Add first owner
      const events = await TokenContract.getContract(
        tokenDeployed.contract
      ).getPastEvents('Initialized', { fromBlock: 0, toBlock: 'latest' })
      for (const o of events) {
        owns.add(o.returnValues.member)
      }
      // Add all receivers
      const transferEvent = await TokenContract.getContract(
        tokenDeployed.contract
      ).getPastEvents('Transfer', { fromBlock: 0, toBlock: 'latest' })
      for (const o of transferEvent) {
        owns.add(o.returnValues.to)
      }
      const result: TokenOwner[] = []
      for (const o of [...owns]) {
        const balance = await TokenContract.getContract(tokenDeployed.contract)
          .methods.balanceOf(o)
          .call({ from: account })
        const balanceBN = new BN(balance)
        const owner = {
          address: o,
          balance: balanceBN.div(getBNDecimals(decimals)).toNumber(),
        }
        result.push(owner)
      }
      console.log(result)
      setOwners(result)
    }, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenDeployed?.contract])

  const clickCopyHandler = (info) => {
    let link = ''
    if (network === 'ropsten') link = 'https://ropsten.etherscan.io/address/'
    if (network === 'kovan') link = 'https://kovan.etherscan.io/address/'
    if (network === 'main') link = 'https://etherscan.io/address/'
    link += info
    window.open(link, '_blank')
  }

  const clickTransferHandler = async () => {
    navigate(`/tokens/${tokenDeployed?.contract}`)
  }

  return (
    <div>
      <div className="small">
        A total of{' '}
        <b>
          {tokenConfig?.shares} {tokenConfig?.name}
        </b>{' '}
        with symbol <b>{tokenConfig?.symbol}</b> were minted on{' '}
        <UTCDate separator="at" date={tokenDeployed?.creation}></UTCDate>.
      </div>
      <p className="small">
        {tokenConfig?.symbol} token address:
        <AddressWidget address={tokenDeployed?.contract}></AddressWidget>
      </p>
      <div className="small">List of current holders:</div>
      <table className="table small table-hover">
        <thead>
          <tr>
            <th scope="col">Wallet</th>
            <th scope="col">Balance</th>
            <th scope="col" className="d-none d-md-block"></th>
          </tr>
        </thead>
        <tbody>
          <ListOwners
            owners={owners}
            totalShares={tokenConfig?.shares}
          ></ListOwners>
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={clickTransferHandler}>
        Transfer Tokens
      </button>
    </div>
  )
}

export default connect((state: IState) => ({
  account: state.account.account,
  network: state.account.network,
  managing: state.management.managing,
  tokenConfig: state.management.tokenConfig,
  tokenDeployed: state.management.tokenDeployed,
}))(Shares)
