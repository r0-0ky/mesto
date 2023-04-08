import {initialCards, validationClasses, popupClasses, buttonEditer, cardFormElement, buttonAdder, profileNameInput, profileJobInput, profileFormElement} from "../utils/constants.js"
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "../../pages/index.css"

export {openImagePopup}

const {profilePopupSelector, imagePopupSelector, cardPopupSelector} = popupClasses;

const cardValidation = new FormValidator(validationClasses, cardFormElement); 
cardValidation.enableValidation();

const profileValidation = new FormValidator(validationClasses, profileFormElement);
profileValidation.enableValidation();

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      section.addItem(new Card(item, "#card").createCard());
    }
  },
  ".grid-cards"
)
section.render()

const profilePopup = new PopupWithForm(profilePopupSelector, (evt) => {
  userInfo.setUserInfo(profileNameInput.value , profileJobInput.value);
  profilePopup.close(evt);
});
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(cardPopupSelector, (evt) => {
  const arr = cardPopup.close(evt);
  section.prependItem(new Card({name: arr[0], link: arr[1]}, "#card").createCard());
});
cardPopup.setEventListeners();

const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

const userInfo = new UserInfo({ userNameSelector: ".profile__title", aboutUserSelector: ".profile__caption"});


function openCardPopup() {
  cardPopup.open();
  cardValidation.hideAllInputErrors();
  cardValidation.disableButton();
}

function openProfilePopup() {
  userInfo.setUserInfo(userInfo.getUserInfo().userName, userInfo.getUserInfo().aboutUser);
  profilePopup.open();
  profileValidation.hideAllInputErrors();
  profileValidation.disableButton();
}

function openImagePopup({ name, link }) {
  imagePopup.open({ name, link })
}

buttonEditer.addEventListener("click", openProfilePopup);
buttonAdder.addEventListener("click", openCardPopup);

