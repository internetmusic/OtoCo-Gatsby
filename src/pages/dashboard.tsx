import React from 'react'

import Layout from '../components/layout/layout'

interface Props {
  location: Location
}

const Dashboard: React.FC<Props> = ({ location }: Props) => {
  const [val, toggle] = React.useState(false)

  const handleClickTest = () => {
    toggle(!val)
  }

  return (
    <Layout location={location}>
      {val && <p>LIGADO</p>}
      <h4>Dashboard</h4>
      <p>Manage your on-chain companies</p>
      <button onClick={handleClickTest}>TESTE</button>
    </Layout>
  )
}

export default Dashboard
