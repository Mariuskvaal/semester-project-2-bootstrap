async function loginUser(email, password) {
    // Endpoint URL
    const url = 'https://api.noroff.dev/api/v1/auction/auth/login';

    // Form data
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
        // Make the POST request
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        // Check if the request was successful
        if (response.ok) {
            console.log('Login successful');
            // Handle successful login here (e.g., redirect to another page)
        } else {
            console.error('Login failed');
            // Handle login failure here (e.g., show error message)
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
}

// Example usage
// loginUser('user@example.com', 'password123');
