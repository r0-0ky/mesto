import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
  }

  _getInputValues() {
    return Array.from(this._popup.querySelectorAll(".popup__input")).map(item => {return item.value});
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm = this._popup.querySelector(".popup__form");
    this._popupForm.addEventListener("submit", evt => {
      this._submit(evt);
      this._popupForm.reset();
    });
  }

  close(evt) {
    if (evt) evt.preventDefault();
    super.close();
    return this._getInputValues();
  }
}