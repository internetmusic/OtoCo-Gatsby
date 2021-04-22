import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout/layout'

interface Props {
  location: Location
}

const Terms: React.FC<Props> = ({ location }: Props) => {
  return (
    <Layout>
      <Helmet title="Otoco - Terms of Use" defer={false} />
      <div className="container-sm limiter-md">
        <p className="lh-50 mb-13">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus itaque fuga laboriosam maiores esse! Quo earum eveniet
          voluptas error perspiciatis natus unde nesciunt ducimus doloremque
          tempora mollitia, architecto nostrum eaque.
        </p>
        <p className="lh-50">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus itaque fuga laboriosam maiores esse! Quo earum eveniet
          voluptas error perspiciatis natus unde nesciunt ducimus doloremque
          tempora mollitia, architecto nostrum eaque.
        </p>
      </div>
    </Layout>
  )
}

export default Terms
