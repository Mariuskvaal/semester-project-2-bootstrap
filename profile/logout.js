function logout() {
    // Remove the user's token from localStorage
    localStorage.removeItem("accessToken");
  
    // Redirect to the login page or home page after logout
    // Replace 'login.html' with the path to your login page or home page
    window.location.href = '/index.html';
  }
  