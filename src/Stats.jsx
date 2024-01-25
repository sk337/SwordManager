import React, { useState, useEffect } from "react";
import { getPubInfo } from "@/utils/login";
import { prettyNum, id2skin, dateParse, parseDailyStats } from "@/utils/jsutils";
import cosmetics from "@/../cosmetics.json";
import Nav from "@/components/nav";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from 'react-chartjs-2';


export default function Stats() {
  const urlData = new URL("https://" + window.location.hash.replace("#", "q/"));

  if (!urlData.searchParams.get("user")) {
    return (
      <main>
        <p className="text-center">
          Url Param <code>User</code> is required
        </p>
      </main>
    );
  }

  const [user, setUser] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      let userdata = await getPubInfo(urlData.searchParams.get("user"));
      setUser(userdata);
    };
    fetchUser();
  }, []);

  if (user && !user.error) {
    let stats = parseDailyStats(user.dailyStats)
    // console.log(user);
    console.log(stats)
    return (
      <main>
        <Nav />
        <div className="w-full flex items-center justify-center p-5">
          <div className="w-4/5">
            <p className="text-3xl font-bold text-center">Stats</p>
            <img src={user.image} className="rounded-full w-[60px]"></img>
            <p className="font-bold text-2xl">{user.account.username}</p>
            <p className="text-green-500">General:</p>
            <p>
              <span className="text-sky-500">&nbsp;&nbsp;Skins: </span>
              <HoverCard>
                <HoverCardTrigger>
                  <span className="text-orange-400">
                    {user.account.skins.owned.length}
                  </span>
                </HoverCardTrigger>
                <HoverCardContent className="max-h-[300px] overflow-x-auto">
                  {user.account.skins.owned.map((skin) => {
                    let skinCont = id2skin(skin);
                    return (
                      <span key={skin}>
                        <span>{skinCont.name} </span>
                        <span className="text-sky-500">OG: </span>
                        {skinCont.og ? "T" : "F"}
                        <br />
                      </span>
                    );
                  })}
                </HoverCardContent>
              </HoverCard>{" "}
              /{" "}
              <span className="text-orange-400">{cosmetics.skins.length}</span>
              <br />
              <span className="text-sky-500">&nbsp;&nbsp;rank: </span>
              <span className="text-orange-400">{prettyNum(user.rank)}</span>
              <br />
              <span className="text-sky-500">&nbsp;&nbsp;User Id: </span>
              <span className="text-orange-400">
                {prettyNum(user.account.id)}
              </span>
              <br />
              <span className="text-sky-500">&nbsp;&nbsp;Profile Views: </span>
              <span className="text-orange-400">
                {prettyNum(user.account.profile_views)}
              </span>
              <br />
              <span className="text-sky-500">&nbsp;&nbsp;XP: </span>
              <span className="text-orange-400">
                {prettyNum(user.account.xp)}
              </span>
              <br />
              <span className="text-sky-500">&nbsp;&nbsp;kills: </span>
              <span className="text-orange-400">
                {prettyNum(user.totalStats.kills)}
              </span>
            </p>
          </div>
        </div>
      </main>
    );
  } else if (user.error) {
    return (
      <main>
        <h1 className="m-5 text-3xl font-bold text-center">ERROR</h1>
        <pre className="text-center">
          {user.error}: {user.message}
        </pre>
      </main>
    );
  } else {
    return (
      <main>
        <h1 className="m-5 text-3xl font-bold text-center">Loading...</h1>
        <p className="font-mono text-center text-6xl animate-spin"></p>
      </main>
    );
  }
}
