import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from './images/logo.jpg';

const Home = () => {
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    // Fetch carousel data and update state
    fetch('data.json')
      .then((response) => response.json())
      .then((data) => {
        setCarouselItems(data.slideCards); // Update state with fetched data
      })
      .catch((err) => console.log('Error:', err));
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  useEffect(() => {
    // Initialize the Bootstrap carousel after the items are loaded
    if (carouselItems.length > 0) {
      // const carouselElement = new bootstrap.Carousel(document.getElementById('carouselExample'));
    }
  }, [carouselItems]); // Re-run the effect when carouselItems changes

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

export default Home;
