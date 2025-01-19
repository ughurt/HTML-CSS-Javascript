document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      alert("Login successful!");

      // Set login state
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(data.user)); // Assuming `data.user` contains user info

      // Redirect to profile page
      window.location.href = "profile.html";
    } else {
      const errorData = await response.json();
      alert(errorData.error || "Login failed.");
    }
  } catch (err) {
    console.error("Error logging in:", err);
    alert("An error occurred. Please try again.");
  }
});
