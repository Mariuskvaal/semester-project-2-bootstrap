document.getElementById('submitForm').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve the token and user data from localStorage
    const token = localStorage.getItem("accessToken");
    if (!token) {
        console.error("Access token not found in localStorage.");
        return;
    }

    console.log(token);

    // Construct the data object from the form inputs
    const formData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        tags: document.getElementById('tags').value.split(',').map(tag => tag.trim()),
        media: [document.getElementById('media').value],
        endsAt: document.getElementById('endsAt').value
    };

    // API call
    fetch('https://api.noroff.dev/api/v1/auction/listings', { // Replace with your API endpoint
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`, // Use the retrieved token
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) // Convert the JavaScript object to a JSON string
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Form submitted successfully:', data);
        document.getElementById('reg-message').innerText = "Registration successful!";
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
        document.getElementById('reg-message').innerText = "Registration failed: " + error.message;
    });
});
