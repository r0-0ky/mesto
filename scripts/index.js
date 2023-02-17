import  {initialCards} from "./card.js"

const buttonEditer = document.querySelector(".profile__edit-button");
const profileFormElement = document.querySelector("#profilePopupForm");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__caption");
const profileNameInput = document.querySelector("#profilePopupInputName");
const profileJobInput = document.querySelector("#profilePopupInputJob");
const profilePopup = document.querySelector("#profilePopup");
const cardPopup = document.querySelector("#cardPopup");
const cardFormElement = document.querySelector("#cardPopupForm");
const cardTitleInput = document.querySelector("#cardPopupInputTitle");
const cardSrcInput = document.querySelector("#cardPopupInputSrc");
const gridCards = document.querySelector(".grid-cards");
const cardTemplate = document.querySelector("#card").content.querySelector('.card');
const profileCloseButton = document.querySelector("#profilePopupCloseButton");
const cardCloseButton = document.querySelector("#cardPopupCloseButton");
const buttonAdder = document.querySelector(".profile__add-button");
const imagePopup = document.querySelector(".image-popup");
const imagePopupPicture = document.querySelector(".image-popup__picture");
const imagePopupCaption = document.querySelector(".image-popup__caption");
const imagePopupCloseButton = document.querySelector(".image-popup__close-button");

function handlePopupClicks(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__like-button").addEventListener("click", changeLikeButton);
  cardElement.querySelector(".card__trash-button").addEventListener("click", deleteCard);
  cardElement.querySelector(".card__image").addEventListener("click", openImagePopup);
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  return cardElement;
}

function closeProfilePopup() {
  profilePopup.classList.remove("popup_opened");
  profilePopup.classList.add("close-animation");
}

function closeCardPopup() {
  cardPopup.classList.remove("popup_opened");
  cardPopup.classList.add("close-animation");
}

function openCardPopup() {
  cardPopup.classList.add("popup_opened");
  cardFormElement.reset();
}

function openProfilePopup() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  profilePopup.classList.add("popup_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closeProfilePopup();
}  

function handleCardSubmit(evt) {
  evt.preventDefault();
  const card = handlePopupClicks(cardTitleInput.value, cardSrcInput.value)
  closeCardPopup();
  gridCards.prepend(card);
}

function changeLikeButton(evt) {
  evt.target.classList.toggle("card__like-button_active");
}

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

function openImagePopup(evt) {
    imagePopup.classList.add("image-popup_opened");
    imagePopupPicture.src = evt.target.src;
    imagePopupCaption.textContent = evt.target.closest(".card").children[2].textContent; 
    imagePopupPicture.alt = evt.target.closest(".card").children[2].textContent;
}

function closeImagePopup() {
  imagePopup.classList.remove("image-popup_opened");
  imagePopup.classList.add("close-animation");
}

initialCards.forEach((item) => {
  const card = handlePopupClicks(item.name, item.link);
  gridCards.append(card);
})

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
profileCloseButton.addEventListener("click", closeProfilePopup);
cardCloseButton.addEventListener("click", closeCardPopup);
buttonEditer.addEventListener("click", openProfilePopup);
buttonAdder.addEventListener("click", openCardPopup);
cardFormElement.addEventListener("submit", handleCardSubmit);
imagePopupCloseButton.addEventListener("click", closeImagePopup);