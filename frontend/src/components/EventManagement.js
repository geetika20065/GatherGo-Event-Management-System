import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EventManagement() {
const [eventName, setEventName] = useState("");
const [eventDate, setEventDate] = useState("");
const [venue, setVenue] = useState("");
const [events, setEvents] = useState([]);
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
fetchEvents();
}, []);

const fetchEvents = () => {
fetch("http://127.0.0.1:5000/events")
.then((response) => response.json())
.then((data) => {
setEvents(data);
});
};

const handleSubmit = (e) => {
e.preventDefault();

if (editId) {
  fetch(
    `http://127.0.0.1:5000/events/${editId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_name: eventName,
        event_date: eventDate,
        venue: venue,
      }),
    }
  )
    .then((response) => response.json())
    .then(() => {
      fetchEvents();
    });

  setEditId(null);
} else {
  fetch("http://127.0.0.1:5000/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event_name: eventName,
      event_date: eventDate,
      venue: venue,
    }),
  })
    .then((response) => response.json())
    .then(() => {
      fetchEvents();
    });
}

setEventName("");
setEventDate("");
setVenue("");

};

const deleteEvent = (id) => {
fetch(
`http://127.0.0.1:5000/events/${id}`,
{
method: "DELETE",
}
)
.then((response) => response.json())
.then(() => {
fetchEvents();
});
};

const editEvent = (event) => {
setEventName(event.event_name || "");

if (
  event.event_date &&
  event.event_date !== "0000-00-00"
) {
  setEventDate(
    String(event.event_date).substring(0, 10)
  );
} else {
  setEventDate("");
}

setVenue(event.venue || "");

setEditId(event.id);

};

return ( <div className="form-container"> <h1>Event Management</h1>

  <input
    type="text"
    placeholder="Search Event..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
  />

  <form onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Enter Event Name"
      value={eventName}
      onChange={(e) =>
        setEventName(e.target.value)
      }
    />

    <input
      type="date"
      value={eventDate}
      onChange={(e) =>
        setEventDate(e.target.value)
      }
    />

    <input
      type="text"
      placeholder="Enter Venue"
      value={venue}
      onChange={(e) =>
        setVenue(e.target.value)
      }
    />

    <button type="submit">
      {editId
        ? "Update Event"
        : "Add Event"}
    </button>
  </form>

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
      {events
        .filter((event) =>
          event.event_name
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            )
        )
        .map((event) => (
          <tr key={event.id}>
  <td>{event.event_name}</td>

  <td>
    {event.event_date
      ? new Date(event.event_date).toLocaleDateString("en-GB")
      : "No Date"}
  </td>

  <td>{event.venue}</td>

  <td>
    <button onClick={() => editEvent(event)}>
      Edit
    </button>

    <button onClick={() => deleteEvent(event.id)}>
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

export default EventManagement;
