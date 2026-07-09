import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log(role, username, password);
  if (
    role === "admin" &&
    username === "admin" &&
    password === "admin123"
  ) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", "admin");

    Swal.fire({
  icon: "success",
  title: "Welcome Admin!",
  text: "Login Successful",
  timer: 1800,
  showConfirmButton: false,
});
    navigate("/users");
  }

  else if (
    role === "user" &&
    username !== "" &&
    password !== ""
  ) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", "user");
    localStorage.setItem("username", username);

    Swal.fire({
  icon: "success",
  title: "Welcome!",
  text: "Login Successful",
  timer: 1800,
  showConfirmButton: false,
});
     setUsername("");
     setPassword("");
    navigate("/userhome");
  }

  else {
   Swal.fire({
  icon: "error",
  title: "Login Failed",
  text: "Invalid Username or Password",
});
  }
};

  return (
  <div className="form-container">
    <h1>Login</h1>

    <form autoComplete="off">
      <input
          type="text"
        placeholder="Enter Username"
        value={username}
       autoComplete="off"
       onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        autoComplete="new-password"
        onChange={(e) => setPassword(e.target.value)}
       />

       <select
         value={role}
        onChange={(e) => setRole(e.target.value)}
>
  <option value="admin">Admin</option>
  <option value="user">User</option>
 </select>
      <button type="button" onClick={handleLogin}>
        Login
      </button>
    </form>
  </div>
);
}

export default Login;