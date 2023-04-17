import { uploadPost } from "../api.js";
import { getToken} from "../index.js";
// import { POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

let imageUrl = "";
let description = "";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>`+
      `       
    <div class="form">
      <h3 class="form-title">Добавить пост</h3>
      <div class="form-inputs">
        <div class="upload-image-container">
          <div class="upload=image">
      
            <label class="file-upload-label secondary-button">
                <input type="file" class="file-upload-input" style="display:none">
                Выберите фото
            </label>
          </div>
        </div>
        <label>
          Опишите фотографию:
          <textarea class="input textarea" id ="input_description" rows="4"></textarea>
         </label>
         <button class="button" id="add-button">Добавить</button>
      </div>
    </div>
    
  `;

    appEl.innerHTML = appHtml;
    // Формирование шапки страницы
    renderHeaderComponent({ element: document.querySelector(".header-container"), });
    // Обработка выбора изображения поста
    renderUploadImageComponent({
      element: document.querySelector(".upload-image-container"),
      onImageUrlChange: (newImageUrl) => { imageUrl = newImageUrl; }
    });
    // Обработка клика на кнопке "Добавить" 
    document.getElementById("add-button").addEventListener("click", () => {
      // Проверка заполнения полей
      const normalizedDescription = document.getElementById("input_description").value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");

      if (normalizedDescription === "") {
        alert("Введите описание фотографии");
        return;
      }
      if (imageUrl === "") {
        alert("Выберите фотографию");
        return;
      }

      uploadPost({
        token: getToken(),
        description: normalizedDescription,
        imageUrl:imageUrl,
      });
      onAddPostClick();
    });
  };
  
  // page = POSTS_PAGE;
  render();
}
