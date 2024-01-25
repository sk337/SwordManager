import React, { useState, useEffect } from "react";
import Nav from "@/components/nav";
import { getPubInfo } from "@/utils/login";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import cosmetics from "@/../cosmetics";

import { dateParse, prettyNum } from "@/utils/jsutils";

export default function Profile() {
  const urlData = new URL(
    "https://" + window.location.hash.replace("#", "q/"),
  );
  // console.log(urlData);
  if (!urlData.searchParams.get("user")) {
    return (
      <main>
        <nav />
        <div className="flex flex-col items-center">
          <div className="felx flex-row items-center justify-center">
            <h1>Username required</h1>
          </div>
        </div>
      </main>
    );
  }

  const [user, setUser] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getPubInfo(urlData.searchParams.get("user"));
      setUser(data);
    };
    fetchUser();
  }, []);

  if (user && !user.error) {
    console.log(user);
    return (
      <main>
        <Nav />
        <div className="flex flex-col items-center">
          <div className="felx flex-row items-center justify-center p-5">
            <h1 className="text-3xl font-bold text-center">Profile</h1>
            <Card className="w-[400px]">
              <CardHeader>
                <CardTitle>{user.account.username}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={user.image} />
                    <AvatarFallback>AV</AvatarFallback>
                  </Avatar>
                  <div>
                    <p>
                      <span className="text-sky-500">Joined:</span>{" "}
                      {dateParse(user.account.created_at)}
                    </p>
                    <p>
                      <span className="text-sky-500">XP:</span> {prettyNum(user.account.xp)}
                    </p>
                  </div>
                </div>
                <p><span className="text-sky-500">User Id: </span>{prettyNum(user.account.id)}<br/>{user.account.lastUsernameChange != null ? <span className="text-sky-500">Last Username change: <span className="text-white">{dateParse(user.account.lastUsernameChange)}<br/></span></span> :""}<span className="text-sky-500">Profile Views: </span>{prettyNum(user.account.profile_views)}</p>
              </CardContent>
              <CardFooter>
                <p>More stats coming soon</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    );
  } else if (user.error) {
    return <p>not found</p>;
  } else {
    return (
      <main>
        <h1 className="m-5 text-3xl font-bold text-center">Loading...</h1>
        <p className="font-symbol text-center text-6xl animate-spin"></p>
      </main>
    );
  }
}
