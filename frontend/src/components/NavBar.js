import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
const navigate = useNavigate();

const isLoggedIn =
  localStorage.getItem("isLoggedIn");

const role =
  localStorage.getItem("role");

  const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("role");

  navigate("/login");
};
  return (
    <nav className="navbar">
      <h2 className="logo">GatherGo</h2>

      <ul className="nav-links">
        <li>
          <Link to="/">Dashboard</Link>
        </li>
          {!isLoggedIn && (
        <li>
         <Link to="/login">Login</Link>
        </li>
         )}
        {isLoggedIn && role === "admin" && (
  <>
    <li>
      <Link to="/users">Users</Link>
    </li>

    <li>
      <Link to="/events">Events</Link>
    </li>

    <li>
      <Link to="/registration">
        Registration
      </Link>
    </li>

    <li>
      <Link to="/venue">Venue</Link>
    </li>
  </>
)}
{isLoggedIn && role === "user" && (
  <>

<li>
  <Link to="/userevents">Events</Link>
</li>

<li>
  <Link to="/myregistrations">
    My Registrations
  </Link>
</li>
  </>
)}
{isLoggedIn && (
  <li>
    <button onClick={handleLogout}>
      Logout
    </button>
  </li>
)}
      </ul>
    </nav>
  );
};

export default NavBar;
