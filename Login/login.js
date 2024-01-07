const formEl = document.querySelector("#loginForm");

formEl.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const credentials = Object.fromEntries(formData.entries());
    console.log("credentials", credentials);
    const message = document.querySelector("#login-message");

    try {
        const response = await login(credentials);
        message.innerHTML = "Login is successful";
        console.log(response);
        // You may want to redirect the user or perform some action on successful login
    } catch (error) {
        message.innerHTML = error.message; // Display error message
        console.error(error);
    }
});

async function login(credentials) {
    const loginURL = `https://api.noroff.dev/api/v1/auction/auth/login`;
    const body = JSON.stringify(credentials);

    const response = await fetch(loginURL, {
        headers: {
            "Content-Type": "application/json",
        },
        method: 'POST', // Set the method to POST
        body,
    });

    console.log(response.accesstoken);

    if (response.ok) {
        const result = await response.json();
        return result;
    } else {
        const errorText = await response.text(); // Get the error message from the response
        throw new Error(errorText || "Login failed");
    }
}




