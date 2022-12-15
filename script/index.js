const popupOpenBtn = document.querySelector('.profile__button')
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