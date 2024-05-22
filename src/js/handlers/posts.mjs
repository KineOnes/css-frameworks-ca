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