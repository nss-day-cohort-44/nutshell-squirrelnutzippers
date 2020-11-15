import { useActiveUser } from "../users/UserProvider.js";
import { saveArticle } from "./ArticleProvider.js";

const eventHub = document.querySelector(".container");

export const ArticleForm = (articleId) => {
  // logic to determine if this is add new or edit
  const isEdit = () => articleId !== undefined;
  console.log("isEdit: ", isEdit);

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

eventHub.addEventListener("click", (event) => {
  if (event.target.id === "articleForm--submit") {
    const titleInput = document.querySelector("#article--title").value;
    const synopsisInput = document.querySelector("#article--synopsis").value;
    const urlInput = document.querySelector("#article--url").value;

    if (titleInput === "" || synopsisInput === "" || urlInput === "") {
      alert("Please Fill out all Fields in the News Form");
    } else {
      const user = useActiveUser();

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
});
