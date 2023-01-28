const settingsList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function enableValidation(settingsObj) {
  const formList = Array.from(document.querySelectorAll(settingsObj.formSelector))
  formList.forEach(formElement => {
    formElement.addEventListener('submit', e => {
      e.preventDefault()
    })

    setEventListener(formElement)
  })
}

function setEventListener(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(settingsList.inputSelector))

  const buttonElement = formElement.querySelector(settingsList.submitButtonSelector)

  toggleButtonState(inputList, buttonElement)
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      checkValidity(formElement, inputElement)

      toggleButtonState(inputList, buttonElement)
    })
  })
}

function checkValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(formElement, inputElement)
  }
}

function showInputError(formElement, inputElement, errorMess) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  errorElement.textContent = errorMess
  inputElement.classList.add(settingsList.inputErrorClass)
  errorElement.classList.add(settingsList.errorClass)
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  errorElement.textContent = ""
  inputElement.classList.remove(settingsList.inputErrorClass)
  errorElement.classList.remove(settingsList.errorClass)
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settingsList.inactiveButtonClass)
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(settingsList.inactiveButtonClass)
    buttonElement.removeAttribute("disabled");
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(inputItem => !inputItem.validity.valid)
}



enableValidation(settingsList)