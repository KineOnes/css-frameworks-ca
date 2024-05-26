import { request } from "./request.mjs";

// TODO: Document function
export async function login(email, password) {
    try {
        const data = { email: email, password: password };
        const response = await request("/social/auth/login", "POST", data);
        const json = await response.json();
        return { success: response.ok, data: json };
    } catch (error) {
        throw new Error(error);
    }
}

// TODO: Document function
export async function register(name, email, password) {
    try {
        const data = { name: name, email: email, password: password };
        const response = await request("/social/auth/register", "POST", data);
        const json = await response.json();
        return { success: response.ok, data: json };
    } catch (error) {
        throw new Error(error);
    }
}