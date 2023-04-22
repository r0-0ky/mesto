import {avatarFormElement, buttonEditAvatar, confirmButton, userAvatar, profileName, profileJob, apiData, validationClasses, popupClasses, buttonEditer, cardFormElement, buttonAdder, profileNameInput, profileJobInput, profileFormElement} from "../utils/constants.js"
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import Popup from "../components/Popup.js";
import "../../pages/index.css"

const {profilePopupSelector, imagePopupSelector, cardPopupSelector, confirmPopupSelector, avatarPopupSelector} = popupClasses;

const api = new Api(apiData);

api.getApiData("users/me")
  .then(res => {
    profileJob.textContent = res.about;
    profileName.textContent = res.name;
    userAvatar.src = res.avatar;
  })
  .catch(err => console.log(err));

api.getApiData("cards")
  .then(res => {
    const section = new Section(
      {
        items: res,
        renderer: (item) => {
          section.addItem(createNewCard(item, "#card", openImagePopup, openConfirmPopup, item, handleLike));
        }
      },
      ".grid-cards"
    )
    section.render();
    
    const cardPopup = new PopupWithForm(cardPopupSelector, (evt, inputObj) => {
      evt.preventDefault();
      renderLoading(".popup__card-button", true);
      const cardInputsObj = inputObj();
      api.addNewCard({
        name: cardInputsObj["input-title"],
        link: cardInputsObj["input-src"]
      })
        .then(res => {
          section.prependItem(createNewCard({name: cardInputsObj["input-title"], link: cardInputsObj["input-src"]}, "#card", openImagePopup, openConfirmPopup, res, handleLike));
        })
        .catch(err => console.log(err))
        .finally(() => {
          cardPopup.close();
          renderLoading(".popup__card-button", false, "Создать");
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
  renderLoading(".popup__profile-button", true);
  const profileInputsObj = inputObj();
  api.updateUserApi({name: profileInputsObj["input-name"], about: profileInputsObj["input-job"]})
    .then(() => {
      userInfo.setUserInfo(profileInputsObj["input-name"], profileInputsObj["input-job"]);
    })
    .catch(err => console.log(err))
    .finally(() => {
      renderLoading(".popup__profile-button", false, "Сохранить");
      profilePopup.close();
    })
});
profilePopup.setEventListeners();

const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

const userInfo = new UserInfo({ userNameSelector: ".profile__title", aboutUserSelector: ".profile__caption"});

const confirmPopup = new Popup(confirmPopupSelector);
confirmPopup.setEventListeners();

const avatarPopup = new PopupWithForm(avatarPopupSelector, (evt, inputObj) => {
  evt.preventDefault();
  renderLoading(".popup__avatar-button", true);
  api.updateAvatar({avatar: inputObj()["input-src"]})
    .then(res => userAvatar.src = res.avatar)
    .catch(err => console.log(err))
    .finally(() => {
      avatarPopup.close();
      renderLoading(".popup__avatar-button", false, "Сохранить");
  })
});
avatarPopup.setEventListeners();

function openProfilePopup() {
  const userInfoObj = userInfo.getUserInfo()
  userInfo.setUserInfo(userInfoObj.name, userInfoObj.about);
  profileValidation.hideAllInputErrors();
  profileValidation.disableButton();
  profilePopup.open();
}

function openImagePopup({ name, link }) {
  imagePopup.open({ name, link })
}

function openConfirmPopup(deleteCard, card) {
  confirmPopup.open();
  confirmButton.addEventListener("click", () => {
    deleteCard();
    api.deleteCard(card._id)
    confirmPopup.close()
  })
}

function handleLike(button, card, likesQuantity) {
  if (button.classList.contains("card__like-button_active")) {
    api.deleteLike(card._id)
      .then(res => {likesQuantity.textContent = res.likes.length})
      .catch(err => console.log(err))
  }
  else if (!button.classList.contains("card__like-button_active")) {
    api.putLike(card._id)
      .then(res => {likesQuantity.textContent = res.likes.length})
      .catch(err => console.log(err))
  }
}

function openAvatarEditPopup() {
  avatarValidation.hideAllInputErrors();
  avatarValidation.disableButton();
  avatarPopup.open();
}

function renderLoading(buttonSelector, isLoading, mainValue) {
  const button = document.querySelector(buttonSelector);

  if (isLoading) {
    button.textContent = "Сохранение...";
  }

  else if (!isLoading) {
    button.textContent = mainValue;
  }
}

function createNewCard(data, cardTemplate, openImagePopup, openConfirmPopup, card, handleLike) {
  const newCard = new Card(data, cardTemplate, openImagePopup, openConfirmPopup, card, handleLike).createCard();
  return newCard
}

buttonEditer.addEventListener("click", openProfilePopup);
buttonEditAvatar.addEventListener("click", openAvatarEditPopup)
