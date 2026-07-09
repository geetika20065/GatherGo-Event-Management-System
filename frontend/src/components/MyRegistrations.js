import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);

  const username = localStorage.getItem("username");

  const loadRegistrations = () => {
    fetch("http://127.0.0.1:5000/registrations")
      .then((response) => response.json())
      .then((data) => {
        const userRegistrations = data.filter(
          (registration) => registration.username === username
        );

        setRegistrations(userRegistrations);
      });
  };

  useEffect(() => {
    loadRegistrations();
  }, []);

  const cancelRegistration = (registration) => {
    Swal.fire({
      title: "Cancel Registration?",
      text: "Do you want to cancel this registration?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Cancel"
    }).then((result) => {
      if (result.isConfirmed) {

        fetch("http://127.0.0.1:5000/registrations", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: registration.username,
            event_name: registration.event_name
          })
        })
          .then((response) => response.json())
          .then((data) => {

            Swal.fire(
              "Cancelled!",
              data.message,
              "success"
            );

            loadRegistrations();

          });

      }
    });
  };

  return (
    <div className="form-container">
      <h1>My Registrations</h1>

      <table className="user-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Date</th>
            <th>Venue</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {registrations.map((event, index) => (
            <tr key={index}>
              <td>{event.event_name}</td>

              <td>
                {event.event_date
                  ? new Date(event.event_date).toLocaleDateString("en-GB")
                  : "No Date"}
              </td>

              <td>{event.venue}</td>

              <td>
                <button
                  onClick={() => cancelRegistration(event)}
                >
                  Cancel
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyRegistrations;