import { initialCards } from "./scripts/cards.js";
import "./pages/index.css";
import { openPopup, closePopup, closeModalOnOverlay } from "./scripts/modal.js";
import {cardToDelete, createNewCard, likeCard } from "./scripts/card.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import {
  getInitialInfo,
  postNewCard,
  updateUserAvatar,
  updateUserProfile,
  deleteCard as deleteCardFromServer,
} from "./scripts/api.js";

const cardForm = document.forms["new-place"];
const cardNameInput = cardForm.elements["place-name"];
const cardLinkInput = cardForm.elements.link;
const cardsContainer = document.querySelector(".places__list");
const elements = document.querySelector(".places");
const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const closeButtons = document.querySelectorAll(".popup__close");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const popupProfileForm = document.forms["edit-profile"];
const profileAvatar = document.querySelector(".profile__image");
const popupEdit = document.querySelector(".popup_type_edit");
const buttonOpenAddCardPopup = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupAddImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageTitle = document.querySelector(".popup__caption");
const popupAvatar = document.querySelector(".popup__type_edit-avatar");
const popupAvatarForm = document.forms["edit-avatar"];
const buttonOpenPopupAvatar = document.querySelector(
  ".profile__image-container"
);

const popupConfirm = document.querySelector(".popup_type_confirm");
const popupConfirmButton = popupConfirm.querySelector(".popup__button");
const linkInput = popupAvatarForm.querySelector(".popup__input_type_url");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
let userId;

const renderLoading = (isLoading, button) => {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
};

const fillProfileInfo = (userInfo) => {
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
};

const renderInitialCards = (initialCards) => {
  initialCards.forEach((card) => {
    renderCard(
      card,
      userId,
      cardsContainer,
      likeCard,
      removeCard,
      handleCardClick
    );
  });
};

buttonOpenPopupProfile.addEventListener("click", () => {
  openPopup(popupEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  renderLoading(true, popupProfileForm.querySelector(".popup__button"));
  updateUserProfile({
    name: popupProfileForm.name.value,
    about: popupProfileForm.description.value,
  })
    .then((updatedProfile) => {
      fillProfileInfo(updatedProfile);
      closePopup(popupEdit);
      clearValidation(popupProfileForm, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupProfileForm.querySelector(".popup__button"));
    });
};

popupEdit.addEventListener("submit", handleProfileFormSubmit);

popupEdit.addEventListener("click", (evt) => {
  closeModalOnOverlay(evt);
});

const handleAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  renderLoading(true, popupAvatarForm.querySelector(".popup__button"));
  updateUserAvatar(linkInput.value)
    .then((updatedProfile) => {
      fillProfileInfo(updatedProfile);
      closePopup(popupAvatar);
      clearValidation(popupAvatarForm, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupAvatarForm.querySelector(".popup__button"));
    });
};

buttonOpenPopupAvatar.addEventListener("click", (evt) => {
  clearValidation(popupAvatarForm, validationConfig);
  popupAvatarForm.reset();
  openPopup(popupAvatar);
});

popupAvatarForm.addEventListener("submit", handleAvatarFormSubmit);

popupAvatar.addEventListener("click", (evt) => {
  closeModalOnOverlay(evt);
});

buttonOpenAddCardPopup.addEventListener("click", () => {
  openPopup(popupAddCard);
});

function handleCardClick(imageURL, imageAlt, title) {
  popupImage.src = imageURL;
  popupImage.alt = imageAlt;
  popupImageTitle.textContent = title;
  openPopup(popupAddImage);
}

popupAddImage.addEventListener("click", (evt) => {
  closeModalOnOverlay(evt);
});

const handleDeleteCard = () => { 
  deleteCardFromServer(cardToDelete._id) 
    .then(() => { 
      card.remove(); 
      closePopup(popupConfirm); 
    }) 
    .catch((err) => { 
      console.log(err); 
    }); 
}; 

buttonOpenPopupAvatar.addEventListener("click", (evt) => {
  closeModalOnOverlay(evt);
});

popupConfirmButton.addEventListener("click", handleDeleteCard);

const handleNewCardFormSubmit = (evt) => {
  evt.preventDefault();
  renderLoading(true, cardForm.querySelector(".popup__button"));
  const name = cardForm.elements["place-name"].value;
  const link = cardForm.elements.link.value;
  postNewCard({ name, link })
    .then((newCard) => {
      renderCard(
        newCard,
        userId,
        cardsContainer,
        likeCard,
        removeCard,
        handleCardClick,
        "start"
      );
      closePopup(popupAddCard);
      cardForm.reset();
      clearValidation(cardForm, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, cardForm.querySelector(".popup__button"));
    });
};

const fillProfilePopup = (form, name, description) => {
  form.elements.name.value = name;
  form.elements.description.value = description;
};

buttonOpenPopupProfile.addEventListener("click", () => {
  clearValidation(popupProfileForm, validationConfig);
  fillProfilePopup(
    popupProfileForm,
    profileTitle.textContent,
    profileDescription.textContent
  );
  openPopup(popupEdit);
});

popupAddCard.addEventListener("click", (evt) => {
  closeModalOnOverlay(evt);
});

buttonOpenAddCardPopup.addEventListener("click", () => {
  cardForm.reset();
  clearValidation(cardForm, validationConfig);
  openPopup(popupAddCard);
});

cardForm.addEventListener("submit", handleNewCardFormSubmit);

document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup__close")) {
    closePopup(evt.target.parentNode.parentNode);
  }
});

const renderCard = (
  item,
  userId,
  container,
  likeCard,
  removeCard,
  handleCardClick,
  place = "end"
) => {
  const cardElement = createNewCard(
    item,
    userId,
    removeCard,
    likeCard,
    handleCardClick,
    openPopupConfirm
  );
  if (place === "end") {
    container.append(cardElement);
  } else {
    container.prepend(cardElement);
  }
};

const removeCard = (evt, cardId) => {  
  openPopup(popupConfirm);  
popupConfirm.cardId = cardId;  
};  

const openPopupConfirm = ( cardElement ) => { 
  card = cardElement; 
 openPopup(popupConfirm) 
}; 

getInitialInfo()
  .then((result) => {
    const userInfo = result[0];
    userId = userInfo._id;
    const initialCards = result[1];
    fillProfileInfo(userInfo);
    renderInitialCards(initialCards, userId);
  })
  .catch((err) => {
    console.log(err);
  });

enableValidation(validationConfig);
