import { ApolloServer, gql } from 'apollo-server-lambda';
import uuidv4  from 'uuid/v4';
import { updateItem, getItem, scanItems } from './dynamoDb';

const typeDefs = gql`
  type Query {
    widget(widgetId: String!): Widget
    allWidgets: [Widget]
  }

  type Widget {
    widgetId: String!
    name: String!
    thumbsUp: Int
    thumbsDown: Int
  }

  type Mutation {
    saveWidget(name: String!, widgetId: String): Widget
  }
`;

const resolvers = {
  Query: {
    widget: async  (_: any, { widgetId }: { widgetId: string }) => {
      const result = await getItem(
        { Key: { widgetId } })
      ;

      if (!result.Item) {
        return {}
      }

      return(
        {
          ...result.Item,
          name: result.Item.widgetName
        }
      )
    },
    allWidgets: async () => {
      const result = await scanItems({})

      if (!result.Items) {
        return [];
      }

      return result.Items.map((widget) => ({
          ...widget,
          name: widget.widgetName
        })
      );
    }
  },

  Mutation: {
    saveWidget: async (
      _: any,
      { name, widgetId  }: { name: string, widgetId?: string}
    ) => {
      if (!widgetId) {
        widgetId = uuidv4();
      }

      await updateItem({
          Key: { widgetId },
          UpdateExpression:
            "SET widgetName = :name, thumbsUp = :thumbsUp, thumbsDown = :thumbsDown",
          ExpressionAttributeValues: {
            ":name": name,
            ":thumbsUp": 0,
            ":thumbsDown": 0,
          }
      });

      return {
        widgetId,
        name,
        thumbsUp: 0,
        thumbsDown: 0
      };
    }
  }
};

export const server = new ApolloServer({
  typeDefs,
  resolvers
});

export const handler = server.createHandler();
