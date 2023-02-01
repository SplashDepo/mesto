const profileEditPopup = document.querySelector('.popup_type_edit')
const btnOpenEditPopup = document.querySelector('.profile__edit-button')
const btnCloseEditPopup = profileEditPopup.querySelector('.popup__close-button')
const nameEditInput = profileEditPopup.querySelector('.popup__input_type_name')
const descriptionEditInput = profileEditPopup.querySelector('.popup__input_type_description')

const cardPopup = document.querySelector('.popup_type_new-card')
const cardPopupOpenBtn = document.querySelector('.profile__add-button')
const cardPopupCloseBtn = cardPopup.querySelector('.popup__close-button')
const cardPopupForm = cardPopup.querySelector('.popup__form')
const cardPopupSubmitBtn = cardPopup.querySelector('.popup__submit-button')
const cardInputName = cardPopup.querySelector('.popup__input_type_name')
const cardInputDescription = cardPopup.querySelector('.popup__input_type_description')

const imagePopup = document.querySelector('.popup_type_image')
const imagePopupCloseBtn = imagePopup.querySelector('.popup__close-button')
const imagePopupPhoto = imagePopup.querySelector('.popup__image')
const imagePopupDescription = imagePopup.querySelector('.popup__description')

const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')

const popupList = Array.from(document.querySelectorAll('.popup'))

popupList.forEach(popupItem => {
  popupItem.addEventListener('click', e => {
    if (e.target.classList.contains('popup_active')) {
      closePopup(popupItem)
    }
  })
})

function closePopupPressEsc(e) {
  if (e.key === "Escape") {
    const openEl = document.querySelector('.popup_active')
    closePopup(openEl)
  }

}

function openPopup(popupType) {
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

const cardsContainer = document.querySelector('.gallery')
const cardTemplate = document.querySelector('#card-template')
  .content
  .querySelector('.card');

function createCard(title, image) {
  const card = cardTemplate.cloneNode(true)

  const cardTitel = card.querySelector('.card__title')
  cardTitel.textContent = title

  const cardImage = card.querySelector('.card__image')
  cardImage.src = image
  cardImage.alt = title
  cardImage.addEventListener('click', viewPhoto)


  card.querySelector('.card__delete-button').addEventListener('click', deleteCard)
  card.querySelector('.card__like-button').addEventListener('click', likeCard)

  function viewPhoto(e) {
    openPopup(imagePopup)
    imagePopupPhoto.src = e.target.src
    imagePopupPhoto.alt = title
    imagePopupDescription.textContent = cardTitel.textContent
  }

  return card
}

function deleteCard(e) {
  e.target.closest('.card').remove()
}

function likeCard(e) {
  e.target.classList.toggle('card__like-button_active')
}

function addCard(card) {
  cardsContainer.prepend(card)
}

function renderDefaultCards(arr) {
  arr.reverse().forEach(el => {
    const defaultCardHtml = createCard(el.name, el.link)
    addCard(defaultCardHtml)
  })
}

function renderUserCards(e) {
  e.preventDefault();
  const userCardHtml = createCard(cardInputName.value, cardInputDescription.value)
  addCard(userCardHtml)

  cardPopupForm.reset()

  addInvalidState(cardPopupSubmitBtn)

  closePopup(cardPopup)
}

renderDefaultCards(initialCards)

btnOpenEditPopup.addEventListener('click', () => addDefaultPopupValue(profileEditPopup))
btnCloseEditPopup.addEventListener('click', () => closePopup(profileEditPopup))
profileEditPopup.addEventListener('submit', handleFormSubmit)

cardPopupOpenBtn.addEventListener('click', () => openPopup(cardPopup))
cardPopupCloseBtn.addEventListener('click', () => closePopup(cardPopup))
cardPopup.addEventListener('submit', renderUserCards)

imagePopupCloseBtn.addEventListener('click', () => closePopup(imagePopup))