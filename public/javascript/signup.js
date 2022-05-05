// this function is for the signup
async function signupFormHandler(event) {
  event.preventDefault();

  // capture the username and password
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  // check to make sure both username and password are entered
  if (username && password) {
    const response = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    // if the response is ok, then load dashboard
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}

// event listener for submission of signup
document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);
