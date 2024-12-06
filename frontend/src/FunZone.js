import react from 'react'

const FunZone = ({ cards, setCards }) => {

    function getAboutCards(){
        fetch("data.json")
        .then(response => response.json())
        .then(aboutCards => loadCards(aboutCards.aboutCards))
        .catch(err => console.log("Error :"+err));
    }
    
    // The file containing the information for this tree is heading.json
    // loads the data and puts it under the inputted cardElement as childs
    function getCardReviews(cardElement, heading){
        fetch(`./Data/${heading}.json`)
        .then(response => response.json())
        .then(aboutCards => loadReviewsForElement(cardElement, aboutCards.reviews))
        .catch(err => console.log("Error :"+err));
    }
    
    function loadReviewsForElement(cardElement, reviews) {
        cardElement.innerHTML = ''; // Remove what is present to repopulate list
        for (let i = 0; i < reviews.length; i++) {
            let description = reviews[i].description;
            let rating = reviews[i].rating;
            // construct the HTML element
            let addCardReview = document.createElement("div");
    
            // AddCardMovie.addEventListener("click", function (){
            //     document.body.style.backgroundColor = colorAssociation;
            // });
            addCardReview.innerHTML = `
                <div class="review-container">
                    <div class="card-body">
                        <h5 class="card-title">Student Review</h5>
                        <p class="card-text">${description}</p>
                        <p class="card-text">Rating: ${rating}</p>
                    </div>
                </div>
            `;
    
            if(i == reviews.length - 1){
                addCardReview.style.marginBottom = '100px';
            }
            cardElement.appendChild(addCardReview);
        }
    }
    
    
    function loadCards(aboutCards){
        console.log("About Cards Loaded: \n" + aboutCards);
        // Filter elements
        aboutCards = filterCards(aboutCards);
        var divList = document.getElementById("row");
        divList.innerHTML = "";
    
        for (let i = 0; i < aboutCards.length; i++) {
            let heading = aboutCards[i].heading;
            let description = aboutCards[i].description;
            let imageURL = aboutCards[i].imageURL;
            let imageAlt = aboutCards[i].alt;
    
            // construct the HTML element
            let addAboutCard = document.createElement("div");
    
            // AddCardMovie.addEventListener("click", function (){
            //     document.body.style.backgroundColor = colorAssociation;
            // });
            addAboutCard.classList.add("col", "card", "shadow-sm", "d-flex", "flex-row", "align-items-center", "nature-texture-background");
            addAboutCard.style.backgroundPosition = randomBackgroundPosition(); // random frame of image to avoid repetative look
            if(i % 2 == 0){
                addAboutCard.innerHTML = `
                <div>
                    <div class="card-container">
                        <div class="p-2">
                            <img src="${imageURL}" class="rounded-circle picture-Border" alt="${imageAlt}">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${heading}</h5>
                            <p class="card-text">${description}</p>
                            <div class="review-form" style="display: none; margin-top: 10px;">
                                <textarea class="review-text" rows="3" placeholder="Write your review..."></textarea>
                                <button class="submit-review">Submit Review</button>
                                <button class="cancel-review">Cancel</button>
                            </div>
                            <div class="leave-review-right" style="display: flex;">
                                <button class="leave-review" id="more-info">More Info</button>
                                <button class="leave-review" id="leave-review">Leave Review</button>
                            </div>
                        </div>
                    </div>
                    <div id="infoModal">
    
                    </div>
                </div>
                `;
            }else{
                addAboutCard.innerHTML = `
                <div>
                    <div class="card-container">
                        <div class="card-body">
                            <h5 class="card-title">${heading}</h5>
                            <p class="card-text">${description}</p>
                            <div class="review-form" style="display: none; margin-top: 10px;">
                                <textarea class="review-text" rows="3" placeholder="Write your review..."></textarea>
                                <button class="submit-review">Submit Review</button>
                                <button class="cancel-review">Cancel</button>
                            </div>
                            <div class="leave-review-left" style="display: flex;">
                                <button class="leave-review" id="more-info">More Info</button>
                                <button class="leave-review" id="leave-review">Leave Review</button>
                            </div>
                        </div>
                        <div class="p-2">
                            <img src="${imageURL}" class="rounded-circle  picture-Border" alt="tree">
                        </div>
                    </div>
                    <div id="infoModal">
    
                    </div>
                </div>
                `;
            }
    
            divList.appendChild(addAboutCard);
    
            // Event listener for when the leave review button is clicked
            const leaveReviewBtn = addAboutCard.querySelector('#leave-review'); // Get The Button
            const moreInfoBtn = addAboutCard.querySelector('#more-info'); // Get The Button
            leaveReviewBtn.addEventListener('click', function() {
                leaveReviewBtn.style.display = 'none'; // Hitting leave review makes leave review button no longer visible
                moreInfoBtn.style.display = 'none';
                reviewTextArea.style.display = 'none';
                const reviewForm = addAboutCard.querySelector('.review-form'); // Get The Review form for this specific card
                reviewForm.style.display = reviewForm.style.display === 'none' ? 'block' : 'none'; // Toggle the review form, enable or disable
            });
    
            const reviewTextArea = addAboutCard.querySelector("#infoModal");
            reviewTextArea.style.display = 'none';
            moreInfoBtn.addEventListener('click', function() {
                if(reviewTextArea.style.display == 'none'){
                    reviewTextArea.style.display = 'block';
                    getCardReviews(reviewTextArea, heading);
                }else{
                    reviewTextArea.style.display = 'none';
                }
            })
    
            // Event listener for the button that submits this reviwe
            const submitReviewBtn = addAboutCard.querySelector('.submit-review'); // Get the Submit review button from within the form of the card
            if (submitReviewBtn) {
                submitReviewBtn.addEventListener('click', function() {
                    leaveReviewBtn.style.display = 'block'; // Now the review button should come back
                    moreInfoBtn.style.display = 'block';
                    const reviewText = addAboutCard.querySelector('.review-text').value; // Get the Text from the review form
                    // Reset the Review Form
                    addAboutCard.querySelector('.review-text').value = '';
                    addAboutCard.querySelector('.review-form').style.display = 'none';
    
                    if(reviewText == ""){
                        alert("Cannot Leave Empty Review!");
                        return;
                    }
                    console.log('Review submitted:', reviewText); // Log the review
    
                    // Save to a JSON file, I haven't made it here yet
                });
            }
            const cancelReviewButton = addAboutCard.querySelector('.cancel-review');
            cancelReviewButton.addEventListener('click', function() {
                leaveReviewBtn.style.display = 'block';
                moreInfoBtn.style.display = 'block';
                addAboutCard.querySelector('.review-form').style.display = 'none';
            });
        }
    }
    
    // Creates random background position, works in 0-100% which is why there is * 100 and  adds a % after the number
    // Percents work like this: origin, or start, 10% from the left of the image and 20% from the top of the image for example
    function randomBackgroundPosition(){
        const randomX = Math.floor(Math.random() * 100);
        const randomY = Math.floor(Math.random() * 100);
        return `${randomX}% ${randomY}%`;
    }
    
    // Filter cards based on current filter variables
    function filterCards(cards){
    
        for (let i = cards.length - 1; i >= 0; i--) {
            let card = cards[i];
            if (!card || !card.heading || !card.description || !card.alt) {
                console.error("Card or properties are undefined at index " + i);
                continue; // Skip this iteration if card or its properties are undefined
            }
    
            let heading = card.heading.toLowerCase();
            let description = card.description.toLowerCase();
            let imageAlt = card.alt.toLowerCase();
    
            // If the search filter is not found in any, remove the element
            if(!(heading.includes(filters.searchFilter)
                || description.includes(filters.searchFilter)
                || imageAlt.includes(filters.searchFilter))){
                    cards.splice(i,1); // remove the element
            }
    
        }
        return cards;
    }
    
    function addFilterEventHandlers(){
        const searchInput = document.getElementById("searchBar");
        const searchButton = document.getElementById("searchButton");
    
        // Get the search filter
        searchButton.addEventListener('click', () => {
            filters.searchFilter = searchInput.value.toLowerCase(); // Set the search filter
            getAboutCards();
        })
    }
    
    let filters = {
        "searchFilter": ""
    }
    
    addFilterEventHandlers();
    console.log("JS Loaded\n\n");
    window.onload = getAboutCards;

    return (
        <body>
            <header id="heading">
                <nav class="headNav" id="headNavElem">
                    <button id="toggleNav" class="hamburger">
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    </button>
                    <ul id="navItems">
                        <li><a href="./index.html">Home</a></li>
                        <li><a href="./getInvolved.html">Get Involved</a></li>
                        <li><a href="./funzone.html" class="currentPageIcon">Fun Zone</a></li>
                        <li><a href="./about.html">Contact</a></li>
                    </ul>
                </nav>
            </header>
            <main>
            <section>
                <div class="title-heading">
                <img src="./images/logo.jpg" class="rounded-circle logo" alt="clubLogo"/>
                <h1 class="page-title">Tree Climbing Club</h1>
                </div>
            </section>

            <div class="search-container">
                <input type="text" id="searchBar" class="search-input inputEntry form-control" placeholder="Filter By..." />
                <button id="searchButton" class="search-button">Search</button>
            </div>

            <div class="album py-5">
                <div class="card-container">
                    <div id="row">
                    </div>
                </div>
            </div>
            </main>

            <footer class="text-body-secondary py-3">
            <div class="container">
                <nav>
                <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                    <li><a href="./index.html">About</a></li>
                    <li><a href="./getInvolved.html">Get Involved</a></li>
                    <li><a href="./funzone.html">Fun Zone</a></li>
                    <li><a href="./about.html">Contact</a></li>
                </ul>
                </nav>
                <footer>
                <p>Follow us at:</p>
                <a href="https://www.facebook.com" target="_blank"><i class="fab fa-facebook-f"></i></a>
                <a href="https://www.instagram.com" target="_blank"><i class="fab fa-instagram"></i></a>
                <a href="https://x.com" target="_blank"><i class="fab fa-twitter"></i></a>
                </footer>
            </div>
            </footer>
        </body>
    )
}

export default FunZone;