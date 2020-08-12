const { gql } = require("apollo-server-express");
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  # ID field is declared as non-nullable.

  type Message {
    id: ID!
    name: String!
    channelId: ID!
  }

  type Post {
    author: String
    comment: String
  }

  type Result {
    id: String
  }

  type User {
    id: ID!
    name: String!
  }

  type Query {
    users: [User]
    userById(id: ID!): User
  }

  type Mutation {
    addUser(id: ID, name: String): User
    updateUser(id: ID, name: String): User
    deleteUser(id: String): User
  }

  type Subscription {
    userAdded: User
    somethingChanged: Result
    postAdded: Post
    messageAdded(id: ID, name: String, channelId: ID!): Message
  }
`;
module.exports = typeDefs;
