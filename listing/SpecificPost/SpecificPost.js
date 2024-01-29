// SpecificPost.js (JavaScript for SpecificPost.html)

window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const listingId = urlParams.get('listingId');
    fetchListingDetails(listingId);
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

    // Populate seller information
    const sellerInfo = document.getElementById('sellerInfo');
    sellerInfo.innerHTML = `
        <p>Name: ${listing.seller.name}</p>
        <p>Email: ${listing.seller.email}</p>
        <img src="${listing.seller.avatar}" alt="Seller Avatar" style="max-height: 100px;">
    `;

    // Populate bids list
    const reversedBids = [...listing.bids].reverse(); // Create a copy of the array and reverse it
    const bidsList = document.getElementById('bidsList');
    bidsList.innerHTML = reversedBids.map((bid, index) => {
        let bidInfoHtml = `
            <div class="list-group-item${index === 0 ? ' bg-success text-white' : ''}">
                <p>Bid Amount: $${bid.amount}</p>
                <p>Bidder Name: ${bid.bidderName}</p>
                <p>Bid Date: ${new Date(bid.created).toLocaleDateString()}</p>
            </div>
        `;
        return bidInfoHtml;
    }).join('');
}


