const formEl = document.querySelector("#loginForm");
const method = "post";
const messageEL = document.querySelector("#message");

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const profile = Object.fromEntries(formData.entries());
  await login(profile);
  //console.log (formData.get('name'));
});

async function login(profile) {
  const loginURL = `https://api.noroff.dev/api/v1/auction/auth/login`;
  const body = JSON.stringify(profile);

  const response = await fetch(loginURL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'POST', // Set the method to POST
    body,
  });

  const result = await response.json();

  if (response.ok) {
    showMessage("Login success");

    localStorage.setItem("token", result.accessToken);

    localStorage.setItem(
      "user",
      JSON.stringify({
        name: result.name,
        email: result.email,
        avatar: result.avatar,
        banner: result.banner,
      })
    );

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    console.log(token);
    console.log(user);

    // Display countdown
    let countdown = 5;
    const countdownInterval = setInterval(() => {
      showMessage(`Redirecting in ${countdown}`);
      countdown--;

      if (countdown < 0) {
        clearInterval(countdownInterval);
        window.location.href = "/posts/index.html"; // Replace with the URL of the other HTML page
      }
    }, 1000);
  } else {
    showMessage("Login Failed");
  }
}

function showMessage(message) {
  messageEL.textContent = message;
}
