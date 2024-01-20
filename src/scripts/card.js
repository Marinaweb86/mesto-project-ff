import {handleCardClick} from '../index';
export function createNewCard({ name, link},removeCard,handleCardClick) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardTitle = cardElement.querySelector(".card__title");
  cardDeleteButton.addEventListener('click', removeCard);

  cardImage.src = link;
  cardImage.alt = `Фотография: ${name}`;
  cardTitle.textContent = name;

  cardImage.addEventListener("click", () => {
    handleCardClick(name, link);
  });
   
    cardLikeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like-button_is-active");
    })
  

  return cardElement;
}

export function removeCard (event) {
  const cardElement = event.target.closest('.card');
  cardElement.remove();
}
 