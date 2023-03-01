export const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
}

function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListeners(obj, formElement);
  });
}

function setEventListeners (obj, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  
  toggleButtonState(obj, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(obj, formElement, inputElement);
      toggleButtonState(obj, inputList, buttonElement);
    })
  })
}

function checkInputValidity (obj, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(obj, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(obj);
  }
};


function toggleButtonState(obj, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(obj.inactiveButtonClass);   
    buttonElement.removeAttribute("disabled"); 
  }
  else {
    buttonElement.classList.remove(obj.inactiveButtonClass);   
    buttonElement.removeAttribute("disabled"); 
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return inputElement.validity.valid === false;
  })
}

function showInputError(obj, formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
};

export function hideInputError(obj) {
  const inputList = Array.from(document.querySelectorAll(obj.inputSelector));
  inputList.forEach((inputElement) => {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.textContent = " ";
  })
}

export function disableButton(obj) {
  const buttonElements = Array.from(document.querySelectorAll(obj.submitButtonSelector));
  buttonElements.forEach((item) => {
    item.setAttribute("disabled", "");
    item.classList.add(obj.inactiveButtonClass);
  });
}

enableValidation(object); 