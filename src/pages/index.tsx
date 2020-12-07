import React from 'react'

import Header from '../components/index/header'
import Features from '../components/index/features'
import Footer from '../components/footer/footer'

interface Props {
  location: Location
}

const Index: React.FC<Props> = ({ location }: Props) => {
  return (
    <div>
      <div className="padded">
        <Header></Header>
        <Features></Features>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Index
