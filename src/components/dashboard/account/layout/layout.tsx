import React, { useEffect } from 'react'
import Footer from '../../../footer/footer'
// const AccountWidget from '../../accountWidget/accountWidget'
import loadable from '@loadable/component'
const AccountWidget = loadable(
  () => import('../../../accountWidget/accountWidget')
)

import '../dashboard/layout/style.scss'
import Logo from '../../../logo/logo'

interface Props {
  children?: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }: Props) => {
  return (
    <div className="wrapper">
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
