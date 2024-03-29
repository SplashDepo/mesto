import { Popup } from "./Popup";

class PopupWithForm extends Popup {
  constructor(popupSelector, { callbackFormSubmit }) {
    super(popupSelector);
    this._callbackFormSubmit = callbackFormSubmit;
    this._popupForm = this._popupElement.querySelector('.popup__form');
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
    this._submitBtn = this._popupElement.querySelector('.popup__submit-button');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListener() {
    super.setEventListener();
    this._popupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this._callbackFormSubmit(this._getInputValues());
    });
  }

  changeSavingProcessText() {
    this._submitBtn.textContent = 'Сохранение...';
  }

  returnSavingProcessText() {
    this._submitBtn.textContent = 'Сохраненить';
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}

export { PopupWithForm }