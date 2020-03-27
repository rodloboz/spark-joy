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
    followUpQuestions: String
  }

  type Mutation {
    saveWidget(
      name: String!
      widgetId: String
      followUpQuestions: String
    ): Widget
    widgetVote(
      widgetId: String!
      thumbsDown: Boolean
      thumbsUp: Boolean
    ): Widget
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
      { 
        name,
        widgetId,
        followUpQuestions
      }: { name: string, widgetId?: string, followUpQuestions?: string }
    ) => {
      if (!widgetId) {
        widgetId = uuidv4();
      }

      const { Attributes } = await updateItem({
          Key: { widgetId },
          UpdateExpression:
            "SET widgetName = :name, thumbsUp = :thumbsUp, thumbsDown = :thumbsDown, followUpQuestions = :followUpQuestions",
          ExpressionAttributeValues: {
            ":name": name,
            ":thumbsUp": 0,
            ":thumbsDown": 0,
            ":followUpQuestions": followUpQuestions
          },
          ReturnValues: 'ALL_NEW'
      });

      if (Attributes) {
        return (
          {
            ...Attributes,
            name: Attributes.widgetName
          }
        );
      }

      return {};
    },
    widgetVote: async (
      _: any,
      {
        widgetId,
        thumbsUp = false,
        thumbsDown = false
      }: { widgetId: string, thumbsUp?: boolean, thumbsDown?: boolean }
    ) => {
      const { Attributes } = await updateItem({
        Key: { widgetId },
        UpdateExpression:
          "SET thumbsUp = thumbsUp + :thumbsUp, thumbsDown = thumbsDown + :thumbsDown",
        ExpressionAttributeValues: {
          ":thumbsUp": thumbsUp ? 1 : 0,
          ":thumbsDown": thumbsDown ? 1 : 0
        },
        ReturnValues: 'ALL_NEW'
      });

      if (Attributes) {
        return (
          {
            ...Attributes,
            name: Attributes.widgetName
          }
        );
      }

      return {};
    }
  }
};

export const server = new ApolloServer({
  typeDefs,
  resolvers
});

export const handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true
  }
});
