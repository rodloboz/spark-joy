import React, { useEffect } from 'react'
import { useApolloClient } from 'react-apollo-hooks'
import { Form , Field } from 'react-final-form'
import { Button } from "rebass"

import { CentralColumn } from '../components/styles';

import Layout from '../components/layout'
import SEO from '../components/seo'

import { WIDGET_VOTE_QUERY } from '../queries'

async function saveVote({ widgetId, voteType, apolloClient }) {
  const result = await apolloClient.mutate({
    mutation: WIDGET_VOTE_QUERY,
    variables: {
      widgetId: widgetId,
      thumbsUp: voteType === 'thumbsUp',
      thumbsDown: voteType === 'thumbsDown'
    }
  })

  console.log(result)
}

function renderField( { id, label, type }) {
  return (
    <div>
      <label>{label}</label><br />
      <Field
        name={`field_${id}`}
        component="input"
        type="text"
        placeholder="Listen to your gut :)" 
      />
    </div>
  )
}

function onSubmit() {
  console.log('Hi!')
}

const VotePage = ({ pageContext }) => {
  const apolloClient = useApolloClient()
  const { widgetId, voteType, followUpQuestions } = pageContext

  useEffect(() => {
    saveVote({ widgetId, voteType, apolloClient })
  }, [])

  return (
    <Layout>
      <SEO title="Thank You" />
      <CentralColumn style={{ "paddingTop": "2em" }}>
        <Form
          onSubmit={onSubmit}
          initialValues=""
          render={({ handleSubmit }) => <form onSubmit={handleSubmit}>
            {followUpQuestions.map(renderField)}
            <Button type="submit">Give feedback <span role="img" aria-label="rock-on">🤟</span></Button>
          </form>}
        />
        <p>Thank you, you are the best! <span role="img" aria-label="thank-you">🙏</span></p>
      </CentralColumn>
    </Layout>
  )
}

export default VotePage
