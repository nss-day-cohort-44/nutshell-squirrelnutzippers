import { useActiveUser } from "../users/UserProvider.js";
import { ArticleCard } from "./ArticleCard.js";
import { getArticles, useArticles } from "./ArticleProvider.js";
// need article form here for event listener
import "./ArticleForm.js";

let articlesArray = [];

export const ArticleList = () => {
  // get articles
  getArticles().then(() => {
    const articleData = useArticles();
    const activeUser = useActiveUser();
    console.log("activeUser: ", activeUser);
    // group active user and friend ids
    const userAndFriendIds = activeUser.friends
      .map((cv) => cv.id)
      .concat(activeUser.id);

    // get all articles from active user and friends
    const filteredArticles = articleData.filter((article) =>
      userAndFriendIds.includes(article.userId)
    );
    articlesArray = filteredArticles;
    render();
  });
};

const render = () => {
  const contentTarget = document.querySelector("#articles");
  console.log("articles array", articlesArray);

  const articlesAsHTML = articlesArray
    .map((article) => ArticleCard(article))
    .join("");

  contentTarget.innerHTML = `
    <h1 class='section--header'>
        News Articles
        <button id="article--add-edit">+add</button>
    </h1>
    <div id="articleForm__container"></div>
    <div class='article--list'>
        ${articlesAsHTML}
    </div>`;
};

const eventHub = document.querySelector(".container");
eventHub.addEventListener("click", (event) => {
  if (event.target.id === "article--add-edit") {
    const articleAddEvent = new CustomEvent("articleAddClicked");
    eventHub.dispatchEvent(articleAddEvent);
  }
});

eventHub.addEventListener("articleStateChanged", ArticleList);