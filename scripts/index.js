import  {initialCards} from "./cardData.js";
import {object, FormValidator, formList} from "./formValidator.js";
import {Card} from "./card.js";

export {openImagePopup};

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

initialCards.forEach((item) => {
  const card = new Card(item, "#card").createCard();
  gridCards.append(card);
})


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
  formList.forEach(formElement => {
    new FormValidator(object, formElement).hideInputError();
    new FormValidator(object, formElement).disableButton();
  }) 
}

function openCardPopup() {
  cardFormElement.reset();
  openPopup(cardPopup);
}

function openProfilePopup() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  openPopup(profilePopup);
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
  const card = new Card(data, "#card").createCard();
  gridCards.prepend(card);
  closePopup(cardPopup);
}

function openImagePopup(cardData) {
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