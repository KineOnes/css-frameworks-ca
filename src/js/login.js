const API_BASE_URL = "https://api.noroff.dev/api/v1";
const API_LOGIN_URL = `${API_BASE_URL}/social/auth/login`;

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
        const json = await response.json();

        console.log(json);

        if(!response.ok) {
            // TODO display error message with reason to the user
        } else {
            // TODO Remove any dangling error message if previous login failed
            localStorage.setItem("userSession", JSON.stringify(json));
            window.location.href = "profile.html";
        }
    } catch (error) {
        console.log(error);
    }
}

function loginFormListener() {
    const form = document.querySelector("#loginForm");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const userData = Object.fromEntries(formData.entries());

      loginUser(API_LOGIN_URL, userData);
    });
}

loginFormListener();