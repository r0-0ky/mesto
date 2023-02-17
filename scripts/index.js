const editButton = document.querySelector(".profile__edit-button");
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
const cardTemplate = document.querySelector("#card").content;
const profileCloseButton = document.querySelector("#profilePopupCloseButton");
const cardCloseButton = document.querySelector("#cardPopupCloseButton");
const addButton = document.querySelector(".profile__add-button");
const imagePopup = document.querySelector(".image-popup");
const imagePopupPicture = document.querySelector(".image-popup__picture");
const imagePopupCaption = document.querySelector(".image-popup__caption");
const imagePopupCloseButton = document.querySelector(".image-popup__close-button");

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
]; 

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
  cardTitleInput.value = "";
  cardSrcInput.value = "";
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

function appendCard(evt) {
  evt.preventDefault();
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = cardTitleInput.value;
  cardElement.querySelector(".card__image").src = cardSrcInput.value;
  cardElement.querySelector(".card__like-button").addEventListener("click", changeLikeButton);
  cardElement.querySelector(".card__trash-button").addEventListener("click", deleteCard);
  cardElement.querySelector(".card__image").addEventListener("click", openImagePopup);
  gridCards.prepend(cardElement);
  closeCardPopup();
}

function changeLikeButton(evt) {
  evt.target.classList.toggle("card__like-button_active");
}

function deleteCard(evt) {
  evt.target.parentNode.remove();
}

function openImagePopup(evt) {
    imagePopup.classList.add("image-popup_opened");
    imagePopupPicture.src = evt.target.src;
    imagePopupCaption.textContent = evt.target.closest(".card").children[2].textContent; 
}

function closeImagePopup() {
  imagePopup.classList.remove("image-popup_opened");
  imagePopup.classList.add("close-animation");
}

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = initialCards[i].name;
  cardElement.querySelector(".card__image").src = initialCards[i].link;
  cardElement.querySelector(".card__like-button").addEventListener("click", changeLikeButton);
  cardElement.querySelector(".card__trash-button").addEventListener("click", deleteCard);
  cardElement.querySelector(".card__image").addEventListener("click", openImagePopup);
  gridCards.append(cardElement);
}


profileFormElement.addEventListener("submit", handleProfileFormSubmit);
profileCloseButton.addEventListener("click", closeProfilePopup);
cardCloseButton.addEventListener("click", closeCardPopup);
editButton.addEventListener("click", openProfilePopup);
addButton.addEventListener("click", openCardPopup);
cardFormElement.addEventListener("submit", appendCard);
imagePopupCloseButton.addEventListener("click", closeImagePopup);