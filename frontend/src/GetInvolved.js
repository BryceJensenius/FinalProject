import React, { useState, useEffect } from "react";
import logo from "./images/logo.jpg";

const GetInvolved = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    classification: "Freshman",
  });

  const [members, setMembers] = useState([]);

  // Fetch members from the backend
  const fetchMembers = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/members");
      if (!response.ok) throw new Error("Failed to fetch members");
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  // Fetch members when the component mounts
  useEffect(() => {
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/api/joinRequests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to submit join request");
      alert("Join request submitted successfully!");
      setFormData({ email: "", name: "", classification: "Freshman" });
    } catch (error) {
      alert("Error submitting join request.");
    }
  };

  return (
    <div>
      <main>
        <section>
          <div className="title-heading">
            <img src={logo} className="rounded-circle logo" alt="clubLogo" />
            <h1 className="page-title">Tree Climbing Club</h1>
          </div>
        </section>

        <div className="involved-container">
          <div className="card-body">
            <h5 className="card-title">Get Involved</h5>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control inputEntry"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control inputEntry"
                  placeholder="ex: John Smith"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Classification</label>
                <select
                  name="classification"
                  className="form-control inputEntry"
                  value={formData.classification}
                  onChange={handleChange}
                >
                  <option>Freshman</option>
                  <option>Sophomore</option>
                  <option>Junior</option>
                  <option>Senior</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary mb-2">
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Display Members as Bubbles */}
        <div className="members-bubbles">
          {members.length > 0 ? (
            members.map((member) => (
              <div key={member.id} className="bubble">
                <h6>{member.name}</h6>
                <p>{member.email}</p>
                <p>{member.classification}</p>
              </div>
            ))
          ) : (
            <p>No members found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default GetInvolved;