// Замени на свой, чтобы получить независимый от других набор данных.
// "боевая" версия инстапро лежит в ключе prod

const personalKey = "olya-jacobs";
// const personalKey = "prod";
const baseHost = "https://webdev-hw-api.vercel.app";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;
const a = "https://webdev-hw-api.vercel.app/api/v1/olya-jacobs/instapro";
const b = "https://webdev-hw-api.vercel.app/api/user/login";
const c = "https://webdev-hw-api.vercel.app/api/v1/prod/instapro/user-posts/643b981799ab77ea2d75bb29";

export function changeLike({ token, id = "",isLike }) {
  //Ставим-снимаем лайк
  const a=postsHost + "/" +id+ (isLike? "/dislike" : "/like");
  return fetch(postsHost + "/"+ id+ (isLike? "/dislike" : "/like"), {
    method: "POST",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.post;
    });
}

export function uploadPost({ token, description, imageUrl }) {
  // Запись нового поста
  return fetch(postsHost, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      description,
      imageUrl
    }),
  }).then((response) => {
    if (response.status === 201) {
      return response.json();
    } else if (response.status === 401) {
      console.log("Ошибка авторизации");
      throw new Error("Нет авторизации");
    } else {
      console.log("Прочие ошибки");
      throw new Error("Прочие ошибки записи поста");
    }
  });
}

export function getPosts({ token, id = "" }) {
  //Загрузка постов
  const a = postsHost + "/user-posts/" + id;
  return fetch(id ? (postsHost + "/user-posts/" + id) : postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
        throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
    
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => {
    if (response.status === 400) {
      
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}
