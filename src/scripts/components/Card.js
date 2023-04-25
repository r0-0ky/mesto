export default class Card {
  constructor(data, cardTemplate, openImagePopup, openConfirmPopup, handleLike, userId) {
    this._userId = userId;
    this._data = data;
    this._cardTemplate = cardTemplate;
    this._openImagePopup = openImagePopup;
    this._openConfirmPopup = openConfirmPopup;
    this._handleLike = handleLike;
    this._deleteCard = this._deleteCard.bind(this);
    this._changeLikeButton = this._changeLikeButton.bind(this);
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardTemplate).content.querySelector(".card").cloneNode(true);
    return cardElement;
  }

  _changeLikeButton() {
    this._buttonLike.classList.toggle("card__like-button_active");
  }

  _deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._buttonLike = this._element.querySelector(".card__like-button");
    this._buttonTrash =  this._element.querySelector(".card__trash-button");
    this._buttonLike.addEventListener("click", () => {
      this._handleLike(this._buttonLike, this._data, this._likes, this._changeLikeButton);
    });
    this._buttonTrash.addEventListener("click", () => {this._openConfirmPopup(this._deleteCard, this._data)});
    this._element.querySelector(".card__image").addEventListener("click", () => {this._openImagePopup(this._data)});
  }

  createCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector(".card__image");
    this._likes = this._element.querySelector(".card__like-quantity")
    this._likes.textContent = this._data.likes.length
    this._setEventListeners();
    if (this._data.owner._id !== this._userId) {
      this._buttonTrash.remove();
    }
    this._data.likes.forEach(user => {
      if(user._id == this._userId) {
        this._buttonLike.classList.add("card__like-button_active");
      }
    })
    cardImage.src = this._data.link;
    cardImage.alt = this._data.name;
    this._element.querySelector(".card__title").textContent = this._data.name;
    return this._element
  }
}
