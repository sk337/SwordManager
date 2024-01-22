import React, { useEffect, useState } from "react";
import "@/App.css";
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
import { Toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import loading from "@/loading.svg";

export default function App() {
  const [isLogin, setIsLogin] = useState("load");
  const [userData, setUserData] = useState(false);
  const [pubInfo, setPubInfo] = useState(false);
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

  function flogin(){
    login(document.getElementById("username").value, document.getElementById("password").value).then( res => {
        if (res.error){
          alert(`login failed: ${res.message}`)
        } else {
          window.localStorage.setItem("token",res.token)
          window.location.reload()
        }
      });
  }

  if (isLogin == false) {
    return (
      <main className="flex items-center justify-center">
        <div className="flex flex-wrap items-center justify-center w-3/4 mt-10">
          <Toaster />
          <h1 className="text-3xl m-4 mb-7 font-bold text-center">
            Login With Swordbattle
          </h1>
          <Input id="username" placeholder="Username"></Input>
          <Input className="mt-5" id="password" placeholder="Password" type="password"></Input>
          <Button
            className="text-center mt-5 bg-blue-500 hover:bg-blue-600"
            onClick={flogin}
          >
            Login
          </Button>
        </div>
      </main>
    );
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

  // console.log(pubInfo)
  if (userData && pubInfo) {
    return (
      <main>
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
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 mt-5 text-center w-full"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </p>
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
                  <span className="text-sky-500">kills: </span>
                  {prettyNum(pubInfo.totalStats.kills)}
                  <br />
                  <span className="text-sky-500">playTime: </span>
                  {playtimeParse(pubInfo.totalStats.playtime)}
                  <br />
                  <span className="text-sky-500">rank: </span>
                  {prettyNum(pubInfo.rank)}
                  <br />
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
        <svg src={loading} className="m-5 animate-spin" alt="loading" />
      </main>
    );
  }
}

// "use strict";

// parse
