document.addEventListener("DOMContentLoaded", function() {
    var user = localStorage.getItem("user");

    if (user) {
        var loginLink = document.querySelector("#loginLink");
        loginLink.textContent = "My Profile";
        loginLink.href = "/profile/profile.html";
    }
})