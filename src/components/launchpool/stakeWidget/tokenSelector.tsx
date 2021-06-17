import React, { Dispatch, FC, useState } from 'react'
import { TokensInterface } from '../index'
import './style.scss'

interface Props {
  tokens: TokensInterface[]
  handleSelect: (t: TokensInterface) => void
}

const TokenSelector: FC<Props> = ({ tokens, handleSelect }: Props) => {
  const [selectedSymbol, setSelectedSymbol] = useState<string>('')

  React.useEffect(() => {
    setSelectedSymbol(tokens[0].symbol)
    handleSelect(tokens[0])
  }, [])

  const handleSelectClick = (t: TokensInterface) => {
    setSelectedSymbol(t.symbol)
    handleSelect(t)
  }

  const listTokens = tokens.map((t, idx) => (
    <li key={t.address}>
      <a
        className="dropdown-item"
        onClick={handleSelectClick.bind(undefined, t)}
      >
        {t.symbol}
      </a>
    </li>
  ))

  return (
    <div className="dropdown d-flex">
      <button
        className="btn btn-primary-outline dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selectedSymbol}
      </button>
      <ul className="dropdown-menu">{listTokens}</ul>
    </div>
  )
}

export default TokenSelector
