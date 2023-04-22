export {avatarFormElement, buttonEditAvatar, confirmButton, userAvatar, profileName, profileJob, apiData, validationClasses, popupClasses, buttonEditer, cardFormElement, buttonAdder, profileNameInput, profileJobInput, profileFormElement}
const buttonEditer = document.querySelector(".profile__edit-button");
const profileFormElement = document.querySelector("#profile-popup-form");
const profileNameInput = document.querySelector("#profile-popup-input-name");
const profileJobInput = document.querySelector("#profile-popup-input-job");
const cardFormElement = document.querySelector("#card-popup-form");
const avatarFormElement = document.querySelector("#avatar-popup-form")
const buttonAdder = document.querySelector(".profile__add-button");
const profileJob = document.querySelector(".profile__caption");
const profileName = document.querySelector(".profile__title");
const userAvatar = document.querySelector(".profile__avatar");
const confirmButton = document.querySelector(".popup__confirm-button");
const buttonEditAvatar = document.querySelector(".profile__avatar-cover")

const apiData = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: 'df7a9bd5-3976-4ecb-8c26-39d5c916aa3c',
    'Content-Type': 'application/json'
  }
}

const validationClasses = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
}

const popupClasses = {
  profilePopupSelector: "#profile-popup",
  imagePopupSelector: "#image-popup",
  cardPopupSelector: "#card-popup",
  confirmPopupSelector: "#confirm-popup",
  avatarPopupSelector: "#avatar-popup"
}