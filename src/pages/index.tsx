import React from 'react'

import Layout from '../components/layout/layout'

interface Props {
  location: Location
}

const BlogIndex: React.FC<Props> = ({ location }: Props) => {
  return (
    <Layout location={location}>
      <h4>Welcome to OtoCo</h4>
      <p>Instantly spin up your real-world LLC here.</p>
    </Layout>
  )
}

export default BlogIndex
