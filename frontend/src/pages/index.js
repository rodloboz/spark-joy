import React from 'react'
import { CentralColumn } from '../components/styles';

import Layout from '../components/layout'
import SEO from '../components/seo'

import WidgetBuilder from '../components/WidgetBuilder'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <CentralColumn style={{ "padding-top": "2em" }}>
      <p>Did your thing spark joy? Ask the fans and get some feeback :)</p>
      <p>Fill out the widget, export to HTML, insert anywhere. 👇</p>
      <WidgetBuilder />
    </CentralColumn>
  </Layout>
)

export default IndexPage
