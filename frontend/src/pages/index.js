import React from 'react'
import { CentralColumn } from '../components/styles';

import Layout from '../components/layout'
import SEO from '../components/seo'

import WidgetBuilder from '../components/WidgetBuilder'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <CentralColumn>
      <p>Ask if it sparked joy.</p>
      <WidgetBuilder />
    </CentralColumn>
  </Layout>
)

export default IndexPage
