class FormValidator {
  constructor(validationConfig, validationElement) {
    this._object = validationConfig
    this._element = validationElement
    this._submitButton = this._element.querySelector(this._object.submitButtonSelector)
    this._inputList = Array.from(this._element.querySelectorAll(this._object.inputSelector))
  }

  _showError(inputElement, errorMessage) {
    const errorItem = this._element.querySelector(`.${inputElement.id}-error`)
    errorItem.textContent = errorMessage
    errorItem.classList.add(this._object.errorClass)
    inputElement.classList.add(this._object.inputErrorClass)
  }

  _hideError(inputElement) {
    const errorItem = this._element.querySelector(`.${inputElement.id}-error`)
    errorItem.textContent = ""
    errorItem.classList.remove(this._object.errorClass)
    inputElement.classList.remove(this._object.inputErrorClass)
  }

  _checkValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage)
    } else {
      this._hideError(inputElement)
    }
  }

  _setEventListener() {
    this._toggleButtonState()
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkValidity(inputElement)
        this._toggleButtonState()
      })
    })
  }

  _hasInvalidInput() {
    return this._inputList.some(inputItem => {
      return !inputItem.validity.valid
    })
  }

  enableValidation() {
    this._setEventListener()
  }

  disableSubmitButton() {
    this._submitButton.setAttribute('disabled', 'true');
    this._submitButton.classList.add(this._object.inactiveButtonClass);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton()
    } else {
      this._submitButton.classList.remove(this._object.inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  }
}


export { FormValidator } 