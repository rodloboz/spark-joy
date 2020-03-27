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
            name
            followUpQuestions
          }
        }
      }
    `)

    result.data.widgetsApi.allWidgets.forEach(({ widgetId, name, followUpQuestions }) => {
      const votePath = path.resolve('src/pages/vote.js')
      const widgetPath = path.resolve('src/pages/widget.js')

      followUpQuestions = JSON.parse(followUpQuestions).sort((a, b) => a.id - b.id)

      createPage({
        path: `/${widgetId}/thumbsUp`,
        component: votePath,
        context: {
          widgetId,
          followUpQuestions,
          voteType: 'thumbsUp'
        },
      })
      createPage({
        path: `/${widgetId}/thumbsDown`,
        component: votePath,
        context: {
          widgetId,
          followUpQuestions,
          voteType: 'thumbsDown'
        },
      })
      createPage({
        path: widgetId,
        component: widgetPath,
        context: {
          widgetId,
          name
        },
      })
    })

    resolve()
  })
}
