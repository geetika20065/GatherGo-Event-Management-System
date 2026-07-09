import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserManagement() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    navigate("/login");
  }
}, [navigate]);
  useEffect(() => {
  fetch("http://127.0.0.1:5000/users")
    .then((response) => response.json())
    .then((data) => {
      setUsers(data);
    });
}, []);
// useEffect(() => {
//   if (loaded) {
//     localStorage.setItem("users", JSON.stringify(users));
//   }
// }, [users, loaded]);
 const handleSubmit = (e) => {
  e.preventDefault();

  if (editId) {

    fetch(`http://127.0.0.1:5000/users/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        return fetch("http://127.0.0.1:5000/users");
      })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);

        setName("");
        setEmail("");
        setEditId(null);
      });

  } else {

    fetch("http://127.0.0.1:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        return fetch("http://127.0.0.1:5000/users");
      })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);

        setName("");
        setEmail("");
      });

  }
};
  const deleteUser = (id) => {

  fetch(`http://127.0.0.1:5000/users/${id}`, {
    method: "DELETE",
  })
  .then((response) => response.json())
  .then(() => {

    return fetch("http://127.0.0.1:5000/users");

  })
  .then((response) => response.json())
  .then((data) => {

    setUsers(data);

  });

};
  const editUser = (user) => {
  setName(user.name);
  setEmail(user.email);
  setEditId(user.id);
};
  return (
    <div className="form-container">
      <h1>User Management</h1>

<input
  className="search-box"
  type="text"
  placeholder="Search User..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">
          {editId ? "Update User" : "Add User"}
        </button>
    </form>
    <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
  {users
    .filter((user) =>
      user.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .map((user, index) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>

        <td>
          <button onClick={() => editUser(user)}>
            Edit
          </button>

          <button onClick={() => deleteUser(user.id)}>
            Delete
          </button>
        </td>
      </tr>
    ))}
</tbody>
      </table>
    </div>
  );
}

export default UserManagement;