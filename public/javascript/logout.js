// function for users to logout
async function logout() {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  });

  // check to see if response is ok, then go to homepage
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
}

// event listener for logout button
document.querySelector("#logout").addEventListener("click", logout);
