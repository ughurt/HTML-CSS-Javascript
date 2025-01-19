// join_doctor.js

document.addEventListener("DOMContentLoaded", function () {
    const doctorForm = document.querySelector("#doctorForm");
    const errorMessage = document.querySelector("#errorMessage");
  
    // Email Regex (moderate check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Minimum length for bio
    const MIN_BIO_LENGTH = 20;
  
    if (doctorForm) {
      doctorForm.addEventListener("submit", function (event) {
        // Clear previous error
        errorMessage.style.display = "none";
        errorMessage.innerText = "";
  
        const fullnameInput = document.querySelector("#fullname");
        const emailInput = document.querySelector("#email");
        const specializationSelect = document.querySelector("#specialization");
        const experienceInput = document.querySelector("#experience");
        const bioTextarea = document.querySelector("#bio");
  
        // 1) Full Name check (must have space => first & last name)
        if (!fullnameInput.value.includes(" ")) {
          event.preventDefault();
          errorMessage.innerText = "Please include both first and last name.";
          errorMessage.style.display = "block";
          return;
        }
  
        // 2) Email Regex check
        if (!emailRegex.test(emailInput.value)) {
          event.preventDefault();
          errorMessage.innerText = "Please enter a valid email address (e.g., doctor@example.com).";
          errorMessage.style.display = "block";
          return;
        }
  
        // 3) Specialization must not be empty
        if (specializationSelect.value === "") {
          event.preventDefault();
          errorMessage.innerText = "Please select a specialization.";
          errorMessage.style.display = "block";
          return;
        }
  
        // 4) Experience must be a positive integer (at least 1)
        const years = parseInt(experienceInput.value, 10);
        if (isNaN(years) || years < 1) {
          event.preventDefault();
          errorMessage.innerText = "Please enter a valid number of years (at least 1).";
          errorMessage.style.display = "block";
          return;
        }
  
        // 5) Bio must have a minimum length
        if (bioTextarea.value.trim().length < MIN_BIO_LENGTH) {
          event.preventDefault();
          errorMessage.innerText = `Your bio must be at least ${MIN_BIO_LENGTH} characters long.`;
          errorMessage.style.display = "block";
          return;
        }
  
        // If all checks pass, form will submit (action="#")
        
      });
    }
  });
  