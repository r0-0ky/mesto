import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._getInputValues = this._getInputValues.bind(this);
    this._inputArray = Array.from(this._popup.querySelectorAll(".popup__input"));
    this._button = document.querySelector(`${popupSelector}-submit-button`)
  }

  _getInputValues() {
    this._inputValueObj = {};
    this._inputArray.forEach((item) => {
      this._inputValueObj[item.name] = item.value;
    })
    return this._inputValueObj;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm = this._popup.querySelector(".popup__form");
    this._popupForm.addEventListener("submit", evt => {
      this._submit(evt, this._getInputValues);
    });
  }

  close(evt) {
    if (evt) evt.preventDefault();
    super.close();
    this._popupForm.reset();
  }

  renderLoading(isLoading, buttonText='Сохранить') {
    if (isLoading) {
      this._button.textContent = "Сохранение..."
    }
    else if (!isLoading) {
      this._button.textContent = buttonText;
    }
  }
}