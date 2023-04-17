import { USER_POSTS_PAGE, CHANGE_LIKE_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";

import { formatDistance } from "date-fns";
import { ru } from 'date-fns/locale';

function timePassed(startDate)  {
 
  if (!startDate) {
    return "Fault"
  }
 console.log(startDate);
 console.log(typeof(startDate));

  const timeInterval = formatDistance(
    new Date(startDate),
    new Date(),
    {locale: ru},
);
  return timeInterval;
  
}
export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
 

  /**
   *  (post.likes.length >1) ? "и еще " +(post.likes.length-1):""}
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
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
                      ${timePassed(post.createdAt)}
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
    let a =likeEl.dataset.postId;
    likeEl.addEventListener("click", () => {
      console.log(likeEl.dataset.postId);
      goToPage(CHANGE_LIKE_PAGE, {
        postId: likeEl.dataset.postId,
        postIsLiked: likeEl.dataset.postIsLiked,
      });
    });
   }
}
