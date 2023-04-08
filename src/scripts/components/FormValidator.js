export default class FormValidator {
  constructor(obj, formElement) {
    this._obj = obj;
    this._formElement = formElement;
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._obj.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._obj.submitButtonSelector);
    
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    }
    else {
      this._buttonElement.classList.remove(this._obj.inactiveButtonClass);   
      this._buttonElement.removeAttribute("disabled"); 
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return inputElement.validity.valid === false;
    })
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._obj.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._obj.inputErrorClass);
    errorElement.textContent = "";
  }

  hideAllInputErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  disableButton() {
    this._buttonElement.setAttribute("disabled", "");
    this._buttonElement.classList.add(this._obj.inactiveButtonClass);
  }
}
