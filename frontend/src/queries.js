import gql from 'graphql-tag'

export const SAVE_WIDGET_QUERY = gql`
  mutation saveWidget($name: String!, $widgetId: String) {
    saveWidget(name: $name, widgetId: $widgetId) {
      widgetId
      name
      thumbsDown
      thumbsUp
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