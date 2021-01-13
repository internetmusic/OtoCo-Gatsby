import React from 'react'

import { Helmet } from 'react-helmet'
import Header from '../components/landing/header'
import Features from '../components/landing/features'
import Footer from '../components/footer/footer'

interface Props {
  location: Location
}

const Index: React.FC<Props> = ({ location }: Props) => {
  React.useEffect(() => {
    console.log('Current critical updates: 13/01/2020 12:00')
  }, [])

  return (
    <div className="features-bg">
      <Helmet
        title="Otoco - Automated Company Assembly on Blockchain"
        defer={false}
      />
      <div className="padded container">
        <Header></Header>
        <Features></Features>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Index
