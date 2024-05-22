import { login } from "../api/authentication.mjs";
import * as storage from "../storage/index.mjs";

async function handleLoginEvent(email, password) {
    try {
        const response = await login(email, password);
        
        if (response.success) {
            const { accessToken, ...user } = response.data;
            storage.save("accessToken", accessToken);
            storage.save("profile", user);
            window.location.href = "/profile";
        } else {
            // TODO: Inform user of the error (i.e. "Invalid email or password")
            // Example response.data: {"errors":[{"message":"Invalid email or password"}],"status":"Unauthorized","statusCode":401}
        }
    } catch (error) {
        console.log(error);
    }
}

export function setLoginFormListener() {
    const form = document.querySelector("#loginForm");

    if (!form) { throw new Error("loginFormListener() called, but #loginForm form element could not be found") }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const userData = Object.fromEntries(formData.entries());

        handleLoginEvent(userData.email, userData.password);
    });
}