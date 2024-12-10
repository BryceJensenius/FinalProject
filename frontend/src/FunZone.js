import React, { useEffect, useState } from "react";
import logo from './images/logo.jpg';

const FunZone = ({ cards, setCards }) => {
    const [aboutCards, setAboutCards] = useState([]);
    const [filters, setFilters] = useState({ searchFilter: "" });
    const [error, setError] = useState("");
    const [selectedCardReviews, setSelectedCardReviews] = useState({});
    const [reviewFormData, setReviewFormData] = useState({ description: "", rating: "", id: null });

    // Function to fetch and load about cards
    const getAboutCards = async () => {
        try {
            const response = await fetch("http://localhost:8081/treeCards", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error);
                return;
            }
            const data = await response.json();
            const filteredCards = filterCards(data);
            
            // Add a random background position to each card
            const cardsWithBackground = filteredCards.map(card => ({
                ...card,
                backgroundPosition: randomBackgroundPosition(),
            }));

            setAboutCards(cardsWithBackground);
        } catch (err) {
            console.log("Failed retrieving about cards: " + err);
            setError("Failed retrieving about cards: " + err);
        }
    };

    // Function to fetch and load card reviews for a specific tree_id
    const getCardReviews = async (id) => {
        try {
            const response = await fetch(`http://localhost:8081/reviews/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) {
                console.log(`Error: Failed to fetch reviews for card ID ${id}. Status: ${response.status}`);
                return [];
            }
            const data = await response.json();
            return data;
        } catch (err) {
            console.log("Error fetching reviews: ", err);
            return [];
        }
    };

    // After submitting the review, fetch and update the reviews for the specific card
    const submitReview = async (tree_id) => {
        try {
            if (!reviewFormData.description || !reviewFormData.rating || !tree_id) {
                console.log("Error: Missing review details or tree_id.");
                return;
            }
    
            // Add tree_id to the reviewFormData
            const reviewData = { ...reviewFormData, tree_id };
    
            console.log(reviewData);
            const response = await fetch("http://localhost:8081/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reviewData),
            });
    
            if (!response.ok) {
                console.log("Error submitting review");
                return;
            }
    
            const data = await response.json();
            console.log("Review submitted successfully: ", data);
            alert("Review submitted successfully!");
            
            // Now toggle the "More Info" section on to immediately display the new review
            toggleMoreInfo(tree_id);
            setReviewFormData((prev) => ({
                ...prev,
                tree_id: null,
                description: "",
                rating: "",
            }));
    
            // Reset form
            setReviewFormData({ description: "", rating: "", tree_id: null });
        } catch (err) {
            console.log("Error submitting review: ", err);
        }
    };
      

    // Toggle the More Info section to load and show reviews
    const toggleMoreInfo = async (id) => {
        if (selectedCardReviews[id]) {
            // If reviews are already loaded, remove them to toggle off
            setSelectedCardReviews((prev) => {
                const updatedReviews = { ...prev };
                delete updatedReviews[id];
                return updatedReviews;
            });
        } else {
            // Otherwise, fetch and display reviews
            const reviews = await getCardReviews(id);
            setSelectedCardReviews((prev) => ({
                ...prev,
                [id]: reviews,
            }));
        }
    };

    const toggleMoreInfoState = async (id, state) => {
        if (selectedCardReviews[id] && !state) {
            // Review is loaded and state is false, unload
            setSelectedCardReviews((prev) => {
                const updatedReviews = { ...prev };
                delete updatedReviews[id];
                return updatedReviews;
            });
        } else if (state) {
            // Otherwise, fetch and display reviews
            const reviews = await getCardReviews(id);
            setSelectedCardReviews((prev) => ({
                ...prev,
                [id]: reviews,
            }));
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
                        onChange={(e) =>
                            setFilters((prevFilters) => ({
                                ...prevFilters,
                                searchFilter: e.target.value,
                            }))
                        }
                    />
                    <button
                        id="searchButton"
                        className="search-button"
                        onClick={getAboutCards}
                    >
                        Search
                    </button>
                </div>

                <div className="album py-5">
                    <div id="row" className="card-container">
                        {aboutCards.map((card, index) => (
                            <div
                                key={index} 
                                className={`row card shadow-sm align-items-center ${
                                    index % 2 === 0 ? "flex-row-reverse" : "flex-row"
                                }`}
                                style={{
                                    backgroundPosition: card.backgroundPosition,
                                    marginBottom: "20px",
                                }}
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
                                        <div
                                            className="review-buttons"
                                            style={{
                                                display: "flex",
                                                justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
                                                marginTop: "10px",
                                            }}
                                        >
                                            <button
                                                className="leave-review btn btn-primary me-2"
                                                onClick={() => {
                                                    toggleMoreInfo(card.id);
                                                    setReviewFormData((prev) => ({
                                                        ...prev,
                                                        tree_id: null,
                                                        description: "",
                                                        rating: "",
                                                    }));
                                                }}
                                            >
                                                More Info
                                            </button>
                                            <button
                                                className="leave-review btn btn-secondary"
                                                onClick={() => {
                                                    toggleMoreInfoState(card.id, false);
                                                    setReviewFormData((prev) =>
                                                        prev.tree_id === card.id
                                                            ? { description: "", rating: "", tree_id: null }
                                                            : { description: "", rating: "", tree_id: card.id }
                                                    );
                                                }}
                                            >
                                                Leave Review
                                            </button>
                                        </div>
                                        {/* Reviews Section */}
                                        {selectedCardReviews[card.id] && (
                                            <div className="reviews-section">
                                                <h6 className="reviews-heading">Reviews:</h6>
                                                <div className="reviews-container">
                                                    <div className="reviews-box">
                                                        {selectedCardReviews[card.id].map((review, i) => (
                                                            <div key={i} className="review-item">
                                                                <div className="review-content">
                                                                    <p className="review-description">{review.description}</p>
                                                                    <div className="review-rating">
                                                                        <strong>Rating:</strong> {review.rating} / 10
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Leave Review Form */}
                                        {reviewFormData.tree_id === card.id && (
                                            <div className="leave-review-form">
                                                <h5 className="form-title">Leave a Review</h5>
                                                
                                                <div className="form-group">
                                                    <textarea
                                                        className="form-control"
                                                        value={reviewFormData.description}
                                                        onChange={(e) =>
                                                            setReviewFormData((prev) => ({
                                                                ...prev,
                                                                description: e.target.value,
                                                            }))
                                                        }
                                                        placeholder="Write your review..."
                                                        rows="4"
                                                    />
                                                </div>
                                            
                                                <div className="form-group">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={reviewFormData.rating}
                                                        onChange={(e) =>
                                                            setReviewFormData((prev) => ({
                                                                ...prev,
                                                                rating: e.target.value,
                                                            }))
                                                        }
                                                        placeholder="Rating (1-10)"
                                                        min="1"
                                                        max="10"
                                                    />
                                                </div>
                                            
                                                <div className="form-group">
                                                <button
                                                    onClick={() => submitReview(card.id)} // Pass card.id here
                                                    className="btn btn-success btn-submit"
                                                >
                                                    Submit Review
                                                </button>

                                                </div>
                                            </div>
                                        )}
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
