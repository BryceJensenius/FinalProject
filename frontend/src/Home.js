import React from 'react';

const Home = ({ cards, setCards }) => {

    function loadCarousel() {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                const carouselItemsContainer = document.getElementById('carouselItems');
                carouselItemsContainer.innerHTML = ''; // Clear any existing items
    
                data.slideCards.forEach((slideCards, index) => {
                    const isActive = index === 0 ? 'active' : ''; // Set the first item as active
                    const carouselItem = `
                        <div class="carousel-item ${isActive}">
                            <img src="${slideCards.imageURL}" class="d-block w-100" style="object-fit: cover" alt="${slideCards.alt}">
                            <div class="carousel-caption">
                                <h5>${slideCards.heading}</h5>
                                <p>${slideCards.description}</p>
                            </div>
                        </div>
                    `;
                    carouselItemsContainer.innerHTML += carouselItem; // Add the new item to the carousel
                });
            })
            .catch(err => console.log('Error:', err));
            // Initialize the carousel
            const carouselElement = new bootstrap.Carousel(document.getElementById('carouselExample'));
    }
    
    // Call the function to load the carousel
    window.onload = loadCarousel;

    
  return (
    <div>
      <header id="heading">
        <nav className="headNav" id="headNavElem">
          <button id="toggleNav" className="hamburger">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </button>
          <ul id="navItems">
            <li><a href="./index.html" className="currentPageIcon">Home</a></li>
            <li><a href="./getInvolved.html">Get Involved</a></li>
            <li><a href="./funzone.html">Fun Zone</a></li>
            <li><a href="./about.html">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section>
          <div className="title-heading">
            <img src="./images/logo.jpg" className="rounded-circle logo" alt="clubLogo" />
            <h1 className="page-title">Tree Climbing Club</h1>
          </div>
        </section>
      </main>

      <div className="car-container">
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner" id="carouselItems"></div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <footer className="text-body-secondary py-3">
        <div className="container">
          <nav>
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
              <li><a href="./index.html">About</a></li>
              <li><a href="./getInvolved.html">Get Involved</a></li>
              <li><a href="./funzone.html">Fun Zone</a></li>
              <li><a href="./about.html">Contact</a></li>
            </ul>
          </nav>
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
