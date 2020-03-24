import React from 'react'
import { useStaticQuery, graphql } from "gatsby"

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
        <li key={widget.widgetId}>{widget.name}</li>
      ))}
    </ul>
  )
}

export default WidgetList;