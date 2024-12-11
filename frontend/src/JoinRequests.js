import React, { useEffect, useState } from "react";
import "./customStyles/JoinRequests.css";

const JoinRequests = () => {
  const [requests, setRequests] = useState([]);

  // Fetch join requests
  const fetchRequests = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/joinRequests");
      if (!response.ok) throw new Error("Failed to fetch requests");
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  // Accept a request
  const acceptRequest = async (request) => {
    try {
      await fetch("http://localhost:8081/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      await deleteRequest(request.id);
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  // Reject a request
  const deleteRequest = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/api/joinRequests/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete request");
      setRequests((prevRequests) => prevRequests.filter((req) => req.id !== id));
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Join Requests</h2>
      {requests.length === 0 ? (
        <p className="text-center">No requests found.</p>
      ) : (
        <table className="table table-striped table-bordered table-hover">
          <thead className="bg-success text-white">
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Classification</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.email}</td>
                <td>{request.name}</td>
                <td>{request.classification}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm mr-2"
                    onClick={() => acceptRequest(request)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteRequest(request.id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JoinRequests;