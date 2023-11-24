import { atom } from "nanostores";

export const $authenStore = atom({
  token: null,
  authenUsername: null,
  role: null,
});
