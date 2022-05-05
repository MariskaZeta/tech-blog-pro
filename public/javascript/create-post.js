async function createPostHandler(event) {
  event.preventDefault();

  // if a new post is created then add the new post to the page
  document.location.replace("/dashboard/new")
}

document.querySelector("#create-new-post").addEventListener("click", createPostHandler);
