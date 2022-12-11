const popupOpenBtn = document.querySelector('.profile__button')
const popup = document.querySelector('.popup')
const popupCloseBtn = document.querySelector('.form__close-button')
const form = document.querySelector('.form')
const formInputName = document.querySelector('.form__input-name')
const formInputDescription = document.querySelector('.form__input-description')

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
  if (e.target === e.currentTarget || e.target === popupCloseBtn) {
    popup.classList.remove('popup_active')
  }
}


popupOpenBtn.addEventListener('click', openPopup)
popup.addEventListener('click', closePopup)
form.addEventListener('submit', handleFormSubmit)