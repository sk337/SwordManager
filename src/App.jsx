import React, { useEffect, useState } from "react";
import "@/App.css";
import { checkLogin, tokenlogin } from "@/utils/login";
import cosmetics from "../cosmetics.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(false);
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
      setUserData(UserData);
    };
    fetchUserData();
  }, []);
  if (isLogin == false) {
    return (
      <main>
        <h1 className="text-3xl font-bold text-center">Login</h1>
      </main>
    );
  }

  function prettyNum(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  console.log(cosmetics)
  function id2skin(id){
    for (let i = 0; i < cosmetics.skins.length; i++){
      if (cosmetics.skins[i].id == id){
        return cosmetics.skins[i];
      }
    }
  }

  console.log(userData)
  function email(userData){
    if (userData.account.email){
      return (
        <span className="text-sky-500">Email: <span className="text-white blur-sm hover:blur-none">{userData.account.email}<br/></span></span>
      );
    } else {
      return ""
    }
  }

  if(userData){
    return (
      <main>
        <h1 className="text-3xl font-bold text-center p-5">Sword Manager</h1>
        <div className="flex flex-wrap w-full items-top justify-center p-2 h-full">
          <div className="flex flex-col w-2/5 m-3">
            <Card>
              <CardHeader>
                <CardTitle>
                  <p className="text-center">
                    Account Info
                  </p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <span className="text-sky-500">Username: </span>
                  {userData.account.username}<br/>
                  <span className="text-sky-500">User ID: </span>
                  {prettyNum(userData.account.id)}<br/>
                  <span className="text-sky-500">Gems: </span>
                  {prettyNum(userData.account.gems)}<br/>
                  {email(userData)}
                  <span className="text-sky-500">Subscription: </span>
                  {userData.account.subscription.toString()}<br/>
                  <span className="text-sky-500">Profile Views: </span>
                  {prettyNum(userData.account.profile_views)}<br/>
                  <span className="text-sky-500">xp: </span>
                  {prettyNum(userData.account.xp)}<br/>
    
                  <span className="text-sky-500">Created At: </span>
                  {Date(userData.account.created_at).toString()}<br/>
                  {(()=>{
                    if(userData.account.lastUsernameChange){
                      return (<span className="text-sky-500">Last Username Change: <span className="text-white">{Date().toString()}</span><br/></span>)
                    }else{
                      return""
                    }
                  })()}
    
                  <span className="text-sky-500">is_v1: </span>
                  {userData.account.is_v1.toString()}<br/>
                  <span className="text-sky-500">Legacy Secret: </span>
                  <span className="blur-sm hover:blur-none">{userData.account.secret}</span><br/>
                </p>
                
              </CardContent>
            </Card>
            <div className="overflow-y-auto break-all bg-slate-700 mt-4 p-2 rounded-lg hover:bg-slate-600 hover:scale-105 ">
              Test
            </div>
          </div>
          <div className="flex flex-col w-2/5 m-3">
            <Card>
              <CardHeader>
                <CardTitle><p className="text-center">Skins</p></CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-sky-500">Equiped:</span><br/>
                <span className="text-green-500">{id2skin(userData.account.skins.equipped).name}</span> (id:{userData.account.skins.equipped}) {id2skin(userData.account.skins.equipped).og ? <span className="text-red-500">(OG)</span> : ""}<br/>
                <span className="text-sky-500">owned:</span><br/>
                {userData.account.skins.owned.map(skin => {
                  let skindat = id2skin(skin);
                  return (
                    <span className="text-green-500">{skindat.name} <span className="text-white">(id:{skin})</span> {skindat.og ? <span className="text-red-500">(OG)</span> : ""}<br/></span>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    );
  }
}

// "use strict";

// parse
