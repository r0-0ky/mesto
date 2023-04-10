export {initialCards, validationClasses, popupClasses, buttonEditer, cardFormElement, buttonAdder, profileNameInput, profileJobInput, profileFormElement}
const buttonEditer = document.querySelector(".profile__edit-button");
const profileFormElement = document.querySelector("#profile-popup-form");
const profileNameInput = document.querySelector("#profile-popup-input-name");
const profileJobInput = document.querySelector("#profile-popup-input-job");
const cardFormElement = document.querySelector("#card-popup-form");
const buttonAdder = document.querySelector(".profile__add-button");
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]

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
}