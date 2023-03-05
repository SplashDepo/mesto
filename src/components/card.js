class Card {
  constructor(cardsInfoList, templateSelector, handleCardClick) {
    this._title = cardsInfoList.name;
    this._image = cardsInfoList.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getCardTemplate() {
    this._cardTemplate = document.querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return this._cardTemplate;
  }

  generateCard() {
    this._cardElement = this._getCardTemplate();
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._cardTitle = this._cardElement.querySelector('.card__title');
    this._cardLikeBtn = this._cardElement.querySelector('.card__like-button');
    this._cardDeleteBtn = this._cardElement.querySelector('.card__delete-button');


    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;

    this._setEventListener();

    return this._cardElement;
  }

  _deleteCard() {
    this._cardElement.remove();
  }
  _likeCard(e) {
    e.target.classList.toggle('card__like-button_active');
  }

  _setEventListener() {
    this._cardDeleteBtn.addEventListener('click', this._deleteCard.bind(this));
    this._cardLikeBtn.addEventListener('click', this._likeCard.bind(this));
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._title, this._image));

  }
}

export { Card }