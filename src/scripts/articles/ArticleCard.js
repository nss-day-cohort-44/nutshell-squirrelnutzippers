import { deleteArticle } from "./ArticleProvider.js";
import { useActiveUser } from "../users/UserProvider.js";

export const ArticleCard = (articleObj) => {
  const date = new Date(articleObj.timestamp).toDateString();
  const activeUser = useActiveUser();

  const articleAsHTML = `
  <div class="article card">
    <div>${articleObj.title}</div>
    <div>${articleObj.synopsis}</div>
    <div>${articleObj.url}</div>
    <div>${date}</div>
    ${
      activeUser.id === articleObj.userId
        ? `<button id="delete-article--${articleObj.id}">delete article</button>`
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
});
