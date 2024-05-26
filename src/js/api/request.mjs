import { API_BASE_URL } from "./constants.mjs"

export async function request(endpoint, method = "GET", data = {}, accessToken = "") {
    const url = `${API_BASE_URL}${endpoint}`;
    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json",
        }
    };

    if (Object.keys(data).length > 0) {
        options.body = JSON.stringify(data);
    }

    if (accessToken.length > 0) {
        options.headers.Authorization = `Bearer ${accessToken}`;
    }

    try {
        const response = await fetch(url, options);
        return response;
    } catch (error) {
        throw new Error(error);
    }
}