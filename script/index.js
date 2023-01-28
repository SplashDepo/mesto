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

const editProfilePopup = document.querySelector('.popup_type_edit')
const editPopupOpenBtn = document.querySelector('.profile__edit-button')
const editPopupCloseBtn = editProfilePopup.querySelector('.popup__close-button')
const editInputName = editProfilePopup.querySelector('.popup__input_type_name')
const editInputDescription = editProfilePopup.querySelector('.popup__input_type_description')

const cardPopup = document.querySelector('.popup_type_new-card')
const cardPopupOpenBtn = document.querySelector('.profile__add-button')
const cardPopupCloseBtn = cardPopup.querySelector('.popup__close-button')
const cardPopupForm = cardPopup.querySelector('.popup__form')
const cardInputName = cardPopup.querySelector('.popup__input_type_name')
const cardInputDescription = cardPopup.querySelector('.popup__input_type_description')

const imagePopup = document.querySelector('.popup_type_image')
const imagePopupCloseBtn = imagePopup.querySelector('.popup__close-button')
const imagePopupPhoto = imagePopup.querySelector('.popup__image')
const imagePopupDescription = imagePopup.querySelector('.popup__description')

const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')

const popupList = Array.from(document.querySelectorAll('.popup'))

popupList.forEach(el => {
  el.addEventListener('click', e => {
    if (e.target.classList.contains('popup_active')) {
      closePopup(el)
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
}

function addDefaultPopupValue(popupType) {
  openPopup(popupType)
  editInputName.value = profileName.textContent
  editInputDescription.value = profileDescription.textContent
}

function handleFormSubmit(e) {
  e.preventDefault();

  profileName.textContent = editInputName.value
  profileDescription.textContent = editInputDescription.value

  closePopup(editProfilePopup)
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

  closePopup(cardPopup)
}

renderDefaultCards(initialCards)

editPopupOpenBtn.addEventListener('click', () => addDefaultPopupValue(editProfilePopup))
editPopupCloseBtn.addEventListener('click', () => closePopup(editProfilePopup))
editProfilePopup.addEventListener('submit', handleFormSubmit)

cardPopupOpenBtn.addEventListener('click', () => openPopup(cardPopup))
cardPopupCloseBtn.addEventListener('click', () => closePopup(cardPopup))
cardPopup.addEventListener('submit', renderUserCards)

imagePopupCloseBtn.addEventListener('click', () => closePopup(imagePopup))