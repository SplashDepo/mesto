class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add('popup_active');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popupElement.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }
  setEventListener() {
    this._popupElement.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('popup__close-icon') || e.target.classList.contains('popup_active')) {
        this.close();
      }
    });
  }
}
export { Popup }