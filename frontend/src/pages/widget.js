import React, { useEffect, useReducer } from 'react'
import { useApolloClient } from 'react-apollo-hooks'
import { PacmanLoader } from 'react-spinners'
import { Card } from 'rebass'

import { CentralColumn, Heading } from '../components/styles'
import theme from '../components/theme'

import Layout from '../components/layout'
import SEO from '../components/seo'

import { WIDGET_QUERY } from '../queries'

async function getWidget({ widgetId, apolloClient }) {
  const result = await apolloClient.query({
    query: WIDGET_QUERY,
    variables: {
      widgetId: widgetId
    }
  })

  return result.data.widget
}

function useWidgetState({ widgetId, name }) {
  const apolloClient = useApolloClient()

  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'loading':
          return { ...state, loading: true }
        case 'loaded':
          return { ...state, loading: false, ...action.widget}
        default:
          return state
      }
    },
    { name, thumbsUp: 0, thumbDown: 0, loading: false }
  )

  useEffect(() => {
    dispatch({ type: 'loading' });

    (async () => {
      const widget = await getWidget({ 
        widgetId,
        apolloClient
      })

      dispatch({ type: 'loaded', widget })

    })()
  }, [])

  return state
}

const Votes = ({ thumbsUp, thumbsDown }) => (
  <>
    <Card
      fontSize={4}
      fontWeight="bold"
      width={[1, 1, 1 / 2]}
      p={3}
      my={3}
      bg="#f6f6ff"
      borderRadius={8}
      boxShadow="0 2px 16px rgba(0, 0, 0, 0.25"
    >
      <span role="img" aria-label="thumbs-up">👍</span>
      {thumbsUp}
    </Card>
    <Card
      fontSize={4}
      fontWeight="bold"
      width={[1, 1, 1 / 2]}
      p={3}
      my={3}
      bg="#f6f6ff"
      borderRadius={8}
      boxShadow="0 2px 16px rgba(0, 0, 0, 0.25"
    >
      <span role="img" aria-label="thumbs-down">👎</span>
      {thumbsDown}
    </Card>
  </>
)

const WidgetPage = ({ pageContext }) => {
  const { name, thumbsUp, thumbsDown, loading } = useWidgetState(pageContext)

  return (
    <Layout>
      <SEO title="Thank You" />
      <CentralColumn style={{ "paddingTop": "2em" }}>
        <Heading h2>Did {name} spark joy?</Heading>
        <PacmanLoader
          sizeUnit={"px"}
          size={50}
          color={theme.colors.primary}
          loading={loading}
        />
        {loading ? null : <Votes thumbsUp={thumbsUp} thumbsDown={thumbsDown} />}
      </CentralColumn>
    </Layout>
  )
}

export default WidgetPage
