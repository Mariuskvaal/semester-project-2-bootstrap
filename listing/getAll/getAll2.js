const resultsContainer = document.querySelector(".listingsContainer");

const url = "https://api.noroff.dev/api/v1/auction/listings";

async function getAllListings() {
    try {
        const response = await fetch(url);
        const json = await response.json();

        console.log(json);

    }

    catch(error) {
        console.log(error);
    }
}

