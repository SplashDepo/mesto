import './index.css';

import { Card } from '../components/Card';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';

import { profileEditPopup, btnOpenEditPopup, nameEditInput, descriptionEditInput, cardPopup, cardPopupOpenBtn, initialCards, settingsList } from '../components/utils/constants.js';

const handleCardClick = function (name, image) {
  popupViewImage.open(name, image);
}

const popupViewImage = new PopupWithImage('.popup_type_image');
popupViewImage.setEventListener();

const profileInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
});

const popupEditeProfile = new PopupWithForm('.popup_type_edit', {
  callbackFormSubmit: (profileData) => {
    profileInfo.setUserInfo({
      name: profileData.name,
      description: profileData.description
    });
    popupEditeProfile.close();
  }
});

popupEditeProfile.setEventListener();

const createCardItem = function (cardData, pic, ik) {
  const cardItem = new Card(cardData, '#card-template', handleCardClick);
  return cardItem.generateCard();
}

const renderInitialCards = new Section({
  items: initialCards,
  renderer: (cardData) => {
    renderInitialCards.addItem(createCardItem(cardData));
  }
}, '.gallery');

renderInitialCards.renderItems();

const popupAddCard = new PopupWithForm('.popup_type_new-card', {
  callbackFormSubmit: (formValues) => {
    renderInitialCards.addItem(createCardItem({
      titel: formValues.titel,
      link: formValues.link
    }));
    popupAddCard.close();
  }
});

popupAddCard.setEventListener();

const cardPopupValidate = new FormValidator(settingsList, cardPopup);
cardPopupValidate.enableValidation();

const profilePopupValidate = new FormValidator(settingsList, profileEditPopup);
profilePopupValidate.enableValidation();

cardPopupOpenBtn.addEventListener('click', () => {
  popupAddCard.open();
  cardPopupValidate.disableSubmitButton()
})

btnOpenEditPopup.addEventListener('click', () => {
  popupEditeProfile.open();
  const currentProfileInfo = profileInfo.getUserInfo();
  nameEditInput.setAttribute('value', currentProfileInfo.name);
  descriptionEditInput.setAttribute('value', currentProfileInfo.description);
})



























// const profileEditPopup = document.querySelector('.popup_type_edit')
// const btnOpenEditPopup = document.querySelector('.profile__edit-button')
// const nameEditInput = profileEditPopup.querySelector('.popup__input_type_name')
// const descriptionEditInput = profileEditPopup.querySelector('.popup__input_type_description')

// const cardPopup = document.querySelector('.popup_type_new-card')
// const cardPopupOpenBtn = document.querySelector('.profile__add-button')
// const cardPopupForm = cardPopup.querySelector('.popup__form')
// const cardPopupSubmitBtn = cardPopup.querySelector('.popup__submit-button')
// const cardInputName = cardPopup.querySelector('.popup__input_type_name')
// const cardInputDescription = cardPopup.querySelector('.popup__input_type_description')

// function addDefaultPopupValue(popupType) {
//   openPopup(popupType)
//   nameEditInput.value = profileName.textContent
//   descriptionEditInput.value = profileDescription.textContent
// }

// function submitEditProfileForm(e) {
//   e.preventDefault();

//   profileName.textContent = nameEditInput.value
//   profileDescription.textContent = descriptionEditInput.value

//   closePopup(profileEditPopup)
// }

// function renderCards(cardData, template) {
//   const card = new Card(cardData, template)
//   return card.generateCard()
// }

// function renderDefaultCards() {
//   initialCards.forEach(item => {
//     cardsContainer.prepend(renderCards(item, '#card-template'))
//   })
// }

// function renderUserCards(e) {
//   e.preventDefault();

//   cardsContainer.prepend(renderCards({
//     name: cardInputName.value,
//     link: cardInputDescription.value
//   }, '#card-template'))

//   cardPopupForm.reset()

//   closePopup(cardPopup)
//   this._submitButton.setAttribute('disabled', 'true');
//   this._submitButton.classList.add('popup__button_disabled');

// }

// renderDefaultCards()

// const cardPopupValidate = new FormValidator(settingsList, cardPopup)
// cardPopupValidate.enableValidation()

// const profilePopupValidate = new FormValidator(settingsList, profileEditPopup)
// profilePopupValidate.enableValidation()


// btnOpenEditPopup.addEventListener('click', () => addDefaultPopupValue(profileEditPopup))
// cardPopupOpenBtn.addEventListener('click', () => openPopup(cardPopup))

// cardPopup.addEventListener('submit', renderUserCards)
// profileEditPopup.addEventListener('submit', submitEditProfileForm)

// popupCloseBtn.forEach(btn => {
//   const popup = btn.closest('.popup')
//   btn.addEventListener('click', () => closePopup(popup))
// })