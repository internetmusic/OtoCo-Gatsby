import React, { useEffect } from 'react'

import Footer from '../../footer/footer'
import Logo from '../../logo/logo'
import AccountWidget from '../../accountWidget/accountWidget'
import SidebarSeries from '../sidebarSeries/sidebarSeries'

import './style.scss'

interface Props {
  children?: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }: Props) => {
  return (
    <div className="wrapper">
      <SidebarSeries></SidebarSeries>
      <div className="padded-dashpanel">
        <AccountWidget />
        {children}
        <Footer />
      </div>
    </div>
  )
}

export default Layout
