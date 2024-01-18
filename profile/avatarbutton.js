// Retrieve the 'user' data from localStorage and parse it as JSON
const storedUserData = localStorage.getItem('user');
const userData = storedUserData ? JSON.parse(storedUserData) : {};
const userName = userData.name; // Assuming the name is stored in this property

// Retrieve the token from localStorage
const token = localStorage.getItem("accessToken"); // Replace "accessToken" with the actual key used in your localStorage

const updateAvatar = () => {
    // Retrieve the avatar URL from the input field
    const avatarUrl = document.querySelector('input[name="avatar"]').value;

    // Check if the user name and avatar URL are available
    if (!userName) {
        console.error("User name not found in localStorage.");
        return;
    }
    if (!avatarUrl) {
        console.error("Avatar URL is missing.");
        return;
    }

    fetch(`https://api.noroff.dev/api/v1/auction/profiles/${encodeURIComponent(userName)}/media`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`, // Use the retrieved token
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ avatar: avatarUrl }) // Include the avatar URL in the request body
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
// ... [previous code remains the same]

.then(data => {
    console.log('Avatar updated successfully:', data);

    // Show the checkmark animation
    document.querySelector("#checkmarkContainer").style.display = "block";
    document.querySelector("#successText").style.display = "block";

    // Wait for 2 seconds, then redirect
    setTimeout(() => {
        window.location.href = '/profile/profile.html';
    }, 2000);
})
.catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
});


};

// Add event listener to the submit button
document.getElementById('buttonUpdateAvatar').addEventListener('click', updateAvatar);
