import { request } from "./request.mjs";

const action = "?_following=true&_followers=true&_posts=true";

export async function getProfileByName(name, accessToken) {
    try {
        const endpoint = `/social/profiles/${name}${action}`
        const data = {};
        const response = await request(endpoint, "GET", data, accessToken);
        const json = await response.json();
        return { success: response.ok, data: json };
    } catch (error) {
        throw new Error(error);
    }
}