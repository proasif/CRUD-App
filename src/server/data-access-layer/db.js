const { DataStore } = require("notarealdb");
const store = new DataStore("src/server/data");
module.exports = {
  users: store.collection("users"),
};
