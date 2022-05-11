// function to delete a post
async function deleteFormHandler(event) {
  event.preventDefault();

  // get the post_id of post user wants to delete
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  // defining the method as DELETE
  const response = await fetch(`/api/posts/${post_id}`, {
    method: "DELETE"
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

// event listener for the delete button
document.querySelector(".delete-post-btn").addEventListener("click", deleteFormHandler);
