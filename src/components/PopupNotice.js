import { Popup } from "./Popup";

class PopupNotice extends Popup {
  constructor(popupSelector, { callbackNotice }) {
    super(popupSelector);
    this._submitButton = this._popupElement.querySelector('.popup__form');
    this._callbackNotice = callbackNotice;
  }

  open(cardObject, cardId) {
    this._cardObject = cardObject;
    this._cardId = cardId;
    super.open();
  }

  setEventListener() {
    this._submitButton.addEventListener('submit', (e) => {
      e.preventDefault();
      this._callbackNotice(this._cardObject, this._cardId)
    });
    super.setEventListener();
  }
}

export { PopupNotice }