import { Card } from './card.js'
import { initialCards, settingsList } from './settingsInfoList.js'
import { FormValidator } from './FormValidator.js'
import { openPopup, closePopupPressEsc, closePopup } from '../utils/utils.js'

const profileEditPopup = document.querySelector('.popup_type_edit')
const btnOpenEditPopup = document.querySelector('.profile__edit-button')
const nameEditInput = profileEditPopup.querySelector('.popup__input_type_name')
const descriptionEditInput = profileEditPopup.querySelector('.popup__input_type_description')

const cardPopup = document.querySelector('.popup_type_new-card')
const cardPopupOpenBtn = document.querySelector('.profile__add-button')
const cardPopupForm = cardPopup.querySelector('.popup__form')
const cardPopupSubmitBtn = cardPopup.querySelector('.popup__submit-button')
const cardInputName = cardPopup.querySelector('.popup__input_type_name')
const cardInputDescription = cardPopup.querySelector('.popup__input_type_description')



const popupCloseBtn = document.querySelectorAll('.popup__close-button')

const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')

const cardsContainer = document.querySelector('.gallery')

// const popupList = Array.from(document.querySelectorAll('.popup'))





function addDefaultPopupValue(popupType) {
  openPopup(popupType)
  nameEditInput.value = profileName.textContent
  descriptionEditInput.value = profileDescription.textContent
}

function submitEditProfileForm(e) {
  e.preventDefault();

  profileName.textContent = nameEditInput.value
  profileDescription.textContent = descriptionEditInput.value

  closePopup(profileEditPopup)
}

function renderCards(cardData, template) {
  const card = new Card(cardData, template)
  return card.generateCard()
}

function renderDefaultCards() {
  initialCards.forEach(item => {
    cardsContainer.prepend(renderCards(item, '#card-template'))
  })
}

function renderUserCards(e) {
  e.preventDefault();

  cardsContainer.prepend(renderCards({
    name: cardInputName.value,
    link: cardInputDescription.value
  }, '#card-template'))

  cardPopupForm.reset()

  closePopup(cardPopup)
  cardPopupSubmitBtn.setAttribute('disabled', 'true');
  cardPopupSubmitBtn.classList.add('popup__button_disabled');

}

renderDefaultCards()

const cardPopupValidate = new FormValidator(settingsList, cardPopup)
cardPopupValidate.enableValidation()

const profilePopupValidate = new FormValidator(settingsList, profileEditPopup)
profilePopupValidate.enableValidation()


btnOpenEditPopup.addEventListener('click', () => addDefaultPopupValue(profileEditPopup))
cardPopupOpenBtn.addEventListener('click', () => openPopup(cardPopup))

cardPopup.addEventListener('submit', renderUserCards)
profileEditPopup.addEventListener('submit', submitEditProfileForm)

popupCloseBtn.forEach(btn => {
  const popup = btn.closest('.popup')
  btn.addEventListener('click', () => closePopup(popup))
})