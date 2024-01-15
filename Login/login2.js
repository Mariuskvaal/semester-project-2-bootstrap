document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = loginForm.email.value;
        const password = loginForm.password.value;

        const userData = {
            email: email,
            password: password
        };

        loginUser(`https://api.noroff.dev/api/v1/auction/auth/login`, userData);
    });
});

async function loginUser(url, data) {
  try {
    // Clear any existing user data in localStorage
    localStorage.clear();

    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, postData);
    const json = await response.json();
    console.log("Login response", json);

    // Check if login was successful
    if (response.ok && json.accessToken) {
      // Set the new access token
      localStorage.setItem('accessToken', json.accessToken);

      // Store the entire response object (or the parts you need) in localStorage
      // Adjust this according to your requirements
      localStorage.setItem('user', JSON.stringify(json));

      // Redirect to the new page
      window.location.href = '/profile/profile.html';
    } else {
      // Handle login failure
      console.log('Login failed: ', json);
      document.getElementById('message').textContent = 'Login failed: ' + (json.message || 'Unknown error');
    }
  } catch (error) {
    console.log(error);
    document.getElementById('message').textContent = 'Error: ' + error.message;
  }
}
