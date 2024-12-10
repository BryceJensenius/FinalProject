import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import "./customStyles/Authentication.css"; // Optional: Add custom styles in a CSS file.

const Register = () => {
  const [name, setName] = useState(""); // Name instead of username
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is 'user'
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setSuccess(""); // Reset success message

    try {
      const response = await fetch("http://localhost:8081/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password, role }), // Send name, password, and role
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to register.");
        return;
      }

      setSuccess("Registration successful! You can now log in.");
      setName(""); // Reset name input
      setPassword(""); // Reset password input
      setRole("user"); // Reset role to default 'user'

      // Redirect to login page after successful registration
      setTimeout(() => {
        navigate("/"); // Redirect to the login page after 1 second
      }, 1000); // 1-second delay to show the success message
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 bg-light"
      style={{
        background: "linear-gradient(to right, darkgreen, #51ab2f)", // Green gradient background
        height: "100vh",
      }}
    >
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body">
          <h2 className="text-center mb-4 green-text">Create an Account</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                id="role"
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {success && <div className="alert alert-success mt-3">{success}</div>}

            <button type="submit" className="btn btn-primary w-100 mt-3">
              Register
            </button>
          </form>
        </div>
        <div className="text-center mt-3">
          <small>
            Already have an account?{" "}
            <Link to="/" className="text-decoration-none text-primary">
              Login here
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;