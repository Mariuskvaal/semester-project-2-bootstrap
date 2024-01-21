window.addEventListener('load', function() {
    fetch('https://api.noroff.dev/api/v1/auction/listings')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
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
});


function displayListings(listings) {
    const container = document.getElementById('listingsContainer');
    container.innerHTML = ''; // Clear existing data

    listings.forEach(listing => {
        const card = document.createElement('div');
        card.className = 'card mb-4 shadow-sm'; // Bootstrap card with shadow

        // Generate comma-separated tags string
        const tagsString = listing.tags.join(', ');

        // Generate media images (considering only the first image for Instagram-like layout)
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
        container.appendChild(card);
    });
}


