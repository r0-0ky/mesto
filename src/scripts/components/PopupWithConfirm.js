import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, confirmButton, deleteCard) {
    super(popupSelector);
    this._confirmButton = confirmButton;
    this._deleteCard = deleteCard;
    this._handleDeleteCard = this._handleDeleteCard.bind(this)
  }

  _handleDeleteCard() {
    this._deleteCard(this._removeCard, this._data)
  }

  open(removeCard, data) {
    super.open();
    this._removeCard = removeCard;
    this._data = data;
    this._confirmButton.addEventListener("click", this._handleDeleteCard);
  }

  close() {
    super.close();
    this._confirmButton.removeEventListener("click", this._handleDeleteCard);
  }
} 