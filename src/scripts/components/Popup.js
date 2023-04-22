export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(`${popupSelector}-close-button`);
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._popup.classList.add("close-animation");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", evt => this._handleOverlayClose(evt));
    this._closeButton.addEventListener("click", () => this.close());
  }
}