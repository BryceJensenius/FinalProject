import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import About from "./About.js";
import FunZone from "./FunZone.js";
import GetInvolved from "./GetInvolved.js";
import Home from "./Home.js";
import NavBar from "./NavBar.js";
import Authentication from "./Login.js";
import Register from "./Register.js"; // Register component import
import Footer from "./Footer.js";
import Messages from "./Messages.js";
import JoinRequests from "./JoinRequests.js";

function App() {
  const [cards, setCards] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="App">
      <Router>
        {/* Navbar and Footer */}
        {userRole && <NavBar userRole={userRole} />}
        {/* Main Routes - These should be visible to everyone */}
        <Routes>
          {/* Auth routes */}
          <Route path="/" element={
            <Authentication
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              setUserRole={setUserRole}
            />
          } />
          <Route path="/register" element={<Register />} />

          {/* Routes that require the user to be logged in */}
          {userRole && (
            <>
              <Route path="/home" element={<Home cards={cards} setCards={setCards} />} />
              <Route path="/getInvolved" element={<GetInvolved cards={cards} setCards={setCards} />} />
              <Route path="/funZone" element={<FunZone cards={cards} setCards={setCards} userRole={userRole}/>} />
              <Route path="/aboutPage" element={<About cards={cards} setCards={setCards} />} />

              {/* Admin-only route */}
              {userRole === "admin" && (
                <Route path="/messages" element={<Messages />} />
              )}

              {userRole === "admin" && (
                <Route path="/joinRequests" element={<JoinRequests />} />
              )}

            </>
          )} : {
            <Route path="*" element={<Navigate to="/" />} />
          }
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
