/**
 * This JS File Will Handle All Blog Articles
 */

/**
 * Fetching The API
 */

const apiUrl = "https://benafrica-api.herokuapp.com";

let accessToken = ("; " + document.cookie)
  .split(`; accessToken=`)
  .pop()
  .split(";")[0];
const bearer = `Bearer ${accessToken}`;

/**
 * Creating A Blog Article
 */

const createArticleForm = () => {
  const title = document.getElementById("articleTitle").value;
  const articleContent = document.getElementById("articleContent").value;
  return {title, articleContent};
};

const createArticle = document.getElementById("createArticleBut");

createArticle.addEventListener("click", (e) => {
  e.preventDefault();
  newArticle();
});

const newArticle = async () => {
  console.log(createArticleForm());
  try {
    fetch(`${apiUrl}/api/v1/admin/blog_articles`, {
      method: "POST",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: createArticleForm().title,
        articleContent: createArticleForm().articleContent,
      }),
    })
      .then((res) => {
        if (res.ok === true) return res.json();
        else throw new Error(`Error Happened...>> Status Code: ${res.status}`);
      })
      .then((data) => {
        alert("Article Created Successfully");
        clearArticleForm();
      });
  } catch (error) {
    console.log(error);
  }
};

const clearArticleForm = () => {
  const articleForm = document.getElementById("articleForm");
  articleForm.reset();
  return false;
};

/**
 * Logout Fetch
 */

const logout = () => {
  fetch(`${apiUrl}/api/v1/auth/logout`, {
    method: "DELETE",
    headers: {Authorization: bearer},
  })
    .then((res) => {
      if (res.ok === true) return res.json();
      else throw new Error(`Error Happened...>> Status Code: ${res.status}`);
    })
    .then((data) => {
      document.cookie = `accessToken=${accessToken};path=/; max-age=0; sameSite=Lax;`;
      return (window.location.href = "../../index.html");
    });
};
