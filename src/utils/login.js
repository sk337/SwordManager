const ApiUrl = "https://sb-api-fb48ef34a197.herokuapp.com/";

import { id2skin } from "./jsutils";

export async function checkLogin() {
  if (window.localStorage.getItem("token") !== null) {
    let account = await fetch(ApiUrl + "auth/account", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    });
    const data = await account.json();
    if (Object.prototype.hasOwnProperty.call(data, "error")) {
      return false;
    }
    return true;
  } else {
    return false;
  }
}

export async function login(username, password) {
  const login = await fetch(ApiUrl + "auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const data = await login.json();
  return data;
}

export async function tokenlogin() {
  const login = await fetch(ApiUrl + "auth/account", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + window.localStorage.getItem("token"),
    },
  });
  const data = await login.json();
  // console.log(data, login.status);
  return data;
}

export async function getPubInfo(username) {
  const pub = await fetch(ApiUrl + "profile/getPublicUserInfo/" + username, {
    method: "POST",
  });
  const data = await pub.json();
  if (!Object.prototype.hasOwnProperty.call(data, "error")) {
    let image = await import(
      `../../vendor/swordbattle.io/client/public/assets/game/player/${id2skin(data.account.skins.equipped).bodyFileName.split(".")[0]}.png`
    );
    data["image"] = image.default;
  }
  return data;
}
