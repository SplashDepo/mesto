import { Card } from './card.js'
import { initialCards, settingsList } from './settingsInfoList.js'
import { FormValidator } from './FormValidator.js'

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

export const imagePopup = document.querySelector('.popup_type_image')
export const imagePopupPhoto = imagePopup.querySelector('.popup__image')
export const imagePopupDescription = imagePopup.querySelector('.popup__description')

const popupCloseBtn = document.querySelectorAll('.popup__close-button')

const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')

const cardsContainer = document.querySelector('.gallery')

const popupList = Array.from(document.querySelectorAll('.popup'))

function closePopupPressEsc(e) {
  if (e.key === "Escape") {
    const openEl = document.querySelector('.popup_active')
    closePopup(openEl)
  }

}

export function openPopup(popupType) {
  popupType.classList.add('popup_active')
  document.addEventListener('keydown', closePopupPressEsc)
}

function closePopup(popupType) {
  popupType.classList.remove('popup_active')
  document.removeEventListener('keydown', closePopupPressEsc);
}

function addDefaultPopupValue(popupType) {
  openPopup(popupType)
  nameEditInput.value = profileName.textContent
  descriptionEditInput.value = profileDescription.textContent
}

function handleFormSubmit(e) {
  e.preventDefault();

  profileName.textContent = nameEditInput.value
  profileDescription.textContent = descriptionEditInput.value

  closePopup(profileEditPopup)
}

function renderCards(object, template) {
  const card = new Card(object, template)
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
  cardPopupSubmitBtn.classList.add(this._object.inactiveButtonClass);
}

renderDefaultCards()

const cardPopupValidate = new FormValidator(settingsList, cardPopup)
cardPopupValidate.enableValidation()

const profilePopupValidate = new FormValidator(settingsList, profileEditPopup)
profilePopupValidate.enableValidation()


btnOpenEditPopup.addEventListener('click', () => addDefaultPopupValue(profileEditPopup))
cardPopupOpenBtn.addEventListener('click', () => openPopup(cardPopup))

cardPopup.addEventListener('submit', renderUserCards)
profileEditPopup.addEventListener('submit', handleFormSubmit)

popupCloseBtn.forEach(btn => {
  const popup = btn.closest('.popup')
  btn.addEventListener('click', () => closePopup(popup))
})