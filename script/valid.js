const settingsList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(settingsList.formSelector))
  formList.forEach(formElement => {
    formElement.addEventListener('submit', e => {
      e.preventDefault()
    })

    setEventListener(formElement)
  })
}

function setEventListener(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(settingsList.inputSelector))
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => checkValidity(formElement, inputElement))
  })
}


