import React, { useEffect, useState } from "react";
import Nav from "@/components/nav";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ranges, types, getLeaderboard } from "@/utils/leaderboard";

import { id2skin, prettyNum, playtimeParse } from "@/utils/jsutils";
import { getPubInfo } from "@/utils/login";

import UserCard from "@/components/usercard";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const profiles = [];
  const [upd, setUpd] = useState(0);
  const [range, setRange] = useState("all");
  const [type, setType] = useState("xp");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const data = await getLeaderboard(range, type);
      data.forEach(async (element) => {
        let user = element.username;
        let info = await getPubInfo(user);
        profiles.push(info);
        setUpd(upd + 1);
      });

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
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All-Time" />
              </SelectTrigger>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px] mt-5">
                <SelectValue placeholder="Xp" />
              </SelectTrigger>
            </Select>
          </div>
          <p className="text-3xl text-center font-bold mt-5">Leaderboard</p>
          <table className="mt-10 w-4/5">
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
                    <td>
                      <UserCard
                        user={
                          Object.prototype.hasOwnProperty.call(
                            profiles,
                            user.username
                          )
                            ? profiles[user.username]
                            : "empty"
                        }
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
