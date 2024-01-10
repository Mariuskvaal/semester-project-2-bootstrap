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
      return response.json();
    } else {
      throw new Error("Failed to fetch profile");
    }
  })
  .then(profileData => {
    // Create a container for the profile data
    let profileContainer = document.createElement('div');
    profileContainer.classList.add('profile-container');

    // Add the formatted profile data
    let profileHTML = `
    <ul class="list-group">
    <li class="list-group-item"><strong>Name:</strong> ${profileData.name}</li>
    <li class="list-group-item"><strong>Email:</strong> ${profileData.email}</li>
    <li class="list-group-item"><strong>Credits:</strong> ${profileData.credits}</li>
    <li class="list-group-item"><strong>Listings:</strong> ${profileData._count.listings}</li>
    <li class="list-group-item"><strong>Avatar:</strong> ${profileData.avatar ? `<img src="${profileData.avatar}" alt="Avatar" style="max-width:100px; height:auto;">` : 'No avatar'}</li>
    <li class="list-group-item"><strong>Wins:</strong> ${profileData.wins && profileData.wins.length > 0 ? profileData.wins.join(', ') : 'No wins'}</li>
  </ul>
    `;

    // Set the inner HTML of the profile container
    profileContainer.innerHTML = profileHTML;

    // Append the profile container to the 'profile' element
    document.getElementById('profile').innerHTML = '';
    document.getElementById('profile').appendChild(profileContainer);
  })
  .catch(error => {
    console.error(error);
    alert("An error occurred while fetching the profile.");
  });
}

getUserProfile();


  