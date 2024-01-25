function fetchListings(page) {
    const offset = page * listingsPerPage;

    // Retrieve the token from localStorage
    const token = localStorage.getItem("accessToken"); // Replace "accessToken" with the actual key used in your localStorage

    // Check if the token is available
    if (!token) {
        console.error("Access token not found in localStorage.");
        return;
    }

    fetch(`https://api.noroff.dev/api/v1/auction/listings?limit=${listingsPerPage}&offset=${offset}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, // Use the retrieved token
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        displayListings(data);
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
}

// Rest of your code remains the same






let currentPage = 0;
const listingsPerPage = 10;

window.addEventListener('load', function() {
    fetchListings(currentPage);
});

function fetchListings(page) {
    const offset = page * listingsPerPage;
    fetch(`https://api.noroff.dev/api/v1/auction/listings?limit=${listingsPerPage}&offset=${offset}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        displayListings(data);
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
}

function displayListings(listings) {
    const container = document.getElementById('listingsContainer');
    container.innerHTML = ''; // Clear existing data

    listings.forEach(listing => {
        const card = document.createElement('div');
        card.className = 'card mb-4 shadow-sm'; // Bootstrap card with shadow

        // Generate comma-separated tags string
        const tagsString = listing.tags.join(', ');

        // Generate media images
        const mediaImage = listing.media.length > 0 ? `<img src="${listing.media[0]}" class="card-img-top" alt="Listing Image" style="max-height:400px;">` : '';

        // Generate bids information
        let bidsInfo = '';
        if (listing.bids && listing.bids.length > 0) {
            bidsInfo = '<ul>';
            listing.bids.forEach(bid => {
                bidsInfo += `<li>${bid.bidderName}: $${bid.amount}</li>`;
            });
            bidsInfo += '</ul>';
        } else {
            bidsInfo = '<p>No bids yet</p>';
        }

        card.innerHTML = `
            ${mediaImage}
            <div class="card-body">
                <h5 class="card-title">${listing.title}</h5>
                <p class="card-text">${listing.description}</p>
                <p class="card-text"><small class="text-muted">Tags: ${tagsString}</small></p>
                <p class="card-text"><small class="text-muted">Created: ${new Date(listing.created).toLocaleDateString()}</small></p>
                <p class="card-text"><small class="text-muted">Updated: ${new Date(listing.updated).toLocaleDateString()}</small></p>
                <p class="card-text"><small class="text-muted">Ends At: ${new Date(listing.endsAt).toLocaleDateString()}</small></p>
                <p class="card-text"><small class="text-muted">Bids: ${listing._count.bids}</small></p>
                <div class="bids-info">${bidsInfo}</div>
            </div>
        `;
        container.appendChild(card);
    });
    updatePageInfo();
}

    updatePageInfo();

function updatePageInfo() {
    const startNumber = currentPage * listingsPerPage + 1;
    const endNumber = startNumber + listingsPerPage - 1;
    const pageInfo = `Page ${currentPage + 1} - Listings ${startNumber}-${endNumber}`;
    document.getElementById('pageInfo').innerText = pageInfo;
}

// Event listeners for pagination buttons
document.getElementById('prevPage').addEventListener('click', function() {
    if (currentPage > 0) {
        currentPage--;
        fetchListings(currentPage);
    }
});

document.getElementById('nextPage').addEventListener('click', function() {
    currentPage++;
    fetchListings(currentPage);
});

// Search function to filter listings
function searchListings(term) {
    fetch('https://api.noroff.dev/api/v1/auction/listings')
    .then(response => response.json())
    .then(data => {
        // Filter listings based on the search term
        const filteredListings = data.filter(listing => 
            listing.title.toLowerCase().includes(term.toLowerCase()) ||
            listing.description.toLowerCase().includes(term.toLowerCase())
        );
        displayListings(filteredListings);
    })
    .catch(error => console.error('Error:', error));
}

// Event listener for search button or search input field
document.getElementById('searchButton').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchInput').value;
    searchListings(searchTerm);
});



