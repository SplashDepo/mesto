class Card {
  constructor(cardObject, templateSelector, userId, authorData, hendelActions) {
    this._card = cardObject;
    this._cardTitle = this._card.name;
    this._cardImage = this._card.link;
    this._templateSelector = templateSelector;

    this._userId = userId;
    this._cardId = authorData.cardId;
    this._authorId = authorData.authorId;

    this._cardViewImage = hendelActions.hendelViewImage;
    this._cardDelete = hendelActions.hendelCardDelete;
    this._addCardLike = hendelActions.hendelAddCardlike;
    this._removeCardLike = hendelActions.hendelRemoveCardLike;
  }

  _getCardTemplate() {
    return document.querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  renderCardLike(card) {
    this._likeArr = card.likes
    if (this._likeArr.length === 0) {
      this._cardLikeCounter.textContent = '';
    } else {
      this._cardLikeCounter.textContent = this._likeArr.length;
    }
    if (this._likedCard()) {
      this._cardLikeBtn.classList.add('card__like-button_active');
    } else {
      this._cardLikeBtn.classList.remove('card__like-button_active');
    }
  }

  _likedCard() {
    return this._likeArr.find((userLike) => userLike._id === this._userId);
  }

  _countLike() {
    if (this._likedCard()) {
      this._removeCardLike(this._cardId);
    } else {
      this._addCardLike(this._cardId);
    }
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  generateCard() {
    this._cardElement = this._getCardTemplate();
    this._imageElement = this._cardElement.querySelector('.card__image');
    this._titleElement = this._cardElement.querySelector('.card__title');
    this._cardLikeBtn = this._cardElement.querySelector('.card__like-button');
    this._cardDeleteBtn = this._cardElement.querySelector('.card__delete-button');
    this._cardLikeCounter = this._cardElement.querySelector('.card__counter');


    this._titleElement.textContent = this._cardTitle;
    this._imageElement.src = this._cardImage;
    this._imageElement.alt = this._cardTitle;

    this.renderCardLike(this._card)
    this._setEventListener();

    return this._cardElement;
  }


  _setEventListener() {
    this._cardLikeBtn.addEventListener('click', () => this._countLike());
    this._imageElement.addEventListener('click', () => this._cardViewImage(this._cardTitle, this._cardImage));
    if (this._userId === this._authorId) {
      this._cardDeleteBtn.addEventListener('click', () => this._cardDelete(this, this._cardId));
    } else {
      this._cardDeleteBtn.remove()
    }
  }
}

export { Card }