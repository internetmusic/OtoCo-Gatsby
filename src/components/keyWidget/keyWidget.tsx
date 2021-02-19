import React, { FC } from 'react'
import { Clipboard } from 'react-bootstrap-icons'

interface Props {
  publickey: string
}

const KeyWidget: FC<Props> = ({ publickey }: Props) => {
  const clickCopyHandler = (info: string) => {
    navigator.clipboard.writeText(info)
  }

  return (
    <span style={{ display: 'inline-block' }}>
      {publickey && (
        <span className="primary font-monospace">
          {publickey.substring(0, 12)}...
          {publickey.substring(publickey.length - 5, publickey.length)}
        </span>
      )}
      &nbsp;
      <a href="#" onClick={clickCopyHandler.bind(undefined, publickey)}>
        <Clipboard
          style={{ marginLeft: '0.25em' }}
          className="fix-icon-alignment"
        />
      </a>
    </span>
  )
}

export default KeyWidget
