import { deleteArticle } from "./ArticleProvider.js";
import { useActiveUser, useUsers } from "../users/UserProvider.js";

export const ArticleCard = (articleObj) => {
  const date = new Date(articleObj.timestamp).toLocaleDateString();

  const activeUser = useActiveUser();

  // EXTRACT THIS FUNCTIONALITY TO HELPER METHOD vv (also in event card)
  const eventCreator = useUsers().find((user) => user.id === articleObj.userId);

  const isFriend = activeUser.friends.find(
    (friend) => friend.id === eventCreator.id
  );
  // EXTRACT TO HERE ^^

  // ! NORMALIZE URLS

  const articleAsHTML = `
  <div class="article card card-bkg">
    <div class="article-title"><a href="${
      articleObj.url
    }" target="blank" rel= “noopener">${articleObj.title}</a></div>
    <div class="article-synopsis">${articleObj.synopsis}</div>
    <div class="article-details">
      <div class="article-date">posted ${
        activeUser.id !== articleObj.userId
          ? `by: ${eventCreator.username}`
          : ""
      }  - ${date}</div>
      ${
        activeUser.id === articleObj.userId
          ? `<div class="icons__container">
          <i id="delete-article--${articleObj.id}" class="far fa-trash-alt"></i>
          <i id="edit-article--${articleObj.id}" class="far fa-edit"></i>
          </div>
          `
          : ""
      }
    </div>
  </div>
  `;
  return articleAsHTML;
};

const eventHub = document.querySelector(".container");
eventHub.addEventListener("click", (event) => {
  if (event.target.id.startsWith("delete-article--")) {
    const [prefix, articleId] = event.target.id.split("--");
    deleteArticle(parseInt(articleId));
  }
  if (event.target.id.startsWith("edit-article--")) {
    const [prefix, articleId] = event.target.id.split("--");
    const articleEditEvent = new CustomEvent("articleEditClicked", {
      detail: {
        articleId: parseInt(articleId),
      },
    });
    eventHub.dispatchEvent(articleEditEvent);
  }
});
