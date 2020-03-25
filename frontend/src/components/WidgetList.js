import React from 'react'
import { useStaticQuery, graphql, Link } from "gatsby"

const WidgetList = () => {
  const { widgetsApi } = useStaticQuery(
    graphql`
      query {
        widgetsApi {
          allWidgets {
            widgetId
            name
          }
        }
      }
    `
  )

  return (
    <ul>
      { widgetsApi.allWidgets.map(widget => (
        <li key={widget.widgetId}>
          <Link to={widget.widgetId}>{widget.name}</Link>
        </li>
      ))}
    </ul>
  )
}

export default WidgetList;