import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._imagePopupPicture = document.querySelector(".image-popup__picture");
    this._imagePopupCaption = document.querySelector(".image-popup__caption");
  }

  open({ link, name }) {
    super.open();
    this._imagePopupPicture.src = link;
    this._imagePopupCaption.innerHTML = name;
    this._imagePopupPicture.alt = name;
  }
}