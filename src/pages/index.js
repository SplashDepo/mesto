import './index.css';

import { Card } from '../components/Card';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupNotice } from '../components/PopupNotice';
import { Api } from '../components/Api';
import { apiAuthorization } from '../components/utils/apiAuthorization';

import { profileEditPopup, btnOpenEditPopup, nameEditInput, descriptionEditInput, cardPopup, cardPopupOpenBtn, settingsList, avatarPopupOpenBtn, avatarPopupForm } from '../components/utils/constants.js';

let userId;

const apiConnect = new Api(apiAuthorization);

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
});

const popupViewImage = new PopupWithImage('.popup_type_image');
popupViewImage.setEventListener();

const renderCard = function (cardObject) {
  const cardItem = new Card(cardObject, '#card-template', userId, {
    cardId: cardObject._id,
    authorId: cardObject.owner._id
  }, {
    hendelViewImage: (name, image) => {
      popupViewImage.open(name, image)
    },
    hendelCardDelete: (cardElement, cardId) => {
      popupNotice.open(cardElement, cardId)
    },
    hendelAddCardlike: (cardId) => {
      apiConnect.addCardLike(cardId)
        .then((res) => {
          cardItem.renderCardLike(res)
        })
        .catch((err) => {
          console.log(`Возникла ошибка при постановке лайка ${err}`)
        })
    },
    hendelRemoveCardLike: (cardId) => {
      apiConnect.deleteCardLike(cardId)
        .then((res) => {
          cardItem.renderCardLike(res)
        })
        .catch((err) => {
          console.log(`Возникла ошибка при снятии лайка${err}`)
        })
    }
  });
  return cardItem.generateCard();
}

const renderInitialCards = new Section({
  renderer: (cardObject) => {
    renderInitialCards.addItem(renderCard(cardObject))
  }
}, '.gallery');


Promise.all([apiConnect.getUserData(), apiConnect.getInitialCards()])
  .then(([userProfileData, cardObject]) => {
    userId = userProfileData._id;
    userInfo.setUserInfo({ name: userProfileData.name, description: userProfileData.about });
    userInfo.setUserAvatar(userProfileData.avatar);
    renderInitialCards.renderItems(cardObject);
  })
  .catch((err) => {
    console.log(`Возникла глобальная ошибка${err}`)
  });

const popupAvatar = new PopupWithForm('.popup_type_avatar', {
  callbackFormSubmit: (userProfileData) => {
    popupAvatar.changeSavingProcessText();
    apiConnect.sendAvatarData(userProfileData)
      .then((res) => {
        userInfo.setUserAvatar(res.avatar);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(`Возникла ошибка при обновлении аватара ${err}`)
      })
      .finally(() => {
        popupAvatar.returnSavingProcessText();
      })
  }
});

popupAvatar.setEventListener();

const popupNotice = new PopupNotice('.popup_type_delete', {
  callbackNotice: (cardElement, cardId) => {
    apiConnect.deleteCard(cardId)
      .then(() => {
        cardElement.deleteCard(cardId);
        popupNotice.close()
      })
      .catch((err) => {
        console.log(`Возникла ошибка при удалении карточки ${err}`)
      })
  }
});
popupNotice.setEventListener();

const popupEditeProfile = new PopupWithForm('.popup_type_edit', {
  callbackFormSubmit: userProfileData => {
    popupEditeProfile.changeSavingProcessText();
    apiConnect.sendUserData(userProfileData)
      .then(res => {
        userInfo.setUserInfo({ name: res.name, description: res.about })
        popupEditeProfile.close();
      })
      .catch(err => console.log(`Возникла ошибка${err}`))
      .finally(() => popupEditeProfile.returnSavingProcessText())
  }
});

popupEditeProfile.setEventListener();

const popupAddCard = new PopupWithForm('.popup_type_new-card', {
  callbackFormSubmit: (formValues) => {
    popupAddCard.changeSavingProcessText();
    apiConnect.addCard({ name: formValues.title, link: formValues.link })
      .then(card => {
        renderInitialCards.addItem(renderCard(card));
        popupAddCard.close();
      })
      .catch(err => console.log(`Возникла ошибка${err}`))
      .finally(() => popupAddCard.returnSavingProcessText())
  }
});

popupAddCard.setEventListener();

const cardPopupValidate = new FormValidator(settingsList, cardPopup);
cardPopupValidate.enableValidation();

const profilePopupValidate = new FormValidator(settingsList, profileEditPopup);
profilePopupValidate.enableValidation();

const avatarPopupValidate = new FormValidator(settingsList, avatarPopupForm);
avatarPopupValidate.enableValidation();

avatarPopupOpenBtn.addEventListener('click', () => {
  popupAvatar.open();
  avatarPopupValidate.resetValidate()
})

cardPopupOpenBtn.addEventListener('click', () => {
  popupAddCard.open();
  cardPopupValidate.resetValidate()
})

btnOpenEditPopup.addEventListener('click', () => {
  popupEditeProfile.open();
  const currentuserInfo = userInfo.getUserInfo();
  nameEditInput.value = currentuserInfo.name
  descriptionEditInput.value = currentuserInfo.description;
})