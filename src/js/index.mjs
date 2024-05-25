import { setLoginFormListener } from "./handlers/login.mjs";
import { setRegistrationFormListener } from "./handlers/registration.mjs";
import {
    handleAllPosts,
    handleSinglePost,
    handleEditPost,
    setCreatePostFormListener,
    setSearchFormListener,
    setSelectFormListener
} from "./handlers/posts.mjs";

import { createProfileTemplate } from "./templates/profile.mjs";

import * as storage from "./storage/index.mjs";


function main() {
    const path = location.pathname;

    switch (path) {
        // Intentional fall-through
        // TODO: Should probably have a separate page for login. I.e. /profile/login/index.html
        case "/":
        case "/index.html": // Temporary workaround: Handle LiveServer opening at path /index.html
            setLoginFormListener();
            break;

        case "/profile/registration/":
            setRegistrationFormListener();
            break;

        case "/profile/":
            const profile = storage.load("profile");
            const profileContainer = document.querySelector("#profile");
            const profileCard = createProfileTemplate(profile);
            profileContainer.append(profileCard);
            break;

        case "/feed/":
            // TODO: set listeners for "load more posts"?
            handleAllPosts();
            setSearchFormListener();
            setSelectFormListener();
            setCreatePostFormListener();
            break;

        case "/feed/post/": {
            const urlParams = new URLSearchParams(window.location.search);
            let id = urlParams.get("id");
            handleSinglePost(id);
            break;
        }

        case "/feed/post/edit/": {
            const urlParams = new URLSearchParams(window.location.search);
            let id = urlParams.get("id");
            handleEditPost(id);
            break;
        }

        default:
            console.log(`Unknown path name: ${path}`);
            break;
    }
}

main();