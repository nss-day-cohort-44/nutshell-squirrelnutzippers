import { useActiveUser } from "../users/UserProvider.js";
import { saveArticle, useArticles, updateArticle } from "./ArticleProvider.js";

const eventHub = document.querySelector(".container");

export const ArticleForm = (articleId) => {
  // logic to determine if this is add new or edit
  const isEdit = () => articleId !== undefined;

  let articleToEdit;

  if (isEdit()) {
    articleToEdit = useArticles().find((article) => article.id === articleId);

    return `
    <div class="form">
    <input type="hidden" id="article--id" value="${articleToEdit.id}">
      <input id="article--title" type="text" placeholder="title" value="${articleToEdit.title}"/>
      <input id="article--synopsis" type="text" placeholder="synopsis" value="${articleToEdit.synopsis}"/>
      <input id="article--url" type="text" placeholder="url" value="${articleToEdit.url}"/>
      <button id="articleForm--submit">submit</button>
    </div>
      `;
  }

  return `
    <div class="form">
      <input id="article--title" type="text" placeholder="title"/>
      <input id="article--synopsis" type="text" placeholder="synopsis"/>
      <input id="article--url" type="text" placeholder="url"/>
      <button id="articleForm--submit">submit</button>
    </div>
      `;
};

eventHub.addEventListener("articleAddClicked", (event) => {
  const contentTarget = document.querySelector("#articleForm__container");
  contentTarget.innerHTML = ArticleForm();
});

eventHub.addEventListener("articleEditClicked", (event) => {
  const articleId = event.detail.articleId;
  const contentTarget = document.querySelector("#articleForm__container");
  contentTarget.innerHTML = ArticleForm(articleId);
});

eventHub.addEventListener("click", (event) => {
  // Check article submit button was clicked
  if (event.target.id === "articleForm--submit") {
    // get form input values
    const titleInput = document.querySelector("#article--title").value;
    const synopsisInput = document.querySelector("#article--synopsis").value;
    const urlInput = document.querySelector("#article--url").value;
    const hiddenId = document.querySelector("#article--id");

    if (titleInput === "" || synopsisInput === "" || urlInput === "") {
      alert("Please Fill out all Fields in the Article Form");
    } else {
      const user = useActiveUser();

      // CHECK IF EDITING OR CREATING NEW
      if (hiddenId) {
        const editedArticle = {
          id: parseInt(hiddenId.value),
          title: titleInput,
          synopsis: synopsisInput,
          url: urlInput,
          timestamp: Date.now(),
          userId: user.id,
        };
        updateArticle(editedArticle);
      } else {
        const newArticle = {
          title: titleInput,
          synopsis: synopsisInput,
          url: urlInput,
          timestamp: Date.now(),
          userId: user.id,
        };
        saveArticle(newArticle);
      }
    }
  }
});
