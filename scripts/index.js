import  {initialCards} from "./card.js"

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
const cardTemplate = document.querySelector("#card").content.querySelector('.card');
const profileCloseButton = document.querySelector("#profile-popup-close-button");
const cardCloseButton = document.querySelector("#card-popup-close-button");
const buttonAdder = document.querySelector(".profile__add-button");
const imagePopup = document.querySelector(".image-popup");
const imagePopupPicture = document.querySelector(".image-popup__picture");
const imagePopupCaption = document.querySelector(".image-popup__caption");
const imagePopupCloseButton = document.querySelector(".image-popup__close-button");
const popup = Array.from(document.querySelectorAll(".popup"));

initialCards.forEach((item) => {
  const card = createCard({
    name: item.name,
    link: item.link,
  });
  gridCards.append(card);
})

function createCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage =  cardElement.querySelector(".card__image");
  cardElement.querySelector(".card__like-button").addEventListener("click", changeLikeButton);
  cardElement.querySelector(".card__trash-button").addEventListener("click", deleteCard);
  cardImage.addEventListener("click", openImagePopup);
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  return cardElement;
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
  const card = createCard({
    name: cardTitleInput.value,
    link: cardSrcInput.value
  });
  gridCards.prepend(card);
  closePopup(cardPopup);
}

function changeLikeButton(evt) {
  evt.target.classList.toggle("card__like-button_active");
}

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

function openImagePopup(evt) {
    createImagePopup({
      src: evt.target.src,
      text: evt.target.closest(".card").children[2].textContent,
      alt: evt.target.alt,
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

popup.forEach((item) => item.addEventListener("click", closeOnOverlay));
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
profileCloseButton.addEventListener("click", () => closePopup(profilePopup));
cardCloseButton.addEventListener("click", () => closePopup(cardPopup));
buttonEditer.addEventListener("click", openProfilePopup);
buttonAdder.addEventListener("click", openCardPopup);
cardFormElement.addEventListener("submit", handleCardSubmit);
imagePopupCloseButton.addEventListener("click", () => closePopup(imagePopup));