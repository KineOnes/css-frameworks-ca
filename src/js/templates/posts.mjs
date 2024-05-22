
// TODO: Add event listeners to the "buttons"
export function createPostTemplate(postData){
    const avatar = postData.author.avatar || "/images/beige-knit.png";  // TODO: Select default avatar

    const post = document.createElement("div");
    post.classList.add("container", "d-flex", "justify-content-center", "mt-3");

    const card = document.createElement("div");
    card.classList.add("card", "mb-3");
    card.style.maxWidth = "700px";
    

    const row = document.createElement("div");
    row.classList.add("row", "g-0");

    const imageColumn = document.createElement("div");
    imageColumn.classList.add("col-md-4");
    imageColumn.style.marginRight = "15px";  // Add space between image and text

    const postImage = document.createElement("img");
    postImage.classList.add("img-fluid", "rounded-circle", "pt-n4", "mt-3", "mx-3");
    postImage.style.width = "200px";
    postImage.src = `${avatar}`;
    postImage.alt = `${postData.author.name} profile image`;

    imageColumn.append(postImage);

    const cardColumn = document.createElement("div");
    cardColumn.classList.add("col-md-8");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("class-title");
    cardTitle.textContent = `${postData.title}`;

    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = `${postData.body}`;  // TODO: what if there is no body?

    const loveButton = document.createElement("a");
    loveButton.href = "#";  // TODO: What does this do? Why set to "#"? ANSWER: Not supposed to do anything
    loveButton.classList.add("btn", "btn-primary");
    loveButton.style.marginRight = "10px"; 

    const ns = "http://www.w3.org/2000/svg";
    const loveButtonSvg = document.createElementNS(ns, "svg");
    loveButtonSvg.setAttribute("width", "16");
    loveButtonSvg.setAttribute("height", "16");
    loveButtonSvg.setAttribute("fill", "currentColor");
    loveButtonSvg.setAttribute("class", "bi bi-heart");
    loveButtonSvg.setAttribute("viewBox", "0 0 16 16");
    const loveButtonPath = document.createElementNS(ns, "path");
    loveButtonPath.setAttribute(
        "d",
        "m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
    );

    let totalLoveCount = 0;
    postData.reactions.forEach((reaction) => {
      totalLoveCount += reaction.count;
    });
    const loveButtonCount = document.createElement("span");
    loveButtonCount.classList.add("badge", "rounded-pill", "text-dark");
    loveButtonCount.textContent = totalLoveCount;

    loveButtonSvg.append(loveButtonPath);
    loveButton.append(loveButtonSvg, loveButtonCount);

    const commentButton = document.createElement("a");
    commentButton.href = "#";  // TODO: What does this do? Why set to "#"?
    commentButton.classList.add("btn", "btn-primary");
    commentButton.style.marginRight = "10px"; 

    const commentButtonSvg = document.createElementNS(ns, "svg");
    commentButtonSvg.setAttribute("width", "16");
    commentButtonSvg.setAttribute("height", "16");
    commentButtonSvg.setAttribute("fill", "currentColor");
    commentButtonSvg.setAttribute("class", "bi bi-chat");
    commentButtonSvg.setAttribute("viewBox", "0 0 16 16");
    const commentButtonPath = document.createElementNS(ns, "path");
    commentButtonPath.setAttribute(
        "d",
        "M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"
    );

    commentButtonSvg.append(commentButtonPath);
    commentButton.append(commentButtonSvg);

    // TODO: What is this button for? To view the single post? Maybe rename the variable names to something more appropriate then?
    const arrowButton = document.createElement("a");
    arrowButton.href = "#";  // TODO: What does this do? Why set to "#"?
    arrowButton.classList.add("btn", "btn-primary");

    const arrowButtonSvg = document.createElementNS(ns, "svg");
    arrowButtonSvg.setAttribute("width", "16");
    arrowButtonSvg.setAttribute("height", "16");
    arrowButtonSvg.setAttribute("fill", "currentColor");
    arrowButtonSvg.setAttribute("class", "bi bi-box-arrow-down");
    arrowButtonSvg.setAttribute("viewBox", "0 0 16 16");
    const arrowButtonPath1 = document.createElementNS(ns, "path");
    arrowButtonPath1.setAttribute("fill-rule", "evenodd");
    arrowButtonPath1.setAttribute(
        "d",
        "M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1z"
    );
    const arrowButtonPath2 = document.createElementNS(ns, "path");
    arrowButtonPath2.setAttribute("fill-rule", "evenodd");
    arrowButtonPath2.setAttribute(
        "d",
        "M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z"
    );

    arrowButtonSvg.append(arrowButtonPath1, arrowButtonPath2);
    arrowButton.append(arrowButtonSvg);

    const lastUpdated = document.createElement("p");
    lastUpdated.classList.add("card-text");
    const lastUpdatedText = document.createElement("small");
    lastUpdatedText.classList.add("text-body-secondary");
    lastUpdatedText.textContent = "TODO";
    lastUpdated.append(lastUpdatedText);

    cardBody.append(cardTitle, cardText, loveButton, commentButton, arrowButton, lastUpdated);
    cardColumn.append(cardBody);

    row.append(imageColumn, cardColumn);
    card.append(row);
    post.append(card);

    return post;
}