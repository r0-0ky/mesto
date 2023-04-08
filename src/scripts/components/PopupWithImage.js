import {imagePopupPicture, imagePopupCaption} from "../utils/constants.js";
import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  open({ link, name }) {
    super.open();
    imagePopupPicture.src = link;
    imagePopupCaption.innerHTML = name;
    imagePopupPicture.alt = name;
  }
}