import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from './images/logo.jpg';

const Home = () => {
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    // Fetch carousel data from the backend
    fetch('http://localhost:8081/api/slidecards')
      .then((response) => response.json())
      .then((data) => {
        setCarouselItems(data); // Update state with fetched data
      })
      .catch((err) => console.log('Error:', err));
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div>
      <main>
        <section>
          <div className="title-heading">
            <img src={logo} className="rounded-circle logo" alt="clubLogo" />
            <h1 className="page-title">Tree Climbing Club</h1>
          </div>
        </section>
      </main>

      <div className="car-container">
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner" id="carouselItems">
            {carouselItems.map((slideCard, index) => {
              const isActive = index === 0 ? 'active' : ''; // Set first item as active
              return (
                <div key={index} className={`carousel-item ${isActive}`}>
                  <img
                    src={slideCard.imageURL}
                    className="d-block w-100"
                    style={{ objectFit: 'cover' }}
                    alt={slideCard.alt}
                  />
                  <div className="carousel-caption">
                    <h5>{slideCard.heading}</h5>
                    <p>{slideCard.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;