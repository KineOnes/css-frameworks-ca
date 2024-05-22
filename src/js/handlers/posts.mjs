import { getAllPosts } from "../api/posts.mjs";
import { createPostTemplate } from "../templates/posts.mjs"
import * as storage from "../storage/index.mjs";

export async function handleAllPosts() {
    const accessToken = storage.load("accessToken");

    if (!accessToken) { return; }

    const response = await getAllPosts(accessToken);

    if (response.success){
        // TODO: implement filter/search here?
        const posts = response.data;
        const feedContainer = document.querySelector("#feed");
        posts.forEach((post) => {
            const postTemplate = createPostTemplate(post);
            feedContainer.append(postTemplate);
        });
    } else {
        // TODO: error handling
    }
}

function handleSearchEvent(searchQuery) {
    const feedContainer = document.querySelector("#feed");
    const posts = feedContainer.children  // HTMLCollection

    for (let post of posts) {
        const title = post.querySelector(".class-title").textContent.toLowerCase();
        const body = post.querySelector(".card-text").textContent.toLowerCase();

        // Match the search term
        // NOTE: zero-length is a special case where we want to show all posts if previously hidden
        //       Is there a better way to control this?
        // TODO: Can the body be null?
        if (searchQuery.length == 0 || title.includes(searchQuery) || body.includes(searchQuery)) {
            post.classList.remove("d-none");
        } else {
            // Hide the post (using post.style.display = "none" did not work)
            post.classList.add("d-none");
        }
    }
}

export async function setSearchFormListener() {
    const form = document.querySelector("#searchForm");

    if (!form) { throw new Error("setSearchFormListener() called, but #searchForm form element could not be found") }

    // TODO: The button should toggle state between "search" and "reset".
    //       However, if search text is edited before clicking the "reset" button, it should go back to a normal search button.
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const searchData = Object.fromEntries(formData.entries());
        
        handleSearchEvent(searchData.searchQuery.toLowerCase());
    });
}