import { request } from "./request.mjs";

const action = "?_author=true&_reactions=true&_comments=true";

export async function getAllPosts(accessToken, limit = 100, page = 1) {
    try {
        const endpoint = `/social/posts${action}&limit=${limit}&page=${page}`
        const data = {};
        // TODO: Are there other ways to design the request func so we don't have to specify this?
        // SEE answer in: https://stackoverflow.com/questions/57843791/default-function-parameters-doesnt-work-as-i-expected
        const response = await request(endpoint, "GET", data, accessToken);
        const json = await response.json();
        return { success: response.ok, data: json };
    } catch (error) {
        throw new Error(error);
    }
}

/* 
    post = {
        "title": "string", // Required
        "body": "string", // Optional
        "tags": ["string"], // Optional
        "media": "https://url.com/image.jpg" // Optional
    }
    accessToken = "abclkasdnqwe..."  // Required
*/
export async function createPost(post, accessToken) {
    if (!post || !post.title) { throw new Error("Missing post.title argument"); }
    if (!accessToken) { throw new Error("Missing access token"); }

    try {
        const endpoint = `/social/posts${action}&limit=${limit}&page=${page}`
        const data = { title: post.title };
        if (post.body) { data.body = post.body; }
        if (post.tags) { data.tags = post.tags; }
        if (post.media) { data.media = post.media; }
        const response = await request(endpoint, "POST", data, accessToken);
        const json = await response.json();
        return { success: response.ok, data: json };
    } catch(error) {
        throw new Error(error);
    }
}