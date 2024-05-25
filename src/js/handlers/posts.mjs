import { getAllPosts, getPostById, createPost, deletePost, updatePost } from "../api/posts.mjs";
import { createPostTemplate } from "../templates/posts.mjs"
import { createEditPostTemplate } from "../templates/editPost.mjs";
import * as storage from "../storage/index.mjs";

export async function handleAllPosts() {
    const accessToken = storage.load("accessToken");

    if (!accessToken) { return; }

    const response = await getAllPosts(accessToken);

    if (response.success) {
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

export async function handleSinglePost(id) {
    const accessToken = storage.load("accessToken");

    if (!accessToken) { return; }

    const response = await getPostById(id, accessToken);

    if (response.success) {
        const post = response.data;
        const container = document.querySelector("main");
        const postTemplate = createPostTemplate(post);
        container.append(postTemplate);
    } else {
        // TODO: error handling
    }
}

export async function handleDeletePost(post) {
    const accessToken = storage.load("accessToken");
    const response = await deletePost(post.id, accessToken);
    if (response.success) {
        window.location.reload();
    } else {
        // TODO: Notify user?
        console.log(response);
    }
}

export async function handleEditPost(id) {
    const accessToken = storage.load("accessToken");

    if (!accessToken) { return; }

    const response = await getPostById(id, accessToken);

    if (response.success) {
        const container = document.querySelector("main");
        const editPostTemplate = createEditPostTemplate(response.data);
        container.append(editPostTemplate);
    } else {
        // TODO: error handling
    }
}

export async function handleUpdatePost(id, post) {
    const accessToken = storage.load("accessToken");
    const response = await updatePost(id, post, accessToken);
    if (response.success) {
        window.location.href = "/feed";
    } else {
        // TODO: notify user of failed attempt
    }
}

async function handleCreatePost(postData, feed) {
    try {
        const accessToken = storage.load("accessToken");
        const response = await createPost(postData, accessToken);

        if (response.success) {
            // Apply missing fields not contained in the response
            response.data.author = storage.load("profile");
            response.data.reactions = [];
            response.data.comments = [];
            response.data.tags = [];

            const postTemplate = createPostTemplate(response.data);
            feed.prepend(postTemplate);

            // TODO: Replace above code with window.location.reload() instead?
        }

        return response.success;
    } catch (error) {
        console.log(error);
    }
}

export function setCreatePostFormListener() {
    const form = document.querySelector("#createPostForm");

    console.log(form);

    if (!form) { throw new Error("setCreatePostFormListener() called, but #createPostForm id could not be found") }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const createPostData = Object.fromEntries(formData.entries());
        const feedContainer = document.querySelector("#feed");
        const success = handleCreatePost(createPostData, feedContainer);
        if (success) {
            form.reset();
        } else {
            // TODO: Notify user that we failed to create the post
        }
    });
}

function handleSearchEvent(searchQuery) {
    const feedContainer = document.querySelector("#feed");
    const posts = feedContainer.children  // HTMLCollection

    for (let post of posts) {
        var title = post.querySelector(".class-title");
        var body = post.querySelector(".card-text");

        if (title) {
            title = title.textContent.toLowerCase();
        } else {
            title = "";
        }

        if (body) {
            body = body.textContent.toLowerCase();
        } else {
            body = "";
        }

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

    if (!form) { throw new Error("setSearchFormListener() called, but #searchForm id could not be found") }

    // TODO: The button should toggle state between "search" and "reset".
    //       However, if search text is edited before clicking the "reset" button, it should go back to a normal search button.
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const searchData = Object.fromEntries(formData.entries());
        handleSearchEvent(searchData.searchQuery.toLowerCase());
    });
}

function handleSelectEvent(option) {
    const feedContainer = document.querySelector("#feed");
    const posts = feedContainer.children  // HTMLCollection

    for (let post of posts) {
        const media = post.querySelector(".media");;

        if (option == "media") {
            if (media) {
                post.classList.remove("d-none");
            } else {
                post.classList.add("d-none");
            }
        } else if (option == "no-media") {
            if (!media) {
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

    if (!select) { throw new Error("setSelectFormListener() called, but #selectForm id could not be found") }

    select.addEventListener("change", (event) => {
        handleSelectEvent(select.value);
    });
}