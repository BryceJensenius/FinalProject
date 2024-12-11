import React, { useState } from 'react';

const About = ({ cards, setCards }) => {
  // State for form data
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    message: ''
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:8081/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('Failed to submit message.');
    }

    const result = await response.json();
    console.log(result.message); // Display success message
    // Optionally reset the form
    setFormData({ email: '', name: '', message: '' });
    alert('Message submitted successfully!');
  } catch (error) {
    console.error('Error submitting the message:', error);
    alert('Failed to submit the message. Please try again.');
  }
};


  return (
    <div className="backgroundWithImage">
      <div className="verticalPageDivider">
        <div className="elementWithColorBackground">
          <div className="container">
            <h2>Construction of User Interfaces</h2>
            <h3>ComS 3190, Fall 2024</h3>
            <div className="contacts">
              <p>
                <em>Professor</em>
                <br />
                Abraham Gastelum
              </p>
            </div>
          </div>
        </div>

        <div className="elementWithColorBackground">
          <div className="container">
            <h2>Designed By</h2>
            <div className="contactFlex">
              <p>
                <em>Student</em>
                <br />
                Bryce Jensenius
                <br />
                brycejen@iastate.edu
              </p>
              <p className="separator"></p>
              <p>
                <em>Student</em>
                <br />
                Maggie Sullivan
                <br />
                msully@iastate.edu
              </p>
            </div>
          </div>
        </div>

        <div className="elementWithColorBackground">
          <h5>Contact Us</h5>
          <form onSubmit={handleSubmit}>
            <div className="form-comments">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control inputEntry"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="form-comments">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-control inputEntry"
                placeholder="ex: John Smith"
                required
              />
            </div>
            <div className="form-comments">
              <label>Question/Comment</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="form-control inputEntry"
                rows="3"
                placeholder="How can I get involved? When do you meet? How many members do you have?"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary mb-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default About;