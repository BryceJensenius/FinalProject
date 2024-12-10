import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from 'react-router-dom';  // Import Link and useLocation
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./customStyles/Authentication.css"; // Optional: Add custom styles in a CSS file.

const Authentication = ({ username, setUsername, password, setPassword, setUserRole }) => {
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Initialize the navigate function

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8081/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error);
                return;
            }

            const { role } = await response.json();
            setUserRole(role);

            // Redirect to home page after correct login
            setTimeout(() => {
                navigate("/home"); // Redirect to the login page after 1 second
            }, 1000); // 1-second delay to show the success message
        } catch (err) {
            setError("Failed to log in. Please try again. " + err);
        }
    };

    return (
        <div 
        className="d-flex align-items-center justify-content-center vh-100 bg-light"
        style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(to right, darkgreen, #51ab2f)",
        }}>
            <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <div className="card-body">
                    <h2 className="text-center mb-4 green-text">Welcome Back</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                placeholder="Enter your username"
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
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                        <button type="submit" className="btn btn-primary w-100 mt-3">
                            Login
                        </button>
                    </form>
                </div>
                <div className="text-center mt-3">
                    <small>
                        Don't have an account?{" "}
                        <Link to="/register" className="text-decoration-none text-primary">
                            Sign up
                        </Link>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default Authentication;