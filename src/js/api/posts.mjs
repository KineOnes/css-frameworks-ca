import { request } from "./request.mjs";

const action = "?_author=true&_reactions=true&_comments=true";

export async function getAllPosts(accessToken, limit = 10, page = 1) {
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