import {initialCards, validationClasses, popupClasses, buttonEditer, cardFormElement, buttonAdder, profileNameInput, profileJobInput, profileFormElement} from "../utils/constants.js"
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "../../pages/index.css"

const {profilePopupSelector, imagePopupSelector, cardPopupSelector} = popupClasses;

const cardValidation = new FormValidator(validationClasses, cardFormElement); 
cardValidation.enableValidation();

const profileValidation = new FormValidator(validationClasses, profileFormElement);
profileValidation.enableValidation();

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      section.addItem(new Card(item, "#card", openImagePopup).createCard());
    }
  },
  ".grid-cards"
)
section.render()

const profilePopup = new PopupWithForm(profilePopupSelector, (evt, inputObj) => {
  const profileInputsObj = inputObj();
  userInfo.setUserInfo(profileInputsObj.input1 , profileInputsObj.input2);
  profilePopup.close(evt);
});
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(cardPopupSelector, (evt, inputObj) => {
  const cardInputsObj = inputObj();
  section.prependItem(new Card({name: cardInputsObj.input1, link: cardInputsObj.input2}, "#card", openImagePopup).createCard());
  cardPopup.close(evt);
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
  const userInfoObj = userInfo.getUserInfo()
  userInfo.setUserInfo(userInfoObj.userName, userInfoObj.aboutUser);
  profilePopup.open();
  profileValidation.hideAllInputErrors();
  profileValidation.disableButton();
}

function openImagePopup({ name, link }) {
  imagePopup.open({ name, link })
}

buttonEditer.addEventListener("click", openProfilePopup);
buttonAdder.addEventListener("click", openCardPopup);

