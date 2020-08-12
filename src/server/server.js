const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const db = require("./data-access-layer/db");
const isEmail = require("isemail");
const typeDefs = require("./schema/schema");
const resolvers = require("./resolvers/resolvers");
const port = process.env.PORT || 9000;

// the function that sets up the global context for each resolver, using the req
const context = async ({ req }) => {
  // simple auth check on every request
  const auth = (req.headers && req.headers.authorization) || "";
  const email = new Buffer(auth, "base64").toString("ascii");

  // if the email isn't formatted validly, return null for user
  if (!isEmail.validate(email)) return { user: null };
  // find a user by their email

  const user = await db.users.list().find((user) => user.email === email);

  return { user };
};

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);
