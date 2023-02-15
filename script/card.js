import { openPopup, imagePopup, imagePopupPhoto, imagePopupDescription } from './index.js'

class Card {
  constructor(cardsInfoList, templateSelector) {
    this._title = cardsInfoList.name
    this._image = cardsInfoList.link
    this._templateSelector = templateSelector
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true)
  }

  generateCard() {
    this._cardElement = this._getTemplate()
    this._setEventListener()

    this._cardElement.querySelector('.card__title').textContent = this._title
    this._cardElement.querySelector('.card__image').src = this._image
    this._cardElement.querySelector('.card__image').alt = this._title

    return this._cardElement
  }

  _setEventListener() {
    this._cardElement.querySelector('.card__delete-button').addEventListener('click', this._deleteCard.bind(this))
    this._cardElement.querySelector('.card__like-button').addEventListener('click', this._likeCard.bind(this))
    this._cardElement.querySelector('.card__image').addEventListener('click', this._viewPhoto.bind(this))
  }

  _deleteCard() {
    this._cardElement.remove()
  }
  _likeCard(e) {
    e.target.classList.toggle('card__like-button_active')
  }

  _viewPhoto() {
    openPopup(imagePopup)
    imagePopupPhoto.src = this._image
    imagePopupPhoto.alt = this._title
    imagePopupDescription.textContent = this._title
  }
}

export { Card }