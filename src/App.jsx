import React, { useEffect, useState } from "react";
import { checkLogin, tokenlogin, getPubInfo, login } from "@/utils/login";
import cosmetics from "../cosmetics.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import Login from './Login';

import Nav from "@/components/nav"

export default function App() {
  const ApiUrl = "https://sb-api-fb48ef34a197.herokuapp.com/";

  const [isLogin, setIsLogin] = useState("load");
  const [userData, setUserData] = useState(false);
  const [pubInfo, setPubInfo] = useState(false);
  const [skin, setSkin] = useState(false);
  const [eskin, setEskin] = useState(false);
  // Use effect to fetch the login status when the component mounts
  useEffect(() => {
    const fetchLoginStatus = async () => {
      let loginStatus = await checkLogin();
      setIsLogin(loginStatus);
    };
    fetchLoginStatus();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      let UserData = await tokenlogin();
      let PubInfo = await getPubInfo(UserData.account.username);
      setUserData(UserData);
      setPubInfo(PubInfo);
    };
    fetchUserData();
  }, []);

  function flogin() {
    login(
      document.getElementById("username").value,
      document.getElementById("password").value,
    ).then((res) => {
      if (res.error) {
        document.getElementById("error").classList.remove("hidden");
        document.getElementById("desc").innerHTML =
          `${res.error}: ${res.message}`;
      } else {
        window.localStorage.setItem("token", res.token);
        window.location.reload();
      }
    });
  }

  if (isLogin == false) {
    return (<Login />);
  }

  function playtimeParse(seconds) {
    let days = Math.floor(seconds / 86400);
    let remainder = seconds % 86400;
    let hours = Math.floor(remainder / 3600);
    remainder %= 3600;
    let minutes = Math.floor(remainder / 60);
    let secs = remainder % 60;

    let result = "";

    if (days > 0) {
      result += `${days}d `;
    }
    if (hours > 0 || days > 0) {
      result += `${hours}h `;
    }
    if (minutes > 0 || hours > 0 || days > 0) {
      result += `${minutes}m `;
    }
    result += `${secs}s`;

    return result.trim();
  }

  function prettyNum(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // console.log(cosmetics)
  function id2skin(id) {
    for (let i = 0; i < cosmetics.skins.length; i++) {
      if (cosmetics.skins[i].id == id) {
        return cosmetics.skins[i];
      }
    }
  }

  // console.log(userData)
  function email(userData) {
    if (userData.account.email) {
      return (
        <span className="text-sky-500">
          Email:{" "}
          <span className="text-white blur-sm hover:blur-none">
            {userData.account.email}
            <br />
          </span>
        </span>
      );
    } else {
      return "";
    }
  }

  function logout() {
    window.localStorage.removeItem("token");
    window.location.reload();
  }

  function changeUsername() {
    let oldUsername = document.getElementById("oldUsername").value;
    let newUsername = document.getElementById("newUsername").value;
    if (oldUsername == "" || newUsername == "") {
      alert("Please fill out all fields");
      return;
    } else if (oldUsername !== newUsername) {
      alert("Usernames must match");
      return;
    }

    fetch(`${ApiUrl}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        newUsername: newUsername,
      }),
    }).then((res) => {
      if (res.status == 200) {
        res.json().then((data) => {
          //Changing username resets the token
          window.localStorage.setItem("token", data.token);
          window.location.reload();
        });
      } else {
        alert("Username change failed");
      }
    });
  }

  // function setSkin(sskin){
  //   setSkin(sskin)
  // }

  function buySkin() {
    if (!skin) {
      alert("Please select a skin");
      return;
    }
    fetch(`${ApiUrl}profile/cosmetics/skins/buy/${skin}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + window.localStorage.getItem("token"),
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    }).then((req) => {
      console.log(req);
      req.json().then((obj) => {
        console.log(obj);
        if (Object.prototype.hasOwnProperty.call(obj, "error")) {
          alert(`buy failed: ${obj.error}`);
          return;
        }
        alert(`skin bought: ${id2skin(skin).name}`);
        window.location.reload();
      });
    });
  }

  function equipSkin() {
    if (!eskin) {
      alert("Please select a skin");
      return;
    }
    fetch(`${ApiUrl}profile/cosmetics/skins/equip/${eskin}`, {
      method: "POST",
      headers: {
        Authorization: "bearer " + window.localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    }).then((req) => {
      req.json().then((obj) => {
        console.log(req)
        console.log(obj)
        if (Object.prototype.hasOwnProperty.call(obj, "error")) {
          alert(`equip failed: ${obj.error}`);
          return;
        }
        alert(`skin equipped: ${id2skin(eskin).name}`);
        window.location.reload();
      });
    });
  }
  // console.log(pubInfo)
  if (userData && pubInfo) {
    console.log(pubInfo);
    return (
      <main>
        <Nav/>
        <h1 className="text-3xl font-bold text-center p-5">Sword Manager</h1>
        <div className="flex flex-wrap w-full items-top justify-center p-2 h-full">
          <div className="flex flex-col w-2/5 m-3">
            <Card>
              <CardHeader>
                <CardTitle>
                  <p className="text-center">Account Info</p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <span className="text-sky-500">Username: </span>
                  {userData.account.username}
                  <br />
                  <span className="text-sky-500">User ID: </span>
                  {prettyNum(userData.account.id)}
                  <br />
                  <span className="text-sky-500">Gems: </span>
                  {prettyNum(userData.account.gems)}
                  <br />
                  {email(userData)}
                  <span className="text-sky-500">Subscription: </span>
                  {userData.account.subscription.toString()}
                  <br />
                  <span className="text-sky-500">Profile Views: </span>
                  {prettyNum(userData.account.profile_views)}
                  <br />
                  <span className="text-sky-500">xp: </span>
                  {prettyNum(userData.account.xp)}
                  <br />

                  <span className="text-sky-500">Created At: </span>
                  {Date(userData.account.created_at).toString()}
                  <br />
                  {(() => {
                    if (userData.account.lastUsernameChange) {
                      return (
                        <span className="text-sky-500">
                          Last Username Change:{" "}
                          <span className="text-white">
                            {Date().toString()}
                          </span>
                          <br />
                        </span>
                      );
                    } else {
                      return "";
                    }
                  })()}

                  <span className="text-sky-500">is_v1: </span>
                  {userData.account.is_v1.toString()}
                  <br />
                  <span className="text-sky-500">Legacy Secret: </span>
                  <span className="blur-sm hover:blur-none">
                    {userData.account.secret}
                  </span>
                  <br />
                </p>
                <div className="flex flex-row w-full mt-5">
                  <Sheet className="w-full">
                    <SheetTrigger className="w-full">
                      <Button className="w-full">Manage Account</Button>
                    </SheetTrigger>
                    <SheetContent className="overflow-x-auto">
                      <p className="text-3xl font-bold m-3">Settings</p>

                      <p className="font-bold mt-5">Change Username</p>
                      <hr />
                      <Label htmlFor="ou">Old Username</Label>
                      <Input
                        name="ou"
                        id="oldUsername"
                        placeholder="Original Username"
                      ></Input>

                      <Label htmlFor="nu">New Username</Label>
                      <Input
                        name="nu"
                        id="newUsername"
                        placeholder="New Username"
                      ></Input>
                      <Button className="mt-5" onClick={changeUsername}>
                        Submit
                      </Button>

                      <p className="font-bold mt-5">Buy Skin</p>
                      <hr />
                      <p>
                        <span className="text-sky-500">Gems: </span>
                        {prettyNum(userData.account.gems)}
                      </p>
                      <Select
                        className="mt-10"
                        onValueChange={(value) => setSkin(value)}
                      >
                        <SelectTrigger className="w-[180px] mt-3">
                          <SelectValue placeholder="Select a Skin " />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Skins</SelectLabel>
                            {cosmetics.skins.map((skin) => {
                              if (
                                !skin.og &&
                                !userData.account.skins.owned.includes(
                                  skin.id,
                                ) &&
                                skin.price <= userData.account.gems
                              ) {
                                return (
                                  <SelectItem key={skin.id} value={skin.id}>
                                    {skin.name}{" "}
                                    <span className="text-sky-500">
                                      {skin.price}
                                    </span>
                                  </SelectItem>
                                );
                              }
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <Button className="mt-3" onClick={buySkin}>
                        Buy
                      </Button>
                      <p className="font-bold mt-5">Equip Skin</p>
                      <hr />
                      <Select
                        className="mt-10"
                        onValueChange={(value) => setEskin(value)}
                      >
                        <SelectTrigger className="w-[180px] mt-3">
                          <SelectValue placeholder="Select a Skin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Skins</SelectLabel>
                            {cosmetics.skins.map((skin) => {
                              if (
                                userData.account.skins.owned.includes(skin.id)
                              ) {
                                return (
                                  <SelectItem key={skin.id} value={skin.id}>
                                    {skin.name}{" "}
                                    {skin.og ? (
                                      <span className="text-red-500">(OG)</span>
                                    ) : (
                                      ""
                                    )}{" "}
                                    {skin.id ==
                                    userData.account.skins.equipped ? (
                                      <span className="text-green-500">
                                        (Equipped)
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </SelectItem>
                                );
                              }
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <Button className="mt-3" onClick={equipSkin}>
                        Equip Skin
                      </Button>
                    </SheetContent>
                  </Sheet>
                </div>
                <Button
                  className="bg-blue-500 hover:bg-blue-600 mt-5 text-center w-full"
                  onClick={logout}
                >
                  Logout
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <span className="font-bold">Total:</span>
                  <br />
                  &nbsp;&nbsp;<span className="text-sky-500">kills: </span>
                  {prettyNum(pubInfo.totalStats.kills)}
                  <br />
                  &nbsp;&nbsp;<span className="text-sky-500">playTime: </span>
                  {playtimeParse(pubInfo.totalStats.playtime)}
                  <br />
                  &nbsp;&nbsp;<span className="text-sky-500">rank: </span>
                  {prettyNum(pubInfo.rank)}
                  <br />
                  &nbsp;&nbsp;<span className="text-sky-500">coins: </span>
                  {prettyNum(pubInfo.totalStats.coins)}
                  <br />
                  &nbsp;&nbsp;<span className="text-sky-500">games: </span>
                  {prettyNum(pubInfo.totalStats.games)}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col w-2/5 m-3">
            <Card>
              <CardHeader>
                <CardTitle>
                  <p className="text-center">Skins</p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-sky-500">Equiped:</span>
                <br />
                <span className="text-green-500">
                  {id2skin(userData.account.skins.equipped).name}
                </span>{" "}
                (id:{userData.account.skins.equipped}){" "}
                {id2skin(userData.account.skins.equipped).og ? (
                  <span className="text-red-500">(OG)</span>
                ) : (
                  ""
                )}
                <br />
                <span className="text-sky-500">owned:</span>
                <br />
                {userData.account.skins.owned.map((skin) => {
                  let skindat = id2skin(skin);
                  return (
                    <span key={skin} className="text-green-500">
                      {skindat.name}{" "}
                      <span className="text-white">(id:{skin})</span>{" "}
                      {skindat.og ? (
                        <span className="text-red-500">(OG)</span>
                      ) : (
                        ""
                      )}
                      <br />
                    </span>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <main>
        <h1 className="m-5 text-3xl font-bold text-center">Loading...</h1>
        <p className="font-symbol text-center text-6xl animate-spin"></p>
      </main>
    );
  }
}

// "use strict";

// parse
