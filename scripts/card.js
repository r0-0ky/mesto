import {openImagePopup} from "./index.js" 

export class Card {
  constructor(data, cardTemplate) {
    this._data = data;
    this._cardTemplate = cardTemplate;
    this._openImagePopup = openImagePopup;
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
    this._element = null;
  }

  _setEventListeners() {
    this._buttonLike = this._element.querySelector(".card__like-button");
    this._buttonLike.addEventListener("click", () => {this._changeLikeButton()});
    this._element.querySelector(".card__trash-button").addEventListener("click", () => {this._deleteCard()});
    this._element.querySelector(".card__image").addEventListener("click", () => {this._openImagePopup(this._data)});
  }

  createCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector(".card__image");

    this._setEventListeners();
    cardImage.src = this._data.link;
    cardImage.alt = this._data.name;
    this._element.querySelector(".card__title").textContent = this._data.name;
    return this._element
  }
}