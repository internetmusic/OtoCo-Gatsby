import React from 'react'
import UTCDate from '../utcDate/utcDate'

import { TokensInterface } from './index'

interface ListTokensProps {
  tokens: TokensInterface[]
  handleApprove: (index: number) => void
  handleStake: (index: number) => void
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const TokensList = ({
  tokens,
  handleApprove,
  handleStake,
}: ListTokensProps) => {
  return (
    <>
      {tokens.map((t: TokensInterface) => (
        <tr className="small" key={t.address}>
          <td className="col-4">{t.address.substring(0, 8)}...</td>
          <td className="col-4">{t.symbol}</td>
          <td className="col-4">{t.decimals} decimals</td>
        </tr>
      ))}
    </>
  )
}

export default TokensList
