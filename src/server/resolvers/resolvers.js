const db = require("../data-access-layer/db");
const { PubSub, withFilter } = require("apollo-server");

const SOMETHING_CHANGED_TOPIC = "something_changed";
// const POST_ADDED = "POST_ADDED";

const pubsub = new PubSub();

module.exports = {
  Subscription: {
    userAdded: {
      subscribe: () => console.log("test"),
    },
    somethingChanged: {
      subscribe: () => pubsub.asyncIterator(SOMETHING_CHANGED_TOPIC),
    },
  },

  Query: {
    users: (root, args) => {
      return db.users.list();
    },
    userById: (root, args, context, info) => {
      //args will contain parameter passed in query
      console.log(args.id);
      return db.users.get(args.id);
    },
  },
  Mutation: {
    addUser: (root, args, context, info) => {
      const id = db.users.create({
        id: args.id,
        name: args.name,
        username: args.username,
        email: args.email,
      });
      return db.users.get(id);
    },
    updateUser: (root, args, context, info) => {
      db.users.update({
        id: args.id,
        name: args.name,
        username: args.username,
        email: args.email,
      });
      return db.users.get(args.id);
    },
    deleteUser: (root, args, context, info) => {
      const userToDelete = db.users.get(args.id);
      db.users.delete(args.id);
      return userToDelete;
    },
  },
};
