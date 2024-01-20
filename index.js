// "use strict";

import cosmetics from "./cosmetics.json" assert { type: "json" };

console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)


const ApiUrl = "https://sb-api-fb48ef34a197.herokuapp.com/";

function prettyNum(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// login Check
if (window.localStorage.getItem("token") !== null) {
  let account = await fetch(ApiUrl + "auth/account", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("token"),
    },
  });
  const data = await account.json();
  if (data.hasOwnProperty("error")) {
    alert(data.message);
    window.localStorage.removeItem("token");
  }
} else {
  const username = prompt("SBIO username:");
  const password = prompt("SBIO password:");
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
  if (!data.hasOwnProperty("error")) {
    window.localStorage.setItem("token", data.token);
    window.location.reload();
  } else {
    alert(data.error);
  }
}

// Fill Account Info

let account = await fetch(ApiUrl + "auth/account", {
  method: "GET",
  headers: {
    Authorization: "Bearer " + window.localStorage.getItem("token"),
  },
});

const data = await account.json();

console.log(data);

const userInfo = document.getElementById("accountInfo");

let html = '<p><span class="font-bold">Account Info</span><br/>';

html += `<span class="text-sky-500">username:</span> ${data.account.username}<br>`;

html += `<span class="text-sky-500">user id:</span> ${prettyNum(data.account.id)}<br>`;

html += `<span class="text-sky-500">gems:</span> ${prettyNum(
  data.account.gems,
)}`;

if (data.account.email != "") {
  html += `<br><span class="text-sky-500">email:</span> ${data.account.email}`;
}

html += `<br><span class="text-sky-500">Subscription:</span> ${data.account.subscription}`;

html += `<br><span class="text-sky-500">Profile Views:</span> ${prettyNum(
  data.account.profile_views,
)}`;



html += `<br><span class="text-sky-500">xp:</span> 
${prettyNum(
  data.account.xp,
)}`;

html += `<br><span class="text-sky-500">is v1:</span> ${data.account.is_v1}`;

let login = new Date(data.account.created_at);

html+=`<br><span class="text-sky-500">Created At: </span>${login.toString()}`

if(data.account.lastUsernameChange != null){
  login = new Date(data.account.lastUsernameChange)
  html+=`<br><span class="text-sky-500">Last Username Change: </span>${login.toString()}`
}

html +=`<br><span class="text-sky-500">Legecy Secret: </span> <span class="blur-sm hover:blur-none"> ${data.account.secret}</span>`

html+="</p>"
userInfo.innerHTML = html;


// Parse Skins


const skinsDiv = document.getElementById("skins");
// console.log(cosmetics.skins);

function id2skin(id){
  for (let i = 0; i < cosmetics.skins.length; i++){
    if (cosmetics.skins[i].id == id){
      return cosmetics.skins[i];
    }
  }
}

html = "<p><span class=\"font-bold\">Skins</span><br/>";

html += `<span class="text-sky-500">Equiped Skin: </span><br/><span class="text-green-500">${id2skin(data.account.skins.equipped).name} (id:${data.account.skins.equipped})</span><br/>`;

html += '<span class="text-sky-500">OwnedSkins: </span><br/>';

for (let i = 0; i < data.account.skins.owned.length; i++){
  let og ="";
  if(id2skin(data.account.skins.owned[i]).og){
    og="<span class=\"text-red-500\">(OG)</span>"
  }
  html += `<span class="text-green-500">${id2skin(data.account.skins.owned[i]).name} (id:${data.account.skins.owned[i]}) ${og}</span><br/>`;
}

skinsDiv.innerHTML = html;
