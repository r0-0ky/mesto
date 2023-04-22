export default class Card {
  constructor(data, cardTemplate, openImagePopup, openConfirmPopup, card, handleLike) {
    this._data = data;
    this._cardTemplate = cardTemplate;
    this._openImagePopup = openImagePopup;
    this._openConfirmPopup = openConfirmPopup;
    this._deleteCard = this._deleteCard.bind(this);
    this._card = card;
    this._handleLike = handleLike;
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
      this._handleLike(this._buttonLike, this._card, this._likes);
      this._changeLikeButton();
    });
    this._buttonTrash.addEventListener("click", () => {this._openConfirmPopup(this._deleteCard, this._card)});
    this._element.querySelector(".card__image").addEventListener("click", () => {this._openImagePopup(this._data)});
  }

  createCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector(".card__image");
    this._likes = this._element.querySelector(".card__like-quantity")
    this._likes.textContent = this._card.likes.length
    this._setEventListeners();
    if (this._card.owner._id !== "c33b8422f243882a331ebe8e") {
      this._buttonTrash.remove();
    }
    this._card.likes.forEach(user => {
      if(user._id == "c33b8422f243882a331ebe8e") {
        this._buttonLike.classList.add("card__like-button_active");
      }
    })
    cardImage.src = this._data.link;
    cardImage.alt = this._data.name;
    this._element.querySelector(".card__title").textContent = this._data.name;
    return this._element
  }
}
