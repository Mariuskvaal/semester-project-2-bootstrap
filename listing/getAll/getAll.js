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
        card.style.cursor = 'pointer'; // Change cursor on hover

        // Sample redirect URL, replace with actual URL from listing if available
        const redirectUrl = `/listing/SpecificPost/SpecificPost.html?listingId=${listing.id}`;

        console.log(`Listing ID: ${listing.id}`); // Add this line to debug


        // Generate comma-separated tags string
        const tagsString = listing.tags.join(', ');

        // Generate media images
        const mediaImage = listing.media.length > 0 ? `<img src="${listing.media[0]}" class="card-img-top" alt="Listing Image" style="max-height:400px;">` : '';

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
            </div>
        `;

        // Add click event listener for redirect
        card.addEventListener('click', function() {
            window.location.href = redirectUrl;
        });

        container.appendChild(card);
    });

    updatePageInfo();
}

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



