//открытие popup
export function openPopup(popup) {
  popup.classList.add('popup_is_animated');
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupOnEscape);
}

//закрытие popup
 export function closePopup(popup) {
  document.addEventListener('keydown',closePopupOnEscape);
  popup.classList.remove('popup_is-opened');
}

// Закрытие по Esc
const closePopupOnEscape = (event) => {
  if (event.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
};

// Закрытие по  оверлей
export const closeModalOnOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};

