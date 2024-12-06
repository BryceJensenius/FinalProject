import React from 'react';
import logo from './images/logo.jpg';

const GetInvolved = ({ cards, setCards }) => {
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
            <form>
              <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control inputEntry" placeholder="name@example.com" />
              </div>
              <div className="form-group">
                <label>Name</label>
                <input type="name" className="form-control inputEntry" placeholder="ex: John Smith" />
              </div>
              <div className="form-group">
                <label>Classification</label>
                <select className="form-control inputEntry">
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
      </main>

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

export default GetInvolved;
