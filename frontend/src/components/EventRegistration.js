import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EventRegistration() {
  const [registrations, setRegistrations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/registrations")
      .then((response) => response.json())
      .then((data) => {
        setRegistrations(data);
      });
  }, []);

  return (
    <div className="form-container">
      <h1>Event Registration</h1>

      <table className="user-table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Event Name</th>
            <th>Date</th>
            <th>Venue</th>
          </tr>
        </thead>

        <tbody>
          {registrations.map((registration) => (
            <tr key={registration.id}>
              <td>{registration.username}</td>

              <td>{registration.event_name}</td>

              <td>
                {registration.event_date
                  ? new Date(registration.event_date).toLocaleDateString(
                      "en-GB"
                    )
                  : "No Date"}
              </td>

              <td>{registration.venue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventRegistration;