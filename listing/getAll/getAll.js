let currentPage = 0;
const listingsPerPage = 10;

window.addEventListener('load', function() {
    fetchListings(currentPage);

    document.getElementById('sortOldest').addEventListener('click', function() {
        fetchListings(currentPage, false); // false for oldest to newest by creation date
    });

    document.getElementById('sortNewest').addEventListener('click', function() {
        fetchListings(currentPage, true); // true for newest to oldest by creation date
    });

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

    document.getElementById('searchButton').addEventListener('click', function() {
        const searchTerm = document.getElementById('searchInput').value;
        searchListings(searchTerm);
    });
});

function fetchListings(page, sortField = 'created', sortOrder = 'asc') {
    const offset = page * listingsPerPage;
    const sortQueryParam = `&sort=${sortField}&sortOrder=${sortOrder}`;

    fetch(`https://api.noroff.dev/api/v1/auction/listings?limit=${listingsPerPage}&offset=${offset}${sortQueryParam}`)
        .then(response => response.json())
        .then(data => {
            displayListings(data);
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
}

// Update event listeners for sorting buttons
document.getElementById('sortOldest').addEventListener('click', function() {
    fetchListings(currentPage, 'created', 'asc');
});

document.getElementById('sortNewest').addEventListener('click', function() {
    fetchListings(currentPage, 'created', 'desc');
});


function displayListings(listings, sortNewestFirst = false) {
    const sortedListings = sortNewestFirst ? sortListingsNewestToOldest(listings) : sortListingsOldestToNewest(listings);
    const container = document.getElementById('listingsContainer');
    container.innerHTML = ''; // Clear existing data

    sortedListings.forEach(listing => {
        console.log(listing.created);
        const card = document.createElement('div');
        card.className = 'card mb-4 shadow-sm';
        card.style.cursor = 'pointer';

        const redirectUrl = `/listing/SpecificPost/SpecificPost.html?listingId=${listing.id}`;

        const tagsString = listing.tags.join(', ');
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

        card.addEventListener('click', function() {
            window.location.href = redirectUrl;
        });

        container.appendChild(card);
    });

    updatePageInfo();
}

function sortListingsOldestToNewest(listings) {
    return listings.sort((a, b) => {
        console.log(`Comparing ${a.created} to ${b.created}`);
        return new Date(a.created) - new Date(b.created);
    });
}

function sortListingsNewestToOldest(listings) {
    return listings.sort((a, b) => {
        console.log(`Comparing ${b.created} to ${a.created}`);
        return new Date(b.created) - new Date(a.created);
    });
}


function updatePageInfo() {
    const startNumber = currentPage * listingsPerPage + 1;
    const endNumber = startNumber + listingsPerPage - 1;
    const pageInfo = `Page ${currentPage + 1} - Listings ${startNumber}-${endNumber}`;
    document.getElementById('pageInfo').innerText = pageInfo;
}

function searchListings(term) {
    fetch('https://api.noroff.dev/api/v1/auction/listings')
    .then(response => response.json())
    .then(data => {
        const filteredListings = data.filter(listing => 
            listing.title.toLowerCase().includes(term.toLowerCase()) ||
            listing.description.toLowerCase().includes(term.toLowerCase())
        );
        displayListings(filteredListings);
    })
    .catch(error => console.error('Error:', error));
}
