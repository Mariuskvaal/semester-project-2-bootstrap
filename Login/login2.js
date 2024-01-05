const formEl = document.querySelector("#loginForm");

formEl.addEventListener("submit", event => {
    event.preventDefault();

    const formData = new FormData(formEl);
    const data = object.fromEntries(formData);

    fetch('https://api.noroff.dev/api/v1/auction/auth/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
})
