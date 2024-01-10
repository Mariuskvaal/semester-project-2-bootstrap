const token = localStorage.getItem("accessToken");

// Function to call the API endpoint to get all listings for the profile
function showAllListingsForProfile() {
    fetch('https://api.noroff.dev/api/v1/auction/profiles', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json(); // Assuming the response is in JSON format
      } else {
        throw new Error("Failed to fetch listings");
      }
    })

    console.log(response);
    .then(listingsData => {
      // Create a container for the listings
      let listingsContainer = document.createElement('div');
      listingsContainer.id = 'listings';
      listingsContainer.innerHTML = '<h3>Listings:</h3>' + JSON.stringify(listingsData, null, 2);
  
      // Append the container below the button
      document.querySelector('.d-flex.justify-content-center').after(listingsContainer);
    })
    .catch(error => {
      console.error(error);
      alert("An error occurred while fetching the listings.");
    });
  }
  