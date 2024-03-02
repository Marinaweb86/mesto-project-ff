import { putLike, deleteLike } from "./api.js";
import { openPopup } from "./modal.js";
const cardTemplate = document.querySelector("#card-template").content;
const popupConfirm = document.querySelector(".popup_type_confirm");
const popupConfirmButton = popupConfirm.querySelector(".popup__button");

export let cardToDelete = { handleDeleteCard: null, _id: null };

export const createNewCard = (
  card,
  userId,
  likeCard,
  handleCardClick,
  handleDeleteCard,
  openPopupConfirm
) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeCount = cardElement.querySelector(".card__like-count");
  popupConfirmButton.addEventListener("click", () => {
    cardToDelete.handleDeleteCard = cardElement.remove;
    cardToDelete._id = card._id;
    handleDeleteCard();
  });

  cardElement.dataset.cardId = card._id;
  cardElement.dataset.ownerId = card.owner._id;
  cardImage.src = card.link;
  cardImage.alt = card.description;
  cardTitle.textContent = card.name;

  cardLikeCount.textContent = card.likes.length;
  const isLiked = card.likes.some((like) => like._id === userId);
  if (isLiked) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  if (card.owner._id === userId) {
    cardDeleteButton.addEventListener("click", (evt) => {
      cardToDelete._id = card._id;
    openPopupConfirm();
    });
  } else {
    cardDeleteButton.remove();
  }

  cardLikeButton.addEventListener("click", (evt) => {
    likeCard(evt, card._id);
  });

  cardImage.addEventListener("click", () => {
    handleCardClick(cardImage.src, cardImage.alt, cardTitle.textContent);
  });

  return cardElement;
};

const likeCard = (evt, cardId) => {
  let currentLikes = evt.target.parentNode.querySelector(".card__like-count");

  if (evt.target.classList.contains("card__like-button_is-active")) {
    deleteLike(cardId)
      .then((updatedCard) => {
        evt.target.classList.remove("card__like-button_is-active");
        currentLikes.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    putLike(cardId)
      .then((updatedCard) => {
        evt.target.classList.add("card__like-button_is-active");
        currentLikes.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export { likeCard };
