async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-content"]').value.trim();
  const post_content = document.querySelector('textarea[name="post-content"]').value.trim();

  const response = await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify({
      title,
      post_content
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });

// if there is a response then replace the homepage with the dashboard page
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

// on form submission, this will grab the post title and post url values from the form
document.querySelector(".new-post-form").addEventListener("submit", newFormHandler);
