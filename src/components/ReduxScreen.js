import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter,
  Route,
  Routes,
  useParams,
  Link,
} from "react-router-dom";

const UsersList = function () {
  const users = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) =>
        dispatch({
          type: "LOAD",
          payload: json,
        })
      );
  }, [dispatch]);

  return users.length === 0 ? (
    <p>Loading ... </p>
  ) : (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <p>
            Name: {user.name}
            <br />
            Username: {user.username}
            <br />
            Email: {user.email}
          </p>
          <Link to={`user/${user.id}`}>Go to Details</Link>
        </li>
      ))}
    </ul>
  );
};

const User = function () {
  const users = useSelector((state) => state.usersReducer);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (users.length === 0) {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) =>
          dispatch({
            type: "LOAD",
            payload: json,
          })
        );
    }
  }, [dispatch, users.length]);

  return users.length === 0 ? (
    <p>Loading ...</p>
  ) : (
    <div>
      <h3>User Details</h3>
      <p>
        Name: {users[id - 1].name}
        <br />
        Username: {users[id - 1].username}
        <br />
        Email: {users[id - 1].email}
      </p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default function ReduxScreen() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<UsersList />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}
