import ApolloClient from 'apollo-boost'
import fetch from 'isomorphic-fetch'

// import { SERVER_URI } from '../config'

const SERVER_URI = 'https://xi60eh3ma7.execute-api.us-east-1.amazonaws.com/dev/graphql'

export const client = new ApolloClient({
  uri: SERVER_URI,
  fetch,
})