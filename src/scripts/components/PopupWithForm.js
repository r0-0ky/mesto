import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._getInputValues = this._getInputValues.bind(this);
    this._inputArray = Array.from(this._popup.querySelectorAll(".popup__input"));
  }

  _getInputValues() {
    this._inputValueObj = {};
    this._inputArray.forEach((item, index) => {
      this._inputValueObj[`input${index + 1}`] = item.value;
    })
    return this._inputValueObj;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm = this._popup.querySelector(".popup__form");
    this._popupForm.addEventListener("submit", evt => {
      this._submit(evt, this._getInputValues);
      this._popupForm.reset();
    });
  }

  close(evt) {
    if (evt) evt.preventDefault();
    super.close();
  }
}