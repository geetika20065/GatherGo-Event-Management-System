import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Venue() {
  const [venueName, setVenueName] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [venues, setVenues] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    navigate("/login");
  }
}, [navigate]);
  const handleSubmit = (e) => {
  e.preventDefault();

  if (editIndex !== null) {
    const updatedVenues = [...venues];

    updatedVenues[editIndex] = {
      venueName,
      location,
      capacity,
    };

    setVenues(updatedVenues);
    setEditIndex(null);
  } else {
    fetch("http://127.0.0.1:5000/venues", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    venue_name: venueName,
    location: location,
    capacity: capacity,
  }),
})
.then((response) => response.json())
.then(() => {
  return fetch("http://127.0.0.1:5000/venues");
})
.then((response) => response.json())
.then((data) => {
  setVenues(data);
});
  }

  setVenueName("");
  setLocation("");
  setCapacity("");
};
const deleteVenue = (id) => {

  fetch(`http://127.0.0.1:5000/venues/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then(() => {
      return fetch("http://127.0.0.1:5000/venues");
    })
    .then((response) => response.json())
    .then((data) => {
      setVenues(data);
    });

};
const editVenue = (id) => {

  const venue = venues.find(v => v.id === id);

  setVenueName(venue.venue_name);
  setLocation(venue.location);
  setCapacity(venue.capacity);

  setEditIndex(id);
};
useEffect(() => {
  fetch("http://127.0.0.1:5000/venues")
    .then((response) => response.json())
    .then((data) => {
      setVenues(data);
    });
}, []);
  return (
    <div className="form-container">
      <h1>Venue Management</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Venue Name"
          value={venueName}
          onChange={(e) => setVenueName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />

      <button type="submit">
  {editIndex !== null ? "Update Venue" : "Add Venue"}
      </button>
      </form>
      <table className="user-table">
  <thead>
    <tr>
      <th>Venue Name</th>
      <th>Location</th>
      <th>Capacity</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>
    {venues.map((venue, index) => (
      <tr key={index}>
       <td>{venue.venue_name}</td>
       <td>{venue.location}</td>
       <td>{venue.capacity}</td>

   <td>
  <button onClick={() => editVenue(venue.id)}>
    Edit
  </button>

  <button onClick={() => deleteVenue(venue.id)}>
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

export default Venue;