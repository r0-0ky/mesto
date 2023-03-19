 import {openImagePopup} from "./index.js"
 
 export class Card {
  constructor(data, cardTemplate) {
    this._data = data;
    this._cardTemplate = cardTemplate;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardTemplate).content.querySelector(".card").cloneNode(true);
    return cardElement;
  }

  _changeLikeButton(evt) {
    evt.target.classList.toggle("card__like-button_active");
  }

  _deleteCard(evt) {
    evt.target.closest(".card").remove();
  }

  _setEventListeners() {
    this._element.querySelector(".card__like-button").addEventListener("click", evt => {this._changeLikeButton(evt)});
    this._element.querySelector(".card__trash-button").addEventListener("click", evt => {this._deleteCard(evt)});
    this._element.querySelector(".card__image").addEventListener("click", () => {openImagePopup(this._data)});
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