import gql from 'graphql-tag'

export const SAVE_WIDGET_QUERY = gql`
  mutation saveWidget(
    $name: String!
    $widgetId: String
    $followUpQuestions: String
  ) {
    saveWidget(
      name: $name
      widgetId: $widgetId
      followUpQuestions: $followUpQuestions
    ) {
      widgetId
    }
  }
`
 
export const WIDGET_VOTE_QUERY = gql`
  mutation widgetVote(
    $widgetId: String!
    $thumbsUp: Boolean
    $thumbsDown: Boolean
  ) {
    widgetVote(
      widgetId: $widgetId
      thumbsUp: $thumbsUp
      thumbsDown: $thumbsDown
    ) {
      thumbsUp
      thumbsDown
    }
  }
`

export const WIDGET_QUERY = gql`
  query widget($widgetId: String!) {
    widget(widgetId: $widgetId) {
      name
      thumbsUp
      thumbsDown
    }
  }
`