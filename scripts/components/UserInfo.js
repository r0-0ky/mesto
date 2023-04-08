import {profileNameInput, profileJobInput} from "../utils/constants.js";

export default class UserInfo {
  constructor({ userNameSelector, aboutUserSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._aboutUser = document.querySelector(aboutUserSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      aboutUser: this._aboutUser.textContent,
    }
  }

  setUserInfo(newUserName, newAboutUser) {
    this._userName.textContent = newUserName;
    this._aboutUser.textContent = newAboutUser;
    profileNameInput.value = newUserName;
    profileJobInput.value = newAboutUser;
  }
}