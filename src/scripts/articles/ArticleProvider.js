const eventHub = document.querySelector(".container");

let articles = [];

const dispatchStateChangeEvent = () => {
  const articleStateChanged = new CustomEvent("articleStateChanged");
  eventHub.dispatchEvent(articleStateChanged);
  //   window.localStorage.setItem("articleUpdated", true);
};

export const getArticles = () => {
  return fetch("http://localhost:8088/articles")
    .then((response) => response.json())
    .then((articlesData) => {
      articles = articlesData;
    });
};

export const saveArticle = (articleObj) => {
  return fetch("http://localhost:8088/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(articleObj),
  }).then(dispatchStateChangeEvent);
};

export const updateArticle = (articleObj) => {
  return fetch(`http://localhost:8088/articles/${articleObj.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(articleObj),
  }).then(dispatchStateChangeEvent);
};

export const deleteArticle = (id) => {
  return fetch(`http://localhost:8088/articles/${id}`, {
    method: "DELETE",
  }).then(dispatchStateChangeEvent);
};

export const useArticles = () => {
  return articles.slice();
};
