const API_BASE_URL = "https://api.noroff.dev/api/v1";

const API_REGISTER_URL = `${API_BASE_URL}/social/auth/register`;

/**
 * API call to register a new user
 * @param {string} url 
 * @param {any} userData
 * @throws {error} ... TODO
 * @returns TODO
 * ```js
 * registerUser(API_REGISTER_URL, userData);
 * ```
 */
async function registerUser(url, userData) {
    try {
        const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        };
        const response = await fetch(url, postData);
        const json = await response.json();
        console.log(json)
    } catch (error) {
        console.log(error);
    }
}

function registerFormListener() {
    const form = document.querySelector("#registerForm");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const userData = Object.fromEntries(formData.entries());

      registerUser(API_REGISTER_URL, userData);
    });
}

registerFormListener();

async function loginUser(url, userData) {
    try {
        const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        };
        const response = await fetch(url, postData);
        console.log(response);
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.log(error);
    }
}

const loginUrl = `${API_BASE_URL}/social/auth/login`;

loginUser(loginUrl);