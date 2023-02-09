let editButton = document.querySelector(".profile__edit-button");
let formElement = document.querySelector(".popup__form");
let profileName = document.querySelector(".profile__title");
let profileJob = document.querySelector(".profile__caption");
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_job");
let closeButton = document.querySelector(".popup__close-button");
let popup = document.querySelector(".popup")

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupClose();
}  

function popupClose() {
  popup.classList.remove("popup_opened");
}

function popupOpen() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup.classList.add("popup_opened")
}

formElement.addEventListener("submit", handleFormSubmit);
closeButton.addEventListener("click", popupClose);
editButton.addEventListener("click", popupOpen)


