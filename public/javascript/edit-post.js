// this function is for editing a post
async function editFormHandler(event) {
  event.preventDefault();

  // capture the title, content, and id from the post being edit
  const title = document.querySelector('input[name="post-title"]').value;
  const post_content = document.querySelector('textarea[name="post_content"]').value().trim();
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  // defining the method as a PUT
  const response = await fetch("/api/posts/${post_id}", {
    method: "PUT",
    body: JSON.stringify({
      title,
      post_content
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  // if the response is ok, then update the dashboard
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

// event listener for the edit post submission
document.querySelector(".edit-post-form").addEventListener("sumbit", editFormHandler);
