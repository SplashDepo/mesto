const popupOpenBtn = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const popupCloseBtn = document.querySelector('.popup__close-button')
const form = document.querySelector('.popup__form')
const formInputName = document.querySelector('.popup__input_type_name')
const formInputDescription = document.querySelector('.popup__input_type_description')

function handleFormSubmit(e) {
  e.preventDefault();

  document.querySelector('.profile__name').textContent = formInputName.value
  document.querySelector('.profile__description').textContent = formInputDescription.value

  popup.classList.remove('popup_active')
}

function openPopup() {
  popup.classList.add('popup_active')

  const profileName = document.querySelector('.profile__name')
  const profileDescription = document.querySelector('.profile__description')

  formInputName.value = profileName.textContent
  formInputDescription.value = profileDescription.textContent
}

function closePopup(e) {
  popup.classList.remove('popup_active')
}


popupOpenBtn.addEventListener('click', openPopup)
popupCloseBtn.addEventListener('click', closePopup)
form.addEventListener('submit', handleFormSubmit)

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

  return card
}

function addCards(card) {
  cardsContainer.append(card)
}

function renderCards(arr) {
  initialCards.forEach(el => {
    const defaultCardHtml = createCard(el.name, el.link)
    addCards(defaultCardHtml)
  })
}

renderCards(initialCards) 