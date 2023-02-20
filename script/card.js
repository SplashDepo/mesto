import { imagePopup, imagePopupPhoto, imagePopupDescription } from '../utils/constants.js'
import { openPopup, } from '../utils/utils.js'

class Card {
  constructor(cardsInfoList, templateSelector) {
    this._title = cardsInfoList.name
    this._image = cardsInfoList.link
    this._templateSelector = templateSelector
    this._cardElement = document.querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true)
    this._cardImage = this._cardElement.querySelector('.card__image')
  }

  generateCard() {
    this._setEventListener()

    this._cardElement.querySelector('.card__title').textContent = this._title
    this._cardImage.src = this._image
    this._cardImage.alt = this._title

    return this._cardElement
  }

  _setEventListener() {
    this._cardElement.querySelector('.card__delete-button').addEventListener('click', this._deleteCard.bind(this))
    this._cardElement.querySelector('.card__like-button').addEventListener('click', this._likeCard.bind(this))
    this._cardImage.addEventListener('click', this._viewPhoto.bind(this))

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