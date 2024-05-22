
function createProfileImageTemplate(image){
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

function createUserInfoTemplate(){
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

export function createProfileTemplate(profileData) {
    const avatar = profileData.avatar || "/images/beige-knit.png";

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card", "mb-3");
    cardContainer.style.maxWidth = "700px";

    const imageContainer = createProfileImageTemplate(avatar);
    const userInfoContainer = createUserInfoTemplate();

    const userDescriptionContainer = document.createElement("div");
    userDescriptionContainer.classList.add("card-body");
    const userName = document.createElement("h5");
    userName.classList.add("card-title");
    userName.textContent = `${profileData.name}`;

    const userAbout = document.createElement("p");
    userAbout.classList.add("card-text");
    // TODO: How to multiline string? Too long line.
    userAbout.textContent = "Crafts enchanting scarves, teddy bears, and hats, infusing warmth and creativity into every stitch of her knitting.";

    userDescriptionContainer.append(userName, userAbout);


    cardContainer.append(imageContainer, userInfoContainer, userDescriptionContainer);

    return cardContainer;
    /*
              <div class="card-body">
                <h5 class="card-title">Lucy Lulu</h5>
                <p class="card-text">
                  Crafts enchanting scarves, teddy bears, and hats, infusing warmth
                  and creativity into every stitch of her knitting.
                </p>
                <p class="card-text">
                  <small class="text-body-secondary">Member since august 2021.</small>
                </p>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button class="btn btn-primary me-md-2" type="button">
                    Follow
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-person-fill-add"
                      viewBox="0 0 16 16">
                      <path
                        d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path
                        d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                    </svg>
                  </button>
                  <button class="btn btn-primary" type="button">
                    Unfollow
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill-dash" viewBox="0 0 16 16">
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1m0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                      <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>   */
}