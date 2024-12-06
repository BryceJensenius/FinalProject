import React from 'react';

const About = ({ cards, setCards }) => {
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
          <form>
            <div className="form-comments">
              <label>Email address</label>
              <input type="email" className="form-control inputEntry" placeholder="name@example.com" />
            </div>
            <div className="form-comments">
              <label>Name</label>
              <input type="name" className="form-control inputEntry" placeholder="ex: John Smith" />
            </div>
            <div className="form-comments">
              <label>Question/Comment</label>
              <textarea
                className="form-control inputEntry"
                rows="3"
                placeholder="How can I get involved? When do you meet? How many members do you have?"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary mb-2">
              Submit
            </button>
          </form>
        </div>
      </div>

      <footer className="text-body-secondary py-3">
        <div className="container">
          <footer>
            <p>Follow us at:</p>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
          </footer>
        </div>
      </footer>
    </div>
  );
};

export default About;