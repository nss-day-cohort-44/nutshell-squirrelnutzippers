import { deleteArticle } from "./ArticleProvider.js";
import { useActiveUser } from "../users/UserProvider.js";

export const ArticleCard = (articleObj) => {
  const date = new Date(articleObj.timestamp).toDateString();
  const activeUser = useActiveUser();

  // EXTRACT THIS FUNCTIONALITY TO HELPER METHOD
  const eventCreator = useUsers().find((user) => user.id === eventObj.userId);

  const isFriend = activeUser.friends.find(
    (friend) => friend.id === eventCreator.id
  );
  if (isFriend) {
    console.log("isFriend: ", isFriend);
  }

  const articleAsHTML = `
  <div class="article card">
    <div>${articleObj.title}</div>
    <div>${articleObj.synopsis}</div>
    <div>${articleObj.url}</div>
    <div>${date}</div>
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
