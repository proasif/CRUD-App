import gql from "graphql-tag";
const ADD_USER = gql`
  mutation($id: ID, $name: String!) {
    addUser(id: $id, name: $name) {
      id
      name
    }
  }
`;

const UPDATE_USER = gql`
  mutation($id: ID, $name: String!) {
    updateUser(id: $id, name: $name) {
      id
      name
    }
  }
`;

const DELETE_USER = gql`
  mutation($id: String!) {
    deleteUser(id: $id) {
      id
      name
    }
  }
`;

export { ADD_USER, DELETE_USER, UPDATE_USER };
