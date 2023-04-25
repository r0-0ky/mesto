export default class UserInfo {
  constructor({ userNameSelector, aboutUserSelector, avatarSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._aboutUser = document.querySelector(aboutUserSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._aboutUser.textContent,
      avatar: this._avatar.src,
      userId: this._userId,
    }
  }

  setUserInfo({ name = this._userName.textContent, about = this._aboutUser.textContent, avatar = this._avatar.src, _id = this._userId}) {
    this._userName.textContent = name;
    this._aboutUser.textContent = about;
    this._avatar.src = avatar;
    this._userId = _id;
  }
}