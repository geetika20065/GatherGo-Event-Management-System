import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import UserManagement from "./components/UserManagement";
import EventManagement from "./components/EventManagement";
import EventRegistration from "./components/EventRegistration";
import Venue from "./components/Venue";
import Login from "./components/Login";
import UserHome from "./components/UserHome";
import UserEvents from "./components/UserEvents";
import MyRegistrations from "./components/MyRegistrations";
import Footer from "./components/Footer";

function App() {

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <BrowserRouter>

      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/events" element={<EventManagement />} />
        <Route path="/registration" element={<EventRegistration />} />
        <Route path="/venue" element={<Venue />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/userevents" element={<UserEvents />} />
        <Route path="/myregistrations" element={<MyRegistrations />} />
      </Routes>

      {/* Footer */}
      {isLoggedIn && <Footer />}

    </BrowserRouter>
  );
}

export default App;