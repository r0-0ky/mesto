export {object, FormValidator, formList}

const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
}
const formList = Array.from(document.querySelectorAll(object.formSelector));

class FormValidator {
  constructor(obj, formElement) {
    this._obj = obj;
    this._formElement = formElement;
  }

  enableValidation() {
      this._formElement.addEventListener("submit", (evt) => evt.preventDefault());
      this._setEventListeners(this._formElement);
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._obj.inputSelector));
    const buttonElement = this._formElement.querySelector(this._obj.submitButtonSelector);
    
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError();
    }
  };

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._obj.inactiveButtonClass);   
      buttonElement.setAttribute("disabled", ""); 
    }
    else {
      buttonElement.classList.remove(this._obj.inactiveButtonClass);   
      buttonElement.removeAttribute("disabled"); 
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return inputElement.validity.valid === false;
    })
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._obj.inputErrorClass);
    errorElement.textContent = errorMessage;
  };

  hideInputError() {
    const inputList = Array.from(document.querySelectorAll(this._obj.inputSelector));
    inputList.forEach((inputElement) => {
      const errorElement = document.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._obj.inputErrorClass);
      errorElement.textContent = " ";
    })
  }

  disableButton() {
    const buttonElements = Array.from(document.querySelectorAll(this._obj.submitButtonSelector));
    buttonElements.forEach((item) => {
      item.setAttribute("disabled", "");
      item.classList.add(this._obj.inactiveButtonClass);
    });
  }
}

formList.forEach(formElement => {
  new FormValidator(object, formElement).enableValidation();
}) 