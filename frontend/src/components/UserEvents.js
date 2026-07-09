import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

function UserEvents() {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {

  const username = localStorage.getItem("username");

  fetch("http://127.0.0.1:5000/events")
    .then(res => res.json())
    .then(data => {
      setEvents(data);
    });

  fetch("http://127.0.0.1:5000/registrations")
    .then(res => res.json())
    .then(data => {

      const myEvents = data
        .filter(reg => reg.username === username)
        .map(reg => reg.event_name);

      setRegisteredEvents(myEvents);

    });

}, []);

 const registerEvent = (event) => {
  console.log(event);
  const username =
    localStorage.getItem("username");

  fetch("http://127.0.0.1:5000/registrations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
  username: username,
  event_name: event.event_name,
  event_date: new Date(event.event_date)
    .toISOString()
    .split("T")[0],
  venue: event.venue,
}),
  })
  .then(async (response) => {
  const data = await response.json();

  if (response.status === 409) {
  Swal.fire({
    icon: "warning",
    title: "Already Registered",
    text: "You have already registered for this event.",
    confirmButtonColor: "#9f460a"
  });
} else {
  Swal.fire({
    icon: "success",
    title: "Registration Successful!",
    text: "You have been registered successfully.",
    confirmButtonColor: "#9f460a"
  });
  setRegisteredEvents(prev => [...prev, event.event_name]);
}
});

};

  return (
    <div className="form-container">
      <h1>Available Events</h1>

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
          {events.map((event, index) => (
            <tr key={index}>
             <td>{event.event_name}</td>
             <td>
              {event.event_date
                ? new Date(event.event_date).toLocaleDateString(): ""}
             </td>
             <td>{event.venue}</td>
              <td>
               {registeredEvents.includes(event.event_name) ? (

<button disabled>
  ✓ Registered
</button>

) : (

<button
  onClick={() => registerEvent(event)}
>
  Register
</button>

)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserEvents;