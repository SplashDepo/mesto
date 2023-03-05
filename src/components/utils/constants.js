const profileEditPopup = document.querySelector('.popup_type_edit')
const btnOpenEditPopup = document.querySelector('.profile__edit-button')
const profileEditPopupForm = profileEditPopup.querySelector('.popup__form')
const nameEditInput = profileEditPopup.querySelector('.popup__input_type_name')
const descriptionEditInput = profileEditPopup.querySelector('.popup__input_type_description')

const cardPopup = document.querySelector('.popup_type_new-card')
const cardPopupOpenBtn = document.querySelector('.profile__add-button')
const cardPopupForm = cardPopup.querySelector('.popup__form')

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const settingsList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

export { profileEditPopup, btnOpenEditPopup, profileEditPopupForm, nameEditInput, descriptionEditInput, cardPopup, cardPopupOpenBtn, cardPopupForm, initialCards, settingsList }