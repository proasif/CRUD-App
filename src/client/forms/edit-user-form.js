import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_USER } from "../mutations/mutations";
import { GET_USERS } from "../query/query";

const EditUserForm = (props) => {
  const [user, setUser] = useState(props.currentUser);

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const updateCache = (cache, { data }) => {
    // Fetch the users from the cache
    const existingUsers = cache.readQuery({
      query: GET_USERS,
    });

    console.log("updateCache -> existingUsers", existingUsers);

    // Add the new todo to the cache
    const newUser = data;
    console.log("updateCache -> newUser", newUser);

    cache.writeQuery({
      query: GET_USERS,
      data: { users: [newUser, ...existingUsers.users] },
    });
  };

  const resetInput = () => {
    props.setEditing(false);
    props.updateUser(user.id, user);
  };

  const [edditUser] = useMutation(UPDATE_USER, {
    update: updateCache,
    onCompleted: resetInput,
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const { id, name } = user;
        edditUser({ variables: { id, name } });
      }}>
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleInputChange}
        style={{ border: "1px solid #ccc", backgroundColor: "white" }}
      />

      <div style={{ marginBottom: "20px" }}>
        <button>Update user</button>
        <button
          onClick={() => props.setEditing(false)}
          style={{ background: "red" }}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditUserForm;
