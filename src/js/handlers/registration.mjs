import { register } from "../api/authentication.mjs";

async function handleRegistrationEvent(name, email, password) {
    try {
        const response = await register(name, email, password);
        
        if (response.success) {
            // Navigate back to login page
            window.location.href = "/";
        } else {
            // TODO: Inform user of the error (i.e. Failed to create user profile)
        }
    } catch (error) {
        console.log(error);
    }
}

export function setRegistrationFormListener() {
    const form = document.querySelector("#registerForm");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const userData = Object.fromEntries(formData.entries());

      handleRegistrationEvent(userData.name, userData.email, userData.password);
    });
}