import React from 'react'
import { CentralColumn } from '../components/styles';

import Layout from '../components/layout'
import SEO from '../components/seo'

const VotePage = ({ voteType }) => (
  <Layout>
    <SEO title="Thank You" />
    <CentralColumn style={{ "paddingTop": "2em" }}>
      <p>Thank you, you are the best! <span role="img" aria-label="thank-you">🙏</span></p>
    </CentralColumn>
  </Layout>
)

export default VotePage
