import React, { useEffect } from 'react'
import emergence from 'emergence.js'

import Footer from '../footer/footer'

import 'modern-normalize/modern-normalize.css'
import 'prismjs/themes/prism.css'
import 'scss/otoco.scss'
import 'animate.css/animate.css'
import 'font-awesome/css/font-awesome.css'

interface Props {
  children?: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }: Props) => {
  useEffect(() => {
    emergence.init()
  })

  return (
    <div>
      {children}
      <Footer />
    </div>
  )
}

export default Layout
