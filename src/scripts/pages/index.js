import {avatarFormElement, buttonEditAvatar, confirmButton, userAvatar, profileName, profileJob, apiData, validationClasses, popupClasses, buttonEditer, cardFormElement, buttonAdder, profileNameInput, profileJobInput, profileFormElement} from "../utils/constants.js"
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import Popup from "../components/Popup.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js"
import "../../pages/index.css"

const {profilePopupSelector, imagePopupSelector, cardPopupSelector, confirmPopupSelector, avatarPopupSelector} = popupClasses;

const api = new Api(apiData);

Promise.all([api.getApiData("users/me"), api.getApiData("cards")])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    const section = new Section(
      {
        items: cards,
        renderer: (item) => {
          section.addItem(createNewCard(item, "#card", openImagePopup, openConfirmPopup, handleLike, userInfo.getUserInfo().userId));
        }
      },
      ".grid-cards"
    )
    section.render();
    
    const cardPopup = new PopupWithForm(cardPopupSelector, (evt, inputObj) => {
      evt.preventDefault();
      cardPopup.renderLoading(true);
      const cardInputsObj = inputObj();
      api.addNewCard({
        name: cardInputsObj["input-title"],
        link: cardInputsObj["input-src"]
      })
        .then(res => {
          section.prependItem(createNewCard(res, "#card", openImagePopup, openConfirmPopup, handleLike, userInfo.getUserInfo().userId));
          cardPopup.close();
        })
        .catch(err => console.log(err))
        .finally(() => {
          cardPopup.renderLoading(false, "Создать");
        })
    });
    cardPopup.setEventListeners();

    function openCardPopup() {
      cardValidation.hideAllInputErrors();
      cardValidation.disableButton();
      cardPopup.open();
    }

    buttonAdder.addEventListener("click", openCardPopup);
  })
  .catch(err => console.log(err));

const cardValidation = new FormValidator(validationClasses, cardFormElement); 
cardValidation.enableValidation();

const profileValidation = new FormValidator(validationClasses, profileFormElement);
profileValidation.enableValidation();

const avatarValidation = new FormValidator(validationClasses, avatarFormElement);
avatarValidation.enableValidation();

const profilePopup = new PopupWithForm(profilePopupSelector, (evt, inputObj) => {
  evt.preventDefault();
  profilePopup.renderLoading(true);
  const profileInputsObj = inputObj();
  api.updateUserApi({name: profileInputsObj["input-name"], about: profileInputsObj["input-job"]})
    .then(() => {
      userInfo.setUserInfo({ name: profileInputsObj["input-name"], about: profileInputsObj["input-job"] });
      profilePopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      profilePopup.renderLoading(false, "Сохранить");
    })
});
profilePopup.setEventListeners();

const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

const userInfo = new UserInfo({ userNameSelector: ".profile__title", aboutUserSelector: ".profile__caption", avatarSelector: ".profile__avatar"});

const confirmPopup = new PopupWithConfirm(confirmPopupSelector, confirmButton, (deleteCard, data) => {
  api.deleteCard(data._id)
    .then(() => {
      deleteCard();
      confirmPopup.close();
    })
    .catch((err) => console.log(err))
})
confirmPopup.setEventListeners();

const avatarPopup = new PopupWithForm(avatarPopupSelector, (evt, inputObj) => {
  evt.preventDefault();
  avatarPopup.renderLoading(true);
  api.updateAvatar({avatar: inputObj()["input-src"]})
    .then(res => {
      userInfo.setUserInfo({ avatar: res.avatar });
      avatarPopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      avatarPopup.renderLoading(false, "Сохранить");
  })
});
avatarPopup.setEventListeners();

function openProfilePopup() {
  const userInfoObj = userInfo.getUserInfo();
  profileNameInput.value = userInfoObj.name;
  profileJobInput.value = userInfoObj.about;
  profileValidation.hideAllInputErrors();
  profileValidation.disableButton();
  profilePopup.open();
}

function openImagePopup({ name, link }) {
  imagePopup.open({ name, link })
}

function openConfirmPopup(deleteCard, data) {
  confirmPopup.open(deleteCard, data);
}

function handleLike(button, card, likesQuantity, changeLikeButton) {
  if (button.classList.contains("card__like-button_active")) {
    api.deleteLike(card._id)
      .then(res => {
        likesQuantity.textContent = res.likes.length;
        changeLikeButton();
      })
      .catch(err => console.log(err))
  }
  else if (!button.classList.contains("card__like-button_active")) {
    api.putLike(card._id)
      .then(res => {
        likesQuantity.textContent = res.likes.length;
        changeLikeButton();
      })
      .catch(err => console.log(err))
  }
}

function openAvatarEditPopup() {
  avatarValidation.hideAllInputErrors();
  avatarValidation.disableButton();
  avatarPopup.open();
}

function createNewCard(data, cardTemplate, openImagePopup, openConfirmPopup, handleLike, userPersonalId) {
  const newCard = new Card(data, cardTemplate, openImagePopup, openConfirmPopup, handleLike, userPersonalId).createCard();
  return newCard
}

buttonEditer.addEventListener("click", openProfilePopup);
buttonEditAvatar.addEventListener("click", openAvatarEditPopup)
