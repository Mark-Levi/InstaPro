import { USER_POSTS_PAGE, CHANGE_LIKE_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage,getToken } from "../index.js";

import { formatDistanceToNow } from "date-fns";
import { ru } from 'date-fns/locale';

function ucFirst(str) {
  return str? str[0].toUpperCase() + str.slice(1): str;
 }

function timePassed(startDate){ 
 return startDate? formatDistanceToNow(
  new Date(startDate),
   { locale: ru })
: "Неверная дата";
}

export function renderPostsPageComponent({ appEl }) {
 
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">`+
    posts.map((post, id) => {
      return ` <li class="post">
                    <div class="post-header" data-user-id="${post.user.id}">
                        <img src=${post.user.imageUrl} class="post-header__user-image">
                        <p class="post-header__user-name">${post.user.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src=${post.imageUrl}>
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${post.id}" data-post-isLiked="${post.isLiked}" class="like-button">
                        <img src="./assets/images/${(post.isLiked ? "like-active.svg" : "like-not-active.svg")}">
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>
                        ${post.likes.length === 0 ? 0 : post.likes[post.likes.length - 1].name + ((post.likes.length > 1) ? " и еще " + (post.likes.length - 1) : "")}
                         
                        </strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${post.user.name}</span>
                      ${post.description}
                    </p>
                    <p class="post-date">
                      ${ucFirst(timePassed(post.createdAt)) + " тому назад"}
                    </p>
                  </li>`
    }) + `             
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

  for (let likeEl of document.querySelectorAll(".like-button")) {
    let a = likeEl.dataset.postId;
    likeEl.addEventListener("click", () => {
      if (!getToken()) {
      alert("Лайкать посты могут только авторизованные пользователи!");
      return;
      }
        goToPage(CHANGE_LIKE_PAGE, {
        postId: likeEl.dataset.postId,
      });
    });
  }
}
