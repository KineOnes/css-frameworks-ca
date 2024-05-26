import * as storage from "../storage/index.mjs";
import { createProfileTemplate } from "../templates/profile.mjs";
import { getProfileByName } from "../api/profiles.mjs";

export async function handleLoadProfile(name) {
    const accessToken = storage.load("accessToken");

    if (!accessToken) { return; }

    if (!name) {
        name = storage.load("profile").name;
    }

    const response = await getProfileByName(name, accessToken);

    if (response.success) {
        const profileContainer = document.querySelector("#profile");
        const profileCard = createProfileTemplate(response.data);
        profileContainer.append(profileCard);
    } else {
        // TODO: do something
    }
}