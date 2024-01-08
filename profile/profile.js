// Retrieve the 'user' data from localStorage and parse it as JSON
const storedUserData = localStorage.getItem('user');
const userData = storedUserData ? JSON.parse(storedUserData) : {};
const userDataName = userData.name;

console.log(userDataName);

// Retrieve the token from localStorage
const token = localStorage.getItem("accessToken"); // Replace "accessToken" with the actual key used in your localStorage

// Function to call the API endpoint to get the user's profile
function getUserProfile() {
  fetch(`https://api.noroff.dev/api/v1/auction/profiles/${encodeURIComponent(userDataName)}`, {
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
      throw new Error("Failed to fetch profile");
    }
  })
  .then(profileData => {
    // Display the profile data in the element with ID 'profile'
    document.getElementById('profile').innerHTML = JSON.stringify(profileData, null, 2);
  })
  .catch(error => {
    console.error(error);
    alert("An error occurred while fetching the profile.");
  });
}

getUserProfile();


  