import { setLoginFormListener } from "./handlers/login.mjs";
import { setRegistrationFormListener } from "./handlers/registration.mjs";
import { handleAllPosts } from "./handlers/posts.mjs";

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
            // TODO: Do something useful? I.e. filling in the profile info.
            break;
        
        case "/feed/":
            // TODO: set listeners for "load more posts", "create post", etc..
            handleAllPosts();
            break;

		default:
			break;
	}
}

main();