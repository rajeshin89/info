document.addEventListener("DOMContentLoaded", () => {
  fetch("cms/blog-posts.json")
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("project-container");
      data.posts.forEach((post) => {
        const div = document.createElement("div");
        div.innerHTML = `<h3>${post.title}</h3><p>${post.description}</p><a href="${post.link}" target="_blank">View</a>`;
        container.appendChild(div);
      });
    });
});
