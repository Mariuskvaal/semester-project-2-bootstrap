// SpecificPost.js (JavaScript for SpecificPost.html)


const unLoggedMessage = document.querySelector("#messageBoxHtml");


window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const listingId = urlParams.get('listingId');
    fetchListingDetails(listingId);

    document.getElementById("bidForm").addEventListener('submit', function(event) {
        event.preventDefault();
        if (isLoggedIn()) {
            submitBid(listingId);
        } else {
            unLoggedMessage.innerHTML = "Must be logged in to make a bid";
        }
    });
});

function fetchListingDetails(listingId) {
    fetch(`https://api.noroff.dev/api/v1/auction/listings/${listingId}?_seller=true&_bids=true`)
        .then(response => response.json())
        .then(data => {
            displayListingDetails(data);
        })
        .catch(error => console.error('Error:', error));
}

function displayListingDetails(listing) {
    document.getElementById('title').innerText = listing.title;
    document.getElementById('image').src = listing.media.length > 0 ? listing.media[0] : 'default-image-path.jpg';
    document.getElementById('description').innerText = listing.description;
    document.getElementById('tags').innerText = listing.tags.join(', ');
    document.getElementById('created').innerText = new Date(listing.created).toLocaleDateString();
    document.getElementById('updated').innerText = new Date(listing.updated).toLocaleDateString();
    document.getElementById('endsAt').innerText = new Date(listing.endsAt).toLocaleDateString();
    document.getElementById('bidsCount').innerText = listing._count.bids;

    const sellerInfo = document.getElementById('sellerInfo');
    sellerInfo.innerHTML = `
        <p>Name: ${listing.seller.name}</p>
        <p>Email: ${listing.seller.email}</p>
        <img src="${listing.seller.avatar}" alt="Seller Avatar" style="max-height: 100px;">
    `;

    if (isLoggedIn()) {
        populateBidsList(listing.bids);
    } else {
        document.getElementById('bidsList').innerHTML = '<li class="list-group-item">You must be logged in to view the bids.</li>';
    }
}

function populateBidsList(bids) {
    const reversedBids = [...bids].reverse();
    const bidsList = document.getElementById('bidsList');
    bidsList.innerHTML = reversedBids.map((bid, index) => `
        <div class="list-group-item${index === 0 ? ' bg-success text-white' : ''}">
            <p>Bid Amount: $${bid.amount}</p>
            <p>Bidder Name: ${bid.bidderName}</p>
            <p>Bid Date: ${new Date(bid.created).toLocaleDateString()}</p>
        </div>
    `).join('');
}

function isLoggedIn() {
    return Boolean(localStorage.getItem('accessToken'));
}

function submitBid(listingId) {
    const bidAmount = document.getElementById('bidAmount').value;
    const accessToken = localStorage.getItem('accessToken');

    fetch(`https://api.noroff.dev/api/v1/auction/listings/${listingId}/bids`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ amount: Number(bidAmount) })
    })
    .then(response => {
        if (response.ok) {
            return response.json().then(data => {
                unLoggedMessage.innerHTML = " Bid was an success";
                unLoggedMessage.style.display = 'block';
                unLoggedMessage.style.color = "#4F8A10";
                unLoggedMessage.style.background = "#DFF2BF";
            });
        } else {
            return response.json().then(data => {
                console.error('Failed to submit bid:', data);
                console.error(data.errors[0].message);
                const responseMessageWithError = data.errors[0].message;
                unLoggedMessage.innerHTML = responseMessageWithError;
                unLoggedMessage.style.display = 'block';

            }).catch(error => {
                // Handling JSON parsing error or other errors gracefully
                console.error('Error processing response:', error);
                displayMessage('Error processing response. Please try again.', 'error');
            });
        }
    })
    .catch(error => {
        console.error('Error submitting bid:', error);
        displayMessage('An error occurred. Please try again.', 'error');
    });
    

function displayMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;

    // Add class based on the type for styling
    messageElement.className = type === 'success' ? 'alert alert-success' : 'alert alert-danger';

    // Append message to a specific element or the body
    document.body.appendChild(messageElement);

    // Optionally, remove the message after a delay
    setTimeout(() => {
        document.body.removeChild(messageElement);
    }, 3000); // Adjust time as needed
}


function displayLoginMessage() {

    document.querySelector(".loginMessage").innerText = "You must be logged in to make a bid";
}
}


function bidMessageManual() {
    const messageElementForBid = document.querySelector("#bidMessageManual");
    messageElementForBid.innerText = data.errors[0].message;
}
