import React, { useEffect, useState } from "react";
import "./customStyles/Messages.css";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  // Fetch messages from the backend
  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/messages");
      if (!response.ok) throw new Error("Failed to fetch messages");
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Delete a message
  const deleteMessage = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/api/messages/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete message");

      // Remove the deleted message from the state
      setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center green-theme-title">Messages</h2>
      {messages.length === 0 ? (
        <p className="text-center text-muted">No messages found.</p>
      ) : (
        <table className="table table-hover green-theme-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message.id}>
                <td>{message.id}</td>
                <td>{message.email}</td>
                <td>{message.name}</td>
                <td>{message.message}</td>
                <td>
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => deleteMessage(message.id)}
                  >
                    Delete
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

export default Messages;