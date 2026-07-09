import React from "react";
import { Link } from "react-router-dom";
import { MdEvent } from "react-icons/md";
import { HiClipboardDocumentList } from "react-icons/hi2";

function UserHome() {

  const username = localStorage.getItem("username");

  return (
    <div className="user-home">

      <h1>Welcome, {username} 👋</h1>

      <p className="dashboard-subtitle">
        Discover events and manage your registrations.
      </p>

      <div className="user-cards">

        <Link to="/userevents" className="user-card events-user">
          <MdEvent />
          <h2>Events</h2>
          <span>Browse all available events</span>
        </Link>

        <Link to="/myregistrations" className="user-card reg-user">
          <HiClipboardDocumentList />
          <h2>My Registrations</h2>
          <span>View your registered events</span>
        </Link>

      </div>

    </div>
  );
}

export default UserHome;