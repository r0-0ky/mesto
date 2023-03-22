import  {initialCards, validationClasses} from "./data.js";
import {FormValidator} from "./FormValidator.js";
import {Card} from "./Card.js";

const buttonEditer = document.querySelector(".profile__edit-button");
const profileFormElement = document.querySelector("#profile-popup-form");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__caption");
const profileNameInput = document.querySelector("#profile-popup-input-name");
const profileJobInput = document.querySelector("#profile-popup-input-job");
const profilePopup = document.querySelector("#profile-popup");
const cardPopup = document.querySelector("#card-popup");
const cardFormElement = document.querySelector("#card-popup-form");
const cardTitleInput = document.querySelector("#card-popup-input-title");
const cardSrcInput = document.querySelector("#card-popup-input-src");
const gridCards = document.querySelector(".grid-cards");
const profileCloseButton = document.querySelector("#profile-popup-close-button");
const cardCloseButton = document.querySelector("#card-popup-close-button");
const buttonAdder = document.querySelector(".profile__add-button");
const imagePopup = document.querySelector(".image-popup");
const imagePopupPicture = document.querySelector(".image-popup__picture");
const imagePopupCaption = document.querySelector(".image-popup__caption");
const imagePopupCloseButton = document.querySelector(".image-popup__close-button");
const popups = Array.from(document.querySelectorAll(".popup"));
const formList = Array.from(document.querySelectorAll(validationClasses.formSelector)); 
const profileValidation = new FormValidator(validationClasses, profileFormElement);
const cardValidation = new FormValidator(validationClasses, cardFormElement); 

initialCards.forEach((data) => {
  gridCards.append(createCard(data, "#card"));
});

formList.forEach((formElement) => {
  new FormValidator(validationClasses, formElement).enableValidation();
});

function createCard(data, cardTemplate) {
  return new Card(data, cardTemplate).createCard();
}

function createImagePopup(cardData) {
  imagePopupPicture.src = cardData.src
  imagePopupCaption.textContent = cardData.text; 
  imagePopupPicture.alt = cardData.alt;
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeOnEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.classList.add("close-animation");
  document.removeEventListener("keydown", closeOnEscape);
}

function openCardPopup() {
  cardFormElement.reset();
  openPopup(cardPopup);
  cardValidation.enableValidation();
  cardValidation.hideAllInputErrors();
  cardValidation.disableButton();
}

function openProfilePopup() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  openPopup(profilePopup);
  profileValidation.enableValidation();
  profileValidation.hideAllInputErrors();
  profileValidation.disableButton();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(profilePopup);
}  

function handleCardSubmit(evt) {
  evt.preventDefault();
  const data = {
    name: cardTitleInput.value,
    link: cardSrcInput.value
  };
  gridCards.prepend(createCard(data, "#card"));
  closePopup(cardPopup);
}

export function openImagePopup(cardData) {
    createImagePopup({
      src: cardData.link,
      text: cardData.name,
      alt: cardData.name,
    });
    openPopup(imagePopup);
}

function closeOnOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

function closeOnEscape(evt) {
  if (evt.key === "Escape") {
    const popupActive = document.querySelector(".popup_opened");
    closePopup(popupActive);
  }
}

popups.forEach((item) => item.addEventListener("click", closeOnOverlay));
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
profileCloseButton.addEventListener("click", () => closePopup(profilePopup));
cardCloseButton.addEventListener("click", () => closePopup(cardPopup));
buttonEditer.addEventListener("click", openProfilePopup);
buttonAdder.addEventListener("click", openCardPopup);
cardFormElement.addEventListener("submit", handleCardSubmit);
imagePopupCloseButton.addEventListener("click", () => closePopup(imagePopup));