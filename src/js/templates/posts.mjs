import * as storage from "../storage/index.mjs";
import { handleDeletePost } from "../handlers/posts.mjs";

const xmlns = "http://www.w3.org/2000/svg";

function createProfileImage(image, name) {
    const avatar = image || "/images/userImageDefault.jpg";

    const profileImageAnchor = document.createElement("a");
    profileImageAnchor.href = `/profile/?name=${name}`;

    const profileImage = document.createElement("img");
    profileImage.classList.add("img-fluid", "rounded-circle", "pt-n4", "m-3");
    profileImage.style.width = "200px";
    profileImage.style.height = "200px";
    profileImage.src = `${avatar}`;
    profileImage.alt = `${name}'s profile image`;

    profileImageAnchor.append(profileImage);
    return profileImageAnchor;
}

// TODO: Add event listener?
function createLikeButton(numLikes) {
    const likeButton = document.createElement("button");
    likeButton.classList.add("btn", "btn-primary", "me-2");

    const likeButtonSvg = document.createElementNS(xmlns, "svg");
    likeButtonSvg.setAttribute("width", "16");
    likeButtonSvg.setAttribute("height", "16");
    likeButtonSvg.setAttribute("fill", "currentColor");
    likeButtonSvg.setAttribute("class", "bi bi-heart");
    likeButtonSvg.setAttribute("viewBox", "0 0 16 16");
    const likeButtonPath = document.createElementNS(xmlns, "path");
    likeButtonPath.setAttribute(
        "d",
        "m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
    );

    const likeButtonCount = document.createElement("span");
    likeButtonCount.classList.add("badge", "rounded-pill", "text-dark");
    likeButtonCount.textContent = numLikes;

    likeButtonSvg.append(likeButtonPath);
    likeButton.append(likeButtonSvg, likeButtonCount);
    return likeButton;
}

// TODO: Add event listener?
function createCommentButton() {
    const commentButton = document.createElement("button");
    commentButton.classList.add("btn", "btn-primary", "me-2");

    const commentButtonSvg = document.createElementNS(xmlns, "svg");
    commentButtonSvg.setAttribute("width", "16");
    commentButtonSvg.setAttribute("height", "16");
    commentButtonSvg.setAttribute("fill", "currentColor");
    commentButtonSvg.setAttribute("class", "bi bi-chat");
    commentButtonSvg.setAttribute("viewBox", "0 0 16 16");
    const commentButtonPath = document.createElementNS(xmlns, "path");
    commentButtonPath.setAttribute(
        "d",
        "M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"
    );

    commentButtonSvg.append(commentButtonPath);
    commentButton.append(commentButtonSvg);
    return commentButton;
}

function createViewButton(id) {
    const viewButton = document.createElement("button");
    viewButton.classList.add("btn", "btn-primary", "me-2");

    const viewButtonSvg = document.createElementNS(xmlns, "svg");
    viewButtonSvg.setAttribute("width", "16");
    viewButtonSvg.setAttribute("height", "16");
    viewButtonSvg.setAttribute("fill", "currentColor");
    viewButtonSvg.setAttribute("class", "bi bi-chat");
    viewButtonSvg.setAttribute("viewBox", "0 0 16 16");
    const viewButtonPath1 = document.createElementNS(xmlns, "path");
    viewButtonPath1.setAttribute("fill-rule", "evenodd")
    viewButtonPath1.setAttribute(
        "d",
        "M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
    );
    const viewButtonPath2 = document.createElementNS(xmlns, "path");
    viewButtonPath2.setAttribute("fill-rule", "evenodd")
    viewButtonPath2.setAttribute(
        "d",
        "M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
    );

    viewButtonSvg.append(viewButtonPath1, viewButtonPath2);
    viewButton.append(viewButtonSvg);

    viewButton.addEventListener("click", () => {
        window.location.href = `/feed/post/?id=${id}`;
    });

    return viewButton;
}


function createEditButton(post) {
    const editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-secondary", "me-2");
    editButton.ariaLabel = "Edit post";

    const editButtonIcon = document.createElementNS(xmlns, "svg");
    editButtonIcon.setAttribute("width", "16");
    editButtonIcon.setAttribute("height", "16");
    editButtonIcon.setAttribute("fill", "currentColor");
    editButtonIcon.setAttribute("class", "bi bi-pencil-square");
    editButtonIcon.setAttribute("viewBox", "0 0 16 16");
    const editButtonIconPath1 = document.createElementNS(xmlns, "path");
    editButtonIconPath1.setAttribute(
        "d",
        "M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
    );
    const editButtonIconPath2 = document.createElementNS(xmlns, "path");
    editButtonIconPath2.setAttribute(
        "d",
        "M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
    );
    editButtonIconPath2.setAttribute("fill-rule", "evenodd");
    editButtonIcon.append(editButtonIconPath1, editButtonIconPath2);
    editButton.append(editButtonIcon);

    editButton.addEventListener("click", () => {
        window.location.href = `/feed/post/edit/?id=${post.id}`;
    });

    return editButton;
}

function createDeleteButton(post) {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger", "me-2");
    deleteButton.ariaLabel = "Delete post";

    const deleteButtonIcon = document.createElementNS(xmlns, "svg");
    deleteButtonIcon.setAttribute("width", "16");
    deleteButtonIcon.setAttribute("height", "16");
    deleteButtonIcon.setAttribute("fill", "currentColor");
    deleteButtonIcon.setAttribute("class", "bi bi-trash");
    deleteButtonIcon.setAttribute("viewBox", "0 0 16 16");
    const deleteButtonIconPath1 = document.createElementNS(xmlns, "path");
    deleteButtonIconPath1.setAttribute(
        "d",
        "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
    );
    const deleteButtonIconPath2 = document.createElementNS(xmlns, "path");
    deleteButtonIconPath2.setAttribute(
        "d",
        "M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
    );

    deleteButtonIcon.append(deleteButtonIconPath1, deleteButtonIconPath2);
    deleteButton.append(deleteButtonIcon);

    deleteButton.addEventListener("click", () => {
        handleDeletePost(post);
    });

    return deleteButton;
}

export function createPostTemplate(postData) {
    const postContainer = document.createElement("div");
    postContainer.classList.add(
        "container",
        "d-flex",
        "justify-content-center",
        "mt-3"
    );

    const card = document.createElement("div");
    card.classList.add("card", "flex-fill", "my-3");
    card.style.maxWidth = "700px";

    const row = document.createElement("div");
    row.classList.add("row");

    // TODO: Navigate to profile page instead
    const profileImageContainer = document.createElement("a");
    profileImageContainer.classList.add("col-md-4");

    const profileImage = createProfileImage(
        postData.author.avatar,
        postData.author.name
    );

    profileImageContainer.append(profileImage);

    const cardColumn = document.createElement("div");
    cardColumn.classList.add("col-md-8");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("class-title");
    cardTitle.textContent = `${postData.title}`;

    cardBody.append(cardTitle);

    if (postData.body) {
        const cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.textContent = `${postData.body}`;
        cardBody.append(cardText);
    }

    if (postData.media) {
        const cardMedia = document.createElement("div");
        cardMedia.classList.add("media");
        const cardMediaImage = document.createElement("img");
        cardMediaImage.classList.add("img-fluid", "rounded", "mb-3");
        cardMediaImage.src = postData.media;
        cardMediaImage.alt = "Post media";
        cardMedia.append(cardMediaImage);
        cardBody.append(cardMedia);
    }

    let numLikes = 0;
    postData.reactions.forEach((reaction) => {
        numLikes += reaction.count;
    });

    const likeButton = createLikeButton(numLikes);
    const commentButton = createCommentButton();
    const viewButton = createViewButton(postData.id);

    cardBody.append(likeButton, commentButton, viewButton);

    const currentUser = storage.load("profile").name;
    if (postData.author.name === currentUser) {
        const editButton = createEditButton(postData);
        const deleteButton = createDeleteButton(postData);
        cardBody.append(editButton, deleteButton);
    }

    const cardInfo = document.createElement("p");
    const date = new Date(postData.updated).toDateString();
    const cardInfoText = document.createElement("small");
    cardInfoText.style.whiteSpace = "pre-line";
    cardInfoText.classList.add("text-body-secondary");
    cardInfoText.textContent = `Created by: ${postData.author.name}
                                Last updated: ${date}`;
    cardInfo.append(cardInfoText);

    cardBody.append(cardInfo);
    cardColumn.append(cardBody);
    row.append(profileImageContainer, cardColumn);
    card.append(row);
    postContainer.append(card);

    return postContainer;
}
