/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: "empty",
    },
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise(async resolve => {
    const result = await graphql(`
      query {
        widgetsApi {
          allWidgets {
            widgetId
          }
        }
      }
    `)

    result.data.widgetsApi.allWidgets.forEach(({ widgetId }) => {
      createPage({
        path: `/${widgetId}/thumbsUp`,
        component: path.resolve('src/pages/vote.js'),
        context: {
          widgetId,
          voteType: 'thumbsUp'
        },
      })
      createPage({
        path: `/${widgetId}/thumbsDown`,
        component: path.resolve('src/pages/vote.js'),
        context: {
          widgetId,
          voteType: 'thumbsDown'
        },
      })
    })

    resolve()
  })
}
