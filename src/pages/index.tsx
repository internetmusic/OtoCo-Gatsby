import React from 'react'

import Header from '../components/landing/header'
import Features from '../components/landing/features'
import Footer from '../components/footer/footer'

interface Props {
  location: Location
}

const Index: React.FC<Props> = ({ location }: Props) => {
  return (
    <div className="features-bg">
      <div className="padded container">
        <Header></Header>
        <Features></Features>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Index
