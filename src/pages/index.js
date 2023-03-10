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

const createCardItem = function (cardData) {
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
      name: formValues.title,
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