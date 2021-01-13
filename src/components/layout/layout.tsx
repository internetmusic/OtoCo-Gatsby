import React, { useEffect } from 'react'
// import emergence from 'emergence.js'

import Footer from '../footer/footer'
import Logo from '../logo/logo'
import AccountWidget from '../accountWidget/accountWidget'

// import 'modern-normalize/modern-normalize.css'
// import 'prismjs/themes/prism.css'
// import 'scss/otoco.scss'
// import 'animate.css/animate.css'
// import 'font-awesome/css/font-awesome.css'

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
