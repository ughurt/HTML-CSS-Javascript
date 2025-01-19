// register.js

document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.querySelector("#registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      // Grab form fields
      const fullnameInput = document.querySelector("#fullname");
      const emailInput = document.querySelector("#email");
      const passwordInput = document.querySelector("#password");
      const confirmPasswordInput = document.querySelector("#confirmPassword");

      // Quick check: Email must contain "@" symbol
      if (!emailInput.value.includes("@")) {
        event.preventDefault();
        alert("Please enter a valid email address!");
        return;
      }

      // Check if passwords match
      if (passwordInput.value !== confirmPasswordInput.value) {
        event.preventDefault();
        alert("Passwords do not match!");
        return;
      }

      // Optional: ensure Full Name has at least two words
      if (!fullnameInput.value.includes(" ")) {
        event.preventDefault();
        alert("Please include both first and last name.");
        return;
      }

      // If all checks pass, the form will submit normally (action="#").
      // You'd replace "#" with your actual server endpoint if needed.
    });
  }
});
