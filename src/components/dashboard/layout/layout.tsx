import React, { useEffect } from 'react'

import Footer from '../../footer/footer'
import Logo from '../../logo/logo'
import AccountWidget from '../../accountWidget/accountWidget'
import Sidebar from '../sidebar/index'

import './style.scss'

interface Props {
  children?: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }: Props) => {
  return (
    <div className="wrapper">
      <Sidebar></Sidebar>
      <div className="dashpanel">
        <div className="dashpanel-content">
          <AccountWidget />
          {children}
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
