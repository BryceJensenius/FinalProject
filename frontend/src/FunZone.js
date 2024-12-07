import React, { useEffect, useState } from "react";
import logo from './images/logo.jpg';

const FunZone = ({ cards, setCards }) => {
    const [aboutCards, setAboutCards] = useState([]);
    const [filters, setFilters] = useState({ searchFilter: "" });
    const [error, setError] = useState("");

    // Function to fetch and load about cards
    const getAboutCards = async () => {
        try {
            const response = await
            fetch("http://localhost:8081/treeCards", {
                method: "GET",
                headers: { "Content-Type": "application/json", }
            });
            console.log(response);
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error);
                return;
            }

            const data = await response.json();
            const filteredCards = filterCards(data);
            setAboutCards(filteredCards);
        } catch (err) {
            console.log("Failed retrieving about cards. "+err);
            setError("Failed retrieving about cards. " + err);
        }
    };

    // Function to fetch and load card reviews
    const getCardReviews = async (heading) => {
        try {
            const response = await fetch(`./Data/${heading}.json`);
            const data = await response.json();
            return data.reviews;
        } catch (err) {
            console.log("Error:", err);
        }
    };

    // Filter cards based on the search filter
    const filterCards = (cards) => {
        return cards.filter(card => {
            const { heading, description, alt } = card;
            const lowerCaseSearchFilter = filters.searchFilter.toLowerCase();
            return (
                heading.toLowerCase().includes(lowerCaseSearchFilter) ||
                description.toLowerCase().includes(lowerCaseSearchFilter) ||
                alt.toLowerCase().includes(lowerCaseSearchFilter)
            );
        });
    };

    useEffect(() => {
        // Fetch the cards on mount
        getAboutCards();
    }, [filters]);

    // Function to toggle the review form
    const toggleReviewForm = (card, reviewTextAreaRef) => {
        reviewTextAreaRef.current.style.display =
            reviewTextAreaRef.current.style.display === "none" ? "block" : "none";
        if (reviewTextAreaRef.current.style.display === "block") {
            getCardReviews(card.heading).then(reviews => {
                loadReviewsForElement(reviewTextAreaRef.current, reviews);
            });
        }
    };

    // Function to load reviews for a specific card
    const loadReviewsForElement = (element, reviews) => {
        element.innerHTML = ''; // Clear existing reviews
        reviews.forEach(review => {
            const reviewDiv = document.createElement("div");
            reviewDiv.classList.add("review-container");
            reviewDiv.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">Student Review</h5>
                    <p class="card-text">${review.description}</p>
                    <p class="card-text">Rating: ${review.rating}</p>
                </div>
            `;
            element.appendChild(reviewDiv);
        });
    };

    // Handle the search filter input change
    const handleSearchInputChange = (e) => {
        setFilters(prevFilters => ({ ...prevFilters, searchFilter: e.target.value }));
    };

    // Handle the search button click
    const handleSearchButtonClick = () => {
        getAboutCards(); // Fetch cards based on updated filter
    };

    return (
        <div>
            <main>
                <section>
                    <div className="title-heading">
                        <img src={logo} className="rounded-circle logo" alt="clubLogo" />
                        <h1 className="page-title">Tree Climbing Club</h1>
                    </div>
                </section>

                <div className="search-container">
                    <input
                        type="text"
                        id="searchBar"
                        className="search-input inputEntry form-control"
                        placeholder="Filter By..."
                        value={filters.searchFilter}
                        onChange={handleSearchInputChange}
                    />
                    <button id="searchButton" className="search-button" onClick={handleSearchButtonClick}>
                        Search
                    </button>
                </div>

                <div className="album py-5">
                    <div id="row" className="card-container">
                        {/* {aboutCards.map((card, index) => (
                            <div key={index} className="col card shadow-sm d-flex flex-row align-items-center nature-texture-background">
                                <div className="card-container" style={{ backgroundPosition: randomBackgroundPosition() }}>
                                    <div className="p-2">
                                        <img src={card.imageURL} className="rounded-circle picture-Border" alt={card.alt} />
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{card.heading}</h5>
                                        <p className="card-text">{card.description}</p>
                                        <div className="review-form" style={{ display: "none", marginTop: "10px" }}>
                                            <textarea className="review-text" rows="3" placeholder="Write your review..."></textarea>
                                            <button className="submit-review">Submit Review</button>
                                            <button className="cancel-review">Cancel</button>
                                        </div>
                                        <div className="leave-review-left" style={{ display: "flex" }}>
                                            <button
                                                className="leave-review"
                                                onClick={(e) => toggleReviewForm(card, e.target.nextElementSibling)}
                                            >
                                                More Info
                                            </button>
                                            <button
                                                className="leave-review"
                                                onClick={(e) => toggleReviewForm(card, e.target.nextElementSibling)}
                                            >
                                                Leave Review
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div id="infoModal"></div>
                            </div>
                        ))} */}
                        {aboutCards.map((card, index) => (
                            <div
                                key={index}
                                className={`row card shadow-sm align-items-center ${
                                    index % 2 === 0 ? "flex-row-reverse" : "flex-row"
                                }`}
                                style={{ marginBottom: "20px" }}
                            >
                                <div className="col-md-4">
                                    <img
                                        src={card.imageURL}
                                        className="rounded-circle picture-Border img-fluid"
                                        alt={card.alt}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{card.heading}</h5>
                                        <p className="card-text">{card.description}</p>
                                        <div className="review-form" style={{ display: "none", marginTop: "10px" }}>
                                            <textarea className="review-text" rows="3" placeholder="Write your review..."></textarea>
                                            <button className="submit-review">Submit Review</button>
                                            <button className="cancel-review">Cancel</button>
                                        </div>
                                        <div className="leave-review-left" style={{ display: "flex" }}>
                                            <button
                                                className="leave-review"
                                                onClick={(e) => toggleReviewForm(card, e.target.nextElementSibling)}
                                            >
                                                More Info
                                            </button>
                                            <button
                                                className="leave-review"
                                                onClick={(e) => toggleReviewForm(card, e.target.nextElementSibling)}
                                            >
                                                Leave Review
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </main>
        </div>
    );
};

// Function to generate random background position
const randomBackgroundPosition = () => {
    const randomX = Math.floor(Math.random() * 100);
    const randomY = Math.floor(Math.random() * 100);
    return `${randomX}% ${randomY}%`;
};

export default FunZone;
