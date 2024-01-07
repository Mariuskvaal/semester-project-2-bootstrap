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
    const postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    const accessToken = json.accessToken;
    localStorage.setItem('accessToken', accessToken);
    console.log(json);
    // Logs:
    // accessToken: "eyJhbGciOiJIuzI1NiIsInR...
    // avatar: ""
    // email: "test-account-a@noroff.no
    // name: "test_account_a"
    return json;
  } catch (error) {
    console.log(error);
  }
}

