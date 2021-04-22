import React, { useEffect } from 'react'
// import emergence from 'emergence.js'
import Footer from '../footer/footer'
import Logo from '../logo/logo'
// import AccountWidget from '../accountWidget/accountWidget'
import loadable from '@loadable/component'
const AccountWidget = loadable(() => import('../accountWidget/accountWidget'))

interface Props {
  children?: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }: Props) => {
  return (
    <div>
      <div className="padded">
        <Logo />
        <AccountWidget />
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
