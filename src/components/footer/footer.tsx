import { Link } from 'gatsby'
import React from 'react'
import './style.scss'

const Footer = () => (
  <div className="footer">
    <div className="container">
      <Link to="/terms/">Documentation and FAQs</Link>
      <br />
      ©️ 2020 Otonomos Blockchain Technologies Ltd.
    </div>
  </div>
)

export default Footer
