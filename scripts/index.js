const cardTemplate = document.querySelector("#card-template").content;
const cardForm = document.forms["new-place"];
const cardNameInput = cardForm.elements["place-name"];
const cardLinkInput = cardForm.elements.link;
const cardsContainer = document.querySelector(".places__list");

function createNewCard({ name, link }) {
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
  });

  function removeCard (event) {
     cardElement.remove();
  }

  return cardElement;
}

initialCards.forEach((item) => cardsContainer.prepend(createNewCard(item)));
