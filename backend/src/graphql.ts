// import { ApolloServer, gql } from 'apollo-server-lambda';
import { ApolloServer, gql } from 'apollo-server';
import AWS from 'aws-sdk';
import uuidv4  from 'uuid/v4';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Widget {
    widgetId: String!
    name: String!
    thumbsUp: Int
    thumbsDown: Int
  }

  type Mutation {
    saveWidget(name: String!): Widget
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!"
  },

  Mutation: {
    saveWidget: async (_: any, { name }: { name: string}) => {
      const widgetId = uuidv4();

      const result = await new Promise((resolve, reject) => {
        dynamoDB.update({
          TableName: process.env.DYNAMODB_TABLE!,
          Key: { widgetId },
          UpdateExpression: "SET widgetId = :widgetId, name = :name",
          ExpressionAttributeValues: {
            ":widgetId": widgetId,
            ":name": name
          }
        });
      });

      console.log(result);

      return {
        name,
        WidgetId: 'querty',
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

// export const handler = server.createHandler();
