import { Popup } from "./Popup";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._description = document.querySelector('.popup__description');
    this._image = document.querySelector('.popup__image');
  }

  open(description, image) {
    super.open();
    this._description.textContent = description;
    this._image.src = image;
    this._image.alt = description;
  }
}

export { PopupWithImage }