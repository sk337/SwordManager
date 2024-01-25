import React, { useState, useEffect } from "react";
import { getPubInfo } from "@/utils/login";
import { prettyNum } from "@/utils/jsutils";
import cosmetics from "@/../cosmetics.json";
import Nav from "@/components/nav";

export default function Stats() {
  const urlData = new URL("https://" + window.location.hash.replace("#", "q/"));
  console.log(urlData);
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
    return (
      <main>
        <Nav />
        <div className="w-full flex items-center justify-center p-5">
          <div className="w-4/5">
            <p className="text-3xl font-bold text-center">Stats</p>
            <p className="font-bold text-2xl">{user.account.username}</p>
            <p className="text-green-500">General:</p>
            <p>
              <span className="text-sky-500">&nbsp;&nbsp;Skins: </span>
              <span className="text-orange-400">
                {user.account.skins.owned.length}
              </span>{" "}
              /{" "}
              <span className="text-orange-400">{cosmetics.skins.length}</span>
              <br />
              <span className="text-sky-500">&nbsp;&nbsp;ranks: </span>
              <span className="text-orange-400">{prettyNum(user.rank)}</span>
              <br />
              
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
