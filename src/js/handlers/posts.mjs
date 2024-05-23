import { getAllPosts, createPost } from "../api/posts.mjs";
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

export async function handleCreatePost(postData) {
    try {
        const accessToken = storage.load("accessToken");
        const response = await createPost(postData, accessToken);

        if (response.success) {
            // give user feedback that post was created successfully
        } else {
            // give user feedback that we failed to create the post
        }
    } catch(error) {
        console.log(error);
    }
}

export function setCreatePostFormListener() {
    const form = document.querySelector("#createPostForm");

    if (!form) { throw new Error("setCreatePostFormListener() called, but #createPostForm form element could not be found") }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const createPostData = Object.fromEntries(formData.entries());
        handleCreatePost(createPostData);
        // TODO: Clear form after post
    });
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

function handleSelectEvent(option) {
    const feedContainer = document.querySelector("#feed");
    const posts = feedContainer.children  // HTMLCollection

    for (let post of posts) {
        const media = post.querySelector(".media");;

        if(option == "media") {
            if(media) {
                post.classList.remove("d-none");
            } else {
                post.classList.add("d-none");
            }
        } else if (option == "no-media") {
            if(!media) {
                post.classList.remove("d-none");
            } else {
                post.classList.add("d-none");
            }
        } else {
            // Show all posts
            post.classList.remove("d-none");
        }
    }
}


export async function setSelectFormListener() {
    const select = document.querySelector("#selectForm");

    if (!select) { throw new Error("setSelectFormListener() called, but #selectForm form element could not be found") }

    select.addEventListener("change", (event) => {
        handleSelectEvent(select.value);
    });
}