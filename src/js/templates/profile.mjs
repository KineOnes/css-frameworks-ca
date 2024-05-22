
function createProfileImageTemplate(image) {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("d-flex", "justify-content-center");

    const profileImage = document.createElement("img");
    profileImage.classList.add("card-img-to", "mt-3", "mb-3", "rounded-circle", "pt-n4");
    profileImage.style.width = "200px";
    profileImage.src = `${image}`;
    profileImage.alt = "Profile image";

    imageContainer.append(profileImage);

    return imageContainer;
}

function createUserInfoTemplate() {
    const userInfoContainer = document.createElement("div");
    userInfoContainer.classList.add("container", "text-center");
    const userInfoTitleRow = document.createElement("div");
    userInfoTitleRow.classList.add("row");
    const userInfoDataRow = document.createElement("div");
    userInfoDataRow.classList.add("row");

    const memberSinceTitle = document.createElement("div");
    memberSinceTitle.classList.add("col");
    memberSinceTitle.textContent = "Member since";
    const followersTitle = document.createElement("div");
    followersTitle.classList.add("col");
    followersTitle.textContent = "Followers";
    const followingTitle = document.createElement("div");
    followingTitle.classList.add("col");
    followingTitle.textContent = "Following";
    
    const memberSinceDate = document.createElement("div");
    memberSinceDate.classList.add("col");
    memberSinceDate.textContent = "August 2021";  // NOTE: Not provided by API
    const followersCount = document.createElement("div");
    followersCount.classList.add("col");
    followersCount.textContent = "546";  // TODO: get from API
    const followingCount = document.createElement("div");
    followingCount.classList.add("col");
    followingCount.textContent = "410";  // TODO: get from API

    userInfoTitleRow.append(memberSinceTitle, followersTitle, followingTitle);
    userInfoDataRow.append(memberSinceDate, followersCount, followingCount);
    userInfoContainer.append(userInfoTitleRow, userInfoDataRow);

    return userInfoContainer;
}

function createUserDescription(name) {
    const userDescriptionContainer = document.createElement("div");
    userDescriptionContainer.classList.add("card-body");
    
    const userName = document.createElement("h5");
    userName.classList.add("card-title");
    userName.textContent = `${name}`;

    const userAbout = document.createElement("p");
    userAbout.classList.add("card-text");
    // TODO: How to multiline string? Too long line.
    userAbout.textContent = "Crafts enchanting scarves, teddy bears, and hats, infusing warmth and creativity into every stitch of her knitting.";

    userDescriptionContainer.append(userName, userAbout);
    return userDescriptionContainer;
}

// TODO: Add event listeners to the buttons (optional)
function createButtonsTemplate() {
    const xmlns = "http://www.w3.org/2000/svg";

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("d-grid", "gap-2", "d-md-flex", "justify-content-md-end");

    const followButton = document.createElement("button");
    followButton.classList.add("btn", "btn-primary", "me-md-2");
    followButton.type = "button";
    followButton.textContent = "Follow";

    const followButtonSvg = document.createElementNS(xmlns, "svg");
    followButtonSvg.setAttribute("width", "16");
    followButtonSvg.setAttribute("height", "16");
    followButtonSvg.setAttribute("fill", "currentColor");
    followButtonSvg.setAttribute("class", "bi bi-person-fill-add");
    followButtonSvg.setAttribute("viewBox", "0 0 16 16");
    const followButtonPath1 = document.createElementNS(xmlns, "path");
    followButtonPath1.setAttribute(
        "d",
        "M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
    );
    const followButtonPath2 = document.createElementNS(xmlns, "path");
    followButtonPath2.setAttribute(
        "d",
        "M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"
    );

    followButtonSvg.append(followButtonPath1, followButtonPath2);
    followButton.append(followButtonSvg);

    const unfollowButton = document.createElement("button");
    unfollowButton.classList.add("btn", "btn-primary");
    unfollowButton.type = "button";
    unfollowButton.textContent = "Unfollow";

    const unfollowButtonSvg = document.createElementNS(xmlns, "svg");
    unfollowButtonSvg.setAttribute("width", "16");
    unfollowButtonSvg.setAttribute("height", "16");
    unfollowButtonSvg.setAttribute("fill", "currentColor");
    unfollowButtonSvg.setAttribute("class", "bi bi-person-fill-dash");
    unfollowButtonSvg.setAttribute("viewBox", "0 0 16 16");
    const unfollowButtonPath1 = document.createElementNS(xmlns, "path");
    unfollowButtonPath1.setAttribute(
        "d",
        "M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1m0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
    );
    const unfollowButtonPath2 = document.createElementNS(xmlns, "path");
    unfollowButtonPath2.setAttribute(
        "d",
        "M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"
    );

    unfollowButtonSvg.append(unfollowButtonPath1, unfollowButtonPath2);
    unfollowButton.append(unfollowButtonSvg);

    buttonsContainer.append(followButton, unfollowButton);
    return buttonsContainer;
}

export function createProfileTemplate(profileData) {
    const avatar = profileData.avatar || "/images/userImageNoste.png";

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card", "mb-3");
    cardContainer.style.maxWidth = "700px";

    const imageContainer = createProfileImageTemplate(avatar);
    const userInfoContainer = createUserInfoTemplate();
    const userDescriptionContainer = createUserDescription(profileData.name);
    const buttonsContainer = createButtonsTemplate();

    // TODO: maybe append buttonsContainer in cardContainer?
    //       If so, then we need to take care of margins right and bottom to
    //       get the same look and feel.
    userDescriptionContainer.append(buttonsContainer);

    cardContainer.append(
        imageContainer,
        userInfoContainer,
        userDescriptionContainer
    );

    return cardContainer;
}