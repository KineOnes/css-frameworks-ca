import { setLoginFormListener } from "./handlers/login.mjs";
import { setRegistrationFormListener } from "./handlers/registration.mjs";
import { handleAllPosts, setSearchFormListener, setSelectFormListener } from "./handlers/posts.mjs";

import { createProfileTemplate } from "./templates/profile.mjs";

import * as storage from "./storage/index.mjs";


function main() {
	const path = location.pathname;

	switch (path) {
		case "/":
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
            console.log(profileCard);
            break;
        
        case "/feed/":
            // TODO: set listeners for "load more posts", "create post", "filter posts", "search posts"
            handleAllPosts();
            setSearchFormListener();
            setSelectFormListener();
            break;

		default:
			break;
	}
}

main();