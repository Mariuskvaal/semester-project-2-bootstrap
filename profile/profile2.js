// Retrieve the 'user' data from localStorage and parse it as JSON
const storedUserData = localStorage.getItem('user');
const userData = storedUserData ? JSON.parse(storedUserData) : {};
const userName = userData.name; // Assuming the name is stored in this property

console.log(userName);

// Retrieve the token from localStorage
const token = localStorage.getItem("accessToken"); // Replace "accessToken" with the actual key used in your localStorage

// Check if the user name is available
if (!userName) {
    console.error("User name not found in localStorage.");
} else {
    // Function to call the API endpoint to get the profile of the logged-in user
    fetch(`https://api.noroff.dev/api/v1/auction/profiles/${encodeURIComponent(userName)}`, { // URL encoding the userName for safety
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
        // Process and display the data as HTML
        displayDataAsHtml(data);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}

function displayDataAsHtml(data) {
    // Start building the HTML content with a table
    let htmlContent = `<div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <table class="table table-bordered">
                    <tbody>
                        <tr><th>Name</th><td>${data.name}</td></tr>
                        <tr><th>Email</th><td>${data.email}</td></tr>
                        <tr><th>Avatar</th><td>${data.avatar ? `<img src="${data.avatar}" alt="Avatar" class="img-fluid" style="max-width:100px; max-height:100px;">` : 'N/A'}</td></tr>
                        <tr><th>Credits</th><td>${data.credits}</td></tr>
                        <tr><th>Wins</th><td>${data.wins.length > 0 ? data.wins.join(", ") : 'No wins'}</td></tr>
                        <tr><th>Listings Count</th><td>${data._count.listings}</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>`;

    document.getElementById('profileContainer').innerHTML = htmlContent;
}



