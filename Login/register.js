const formEl = document.querySelector("#registerForm");

formEl.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const profile = Object.fromEntries(formData.entries());
    console.log("profile", profile);
    const message = document.querySelector("#reg-message");

    try {
        const response = await register(profile);
        message.innerHTML = "Registration is successful";
        console.log(response);
        event.target.reset(); // Reset the form
    } catch (error) {
        message.innerHTML = error.message; // Display error message
        console.error(error);
    }
});

async function register(profile) {
    const registerURL = `https://api.noroff.dev/api/v1/auction/auth/register`;
    const body = JSON.stringify(profile);

    const response = await fetch(registerURL, {
        headers: {
            "Content-Type": "application/json",
        },
        method: 'POST', // Set the method to POST
        body,
    });

    if (response.ok) {
        const result = await response.json();
        return result;
    } else {
        const errorText = await response.text(); // Get the error message from the response
        throw new Error(errorText || "Registration failed");
    }
}

