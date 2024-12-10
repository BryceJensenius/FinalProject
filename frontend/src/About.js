import React, { useState } from 'react';

const About = ({ cards, setCards }) => {
  // State for form data
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send the data to an API)
    console.log(formData); // Just logs for now
    // Reset form after submission (optional)
    setFormData({ email: '', name: '', message: '' });
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
