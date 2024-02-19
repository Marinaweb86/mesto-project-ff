export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-7",
  headers: {
    authorization: "ef8733b6-6b7f-4484-b0cc-5af222268013",
    "Content-Type": "application/json",
  },
};

const getResponseData = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

const getInitialCards = async () => {
  return fetch(config.baseUrl + "/cards", {
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

const getUserInfo = async () => {
  return fetch(config.baseUrl + "/users/me", {
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

const getInitialInfo = async () => {
  return Promise.all([getUserInfo(), getInitialCards()]);
};

const updateUserProfile = async (userProfileData) => {
  return fetch(config.baseUrl + "/users/me", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userProfileData.name,
      about: userProfileData.about,
    }),
  }).then((res) => getResponseData(res));
};

const postNewCard = async (cardData) => {
  return fetch(config.baseUrl + "/cards", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  }).then((res) => getResponseData(res));
};

const putLike = async (cardId) => {
  return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

const deleteLike = async (cardId) => {
  return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

const deleteCard = async (cardId) => {
  return fetch(config.baseUrl + `/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

const updateUserAvatar = async (avatarLink) => {
  return fetch(config.baseUrl + "/users/me/avatar", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then((res) => getResponseData(res));
};

export {
  getInitialCards,
  getUserInfo,
  getInitialInfo,
  updateUserProfile,
  postNewCard,
  putLike,
  deleteLike,
  deleteCard,
  updateUserAvatar,
};
