import React, { FC } from 'react'
import { Link } from 'gatsby'
import './style.scss'
import logo from '../../../public/img/logo.svg'

const Logo: FC = ({}) => {
  return (
    <div className="logo">
      <Link to="/">
        <img src={logo} alt="Otoco Logo" />
      </Link>
    </div>
  )
}

export default Logo
