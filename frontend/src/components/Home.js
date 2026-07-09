import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserHome from "./UserHome";
import { FaUsers, FaBuilding, FaClipboardCheck } from "react-icons/fa";
import { MdEvent } from "react-icons/md";

function Home() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({
    total_users: 0,
    total_events: 0,
    total_venues: 0,
    total_registrations: 0,
  });

  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (role === "admin") {
      fetch("http://127.0.0.1:5000/dashboard")
        .then((response) => response.json())
        .then((data) => {
          setDashboard(data);
        });
    }
  }, [role]);

  // ================= USER DASHBOARD =================

  if (role !== "admin") {
    return <UserHome />;
}
  // ================= ADMIN DASHBOARD =================

  return (
    <div className="form-container">

      <h1 className="dashboard-title">
        Admin Dashboard
      </h1>

      <p className="dashboard-subtitle">
        Welcome back! Here's what's happening in GatherGo.
      </p>

      <div className="dashboard-container">

        <div className="dashboard-card users-card">
          <FaUsers size={50} color="white" />
          <h2>{dashboard.total_users}</h2>
          <p>Total Users</p>
        </div>

        <div className="dashboard-card events-card">
          <MdEvent size={50} color="white" />
          <h2>{dashboard.total_events}</h2>
          <p>Total Events</p>
        </div>

        <div className="dashboard-card venues-card">
          <FaBuilding size={50} color="white" />
          <h2>{dashboard.total_venues}</h2>
          <p>Total Venues</p>
        </div>

        <div className="dashboard-card reg-card">
          <FaClipboardCheck size={50} color="white" />
          <h2>{dashboard.total_registrations}</h2>
          <p>Total Registrations</p>
        </div>

      </div>

    </div>
  );
}

export default Home;