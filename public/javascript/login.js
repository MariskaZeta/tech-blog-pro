// this function is for users logging in
async function loginFormHandler(event) {
  event.preventDefault();

  // capture the username and password
  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  // checking to make sure both the username and passwords were entered
  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    // if response is ok, then load dashboard
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}

// event listener for users logging in
document.querySelector(".login-form").addEventListener("submit", loginFormHandler);
