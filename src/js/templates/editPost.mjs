import * as storage from "../storage/index.mjs";
import { handleUpdatePost } from "../handlers/posts.mjs";

function createProfileImage(image, name) {
    const avatar = image || "/images/userImageDefault.jpg";
    const profileImage = document.createElement("img");
    profileImage.classList.add("img-fluid", "rounded-circle", "pt-n4", "m-3");
    profileImage.style.width = "200px";
    profileImage.style.height = "200px";
    profileImage.src = `${avatar}`;
    profileImage.alt = `${name}'s profile image`;
    return profileImage;
}

function createUpdateButton(post) {
    const updateButton = document.createElement("button");
    updateButton.classList.add("btn", "btn-primary");
    updateButton.setAttribute("type", "submit");
    updateButton.textContent = "Update";
    return updateButton;
}

function createCancelButton(post) {
    const cancelButton = document.createElement("button");
    cancelButton.classList.add("btn", "btn-primary");
    cancelButton.textContent = "Cancel";

    cancelButton.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "/feed";
    });

    return cancelButton;
}

export function createEditPostTemplate(postData) {
    const editPostContainer = document.createElement("div");
    editPostContainer.classList.add(
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

    const profileImageContainer = document.createElement("div");
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

    const cardForm = document.createElement("form");
    cardForm.setAttribute("id", "editForm");

    const titleFormGroup = document.createElement("div");
    titleFormGroup.classList.add("form-group", "mb-3");

    const titleInput = document.createElement("input");
    titleInput.classList.add("form-control");
    titleInput.type = "text";
    titleInput.name = "title";
    titleInput.value = `${postData.title}`
    titleInput.placeholder = "Title";

    titleFormGroup.append(titleInput);

    const bodyFormGroup = document.createElement("div");
    bodyFormGroup.classList.add("form-group", "mb-3");

    const bodyInput = document.createElement("input");
    bodyInput.classList.add("form-control");
    bodyInput.name = "body";
    bodyInput.type = "text";
    bodyInput.placeholder = "What's on your mind?";
    if (postData.body) {
        bodyInput.value = `${postData.body}`;
    }

    bodyFormGroup.append(bodyInput);

    const updateButton = createUpdateButton(postData);
    const cancelButton = createCancelButton(postData);

    updateButton.style.marginRight = "10px";

    cardForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const updatedData = Object.fromEntries(formData.entries());
        handleUpdatePost(postData.id, updatedData);
    });

    cardForm.append(titleFormGroup, bodyFormGroup, updateButton, cancelButton);

    cardBody.append(cardForm);

    cardColumn.append(cardBody);
    row.append(profileImageContainer, cardColumn);
    card.append(row);
    editPostContainer.append(card);

    return editPostContainer;
}
