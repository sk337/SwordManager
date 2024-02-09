import React, { useEffect, useState, useReducer } from "react";
import Nav from "@/components/nav";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ranges, types, rangeLst, typeLst, getLeaderboard } from "@/utils/leaderboard";

import { id2skin, prettyNum, playtimeParse } from "@/utils/jsutils";
import { getPubInfo } from "@/utils/login";


import UserCard from "@/components/usercard";

export default function Leaderboard() {

  const [leaderboard, setLeaderboard] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [range, setRange] = useState("all");
  const [type, setType] = useState("xp");
  // console.log(images)
  function userChk(e){
    let res = "empty";
    if (profiles.length === 0) {
      return res;
    }
    for (let i = 0; i < profiles.length; i++) {
      if (profiles[i] != undefined && profiles[i].account.username === e) {
        return profiles[i];
      }
    }
    return res;
  }

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const data = await getLeaderboard(range, type);
      // console.log(data.length);
      

      setLeaderboard(data);
    };
    fetchLeaderboard();
  }, []);
  if (leaderboard.length !== 0) {
    let total = 0;
    return (
      <main>
        <Nav />
        <div className="flex flex-col items-center">
          <div className="felx flex-row items-center justify-center">
            <Select onValueChange={(val) => {setRange(val)}}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All-Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Range</SelectLabel>
                  {rangeLst.map((range) => (
                    <SelectItem
                      key={range[0]}
                      value={range[0]}
                    >
                      {range[1]}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={(val) => {setType(val)}}>
              <SelectTrigger className="w-[180px] mt-5">
                <SelectValue placeholder="Xp" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type</SelectLabel>
                  {
                    typeLst.map((type)=>{
                      return (
                        <SelectItem key={type[0]} value={type[0]}>
                          {type[1]}
                        </SelectItem>
                      )
                    })
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <p className="text-3xl text-center font-bold mt-5">Leaderboard</p>
          <table className="mt-10 w-4/5 m-10">
            <thead>
              <tr>
                <td>Username</td>
                <td>Coins</td>
                <td>Kills</td>
                <td>Playtime</td>
                <td>Xp</td>
              </tr>
            </thead>
            <tbody className="w-full" id="data">
              {leaderboard.map((user) => {
                let tmp = total;
                total += 1;
                return (
                  <tr key={tmp} className="m-5">
                    <td onMouseOver={( async (e)=>{
                      const username = e.target.childNodes[0].innerText;
                      // console.log(username)
                      for (let i = 0; i < profiles.length; i++) {
                        if (profiles[i] === undefined) {
                        } else if (Object.prototype.hasOwnProperty.call(profiles[i], "account") && profiles[i].account.username === username){
                          return;
                        }
                      }
                  
                      let ud = await getPubInfo(username);
                      if (ud.error) {
                        console.log("Error: ", ud.error);
                      } else {
                        setProfiles(profiles =>[...profiles, ud]);
                      }
                    })}>
                      <UserCard
                        user={userChk(user.username)}
                      >
                        {user.username}
                      </UserCard>
                    </td>
                    <td>{prettyNum(user.coins)}</td>
                    <td>{prettyNum(user.kills)}</td>
                    <td>{playtimeParse(user.playtime)}</td>
                    <td>{prettyNum(user.xp)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
