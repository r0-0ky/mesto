"use strict"

let editButton = document.querySelector(".profile__edit-button");
let formElement = document.querySelector(".popup__form");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__caption");
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_job");
let closeButton = document.querySelector(".popup__close-button");
let popup = document.querySelector(".popup")

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

function handleFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}  

formElement.addEventListener("submit", handleFormSubmit);
closeButton.addEventListener("click", function () {
  popup.classList.remove("popup_opened")
});
editButton.addEventListener("click", function () {
  popup.classList.add("popup_opened")
})

