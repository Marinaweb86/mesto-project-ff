import { initialCards } from './scripts/cards.js';
import './pages/index.css';
import {openPopup,closePopup,closeModalOnOverlay} from './scripts/modal.js';
import {createNewCard,removeCard,likeCard} from './scripts/card.js'; 
const cardForm = document.forms["new-place"];
const cardNameInput = cardForm.elements["place-name"];
const cardLinkInput = cardForm.elements.link;
const cardsContainer = document.querySelector(".places__list");

const elements = document.querySelector('.places');

const editProfileButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const closeButtons = document.querySelectorAll('.popup__close');

const popupEdit = document.querySelector('.popup_type_edit');
const profileForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const inputTitle = document.querySelector('.popup__input_type_card-name');
const inputUrl = document.querySelector('.popup__input_type_url');
const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');
const addImagePopup = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__caption');
 
initialCards.forEach((item) => cardsContainer.prepend(createNewCard(item,removeCard,likeCard,handleCardClick)));

//закрытие всех popup
//находим все крестики проекта по универсальному селектору
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

//открытие popupEdit
editProfileButton.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

//сохранение popupEdit
function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEdit);
}
popupEdit.addEventListener('submit', handleProfileFormSubmit);

//открытие addCardPopup
addCardButton.addEventListener('click', () => {
  openPopup(addCardPopup) ;
});

//добавление карточки 
function renderCard(card) {
  cardsContainer.prepend(card);
}

//сохранение addCardPopup
function submitAddCardForm(event) {
  event.preventDefault();

  const item = {};
    item['name'] = inputTitle.value;
    item['link'] = inputUrl.value;

  renderCard(createNewCard(item));
  event.target.reset();
  closePopup(addCardPopup);
}

addCardPopup.addEventListener('submit', submitAddCardForm);

//открытие полноразмерного изображения
 function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = `Фотография: ${name}`;
  popupImageTitle.textContent = name;
  openPopup(addImagePopup);
}

// Закрытие addImagePopup по оверлей
addImagePopup.addEventListener("click", (evt) => {
  closeModalOnOverlay(evt);
});

//Закрытие popupEdit по овeрлей
popupEdit.addEventListener("click", (evt) => {
  closeModalOnOverlay(evt);
}) 

//Закрытие addCardPopup по оверлей
addCardPopup.addEventListener("click", (evt) => {
  closeModalOnOverlay(evt);
});
