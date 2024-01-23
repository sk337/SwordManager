import React, { useEffect, useState } from "react";
import Nav from "@/components/nav";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [profiles, setProfiles] = useState({});
  const [range, setRange] = useState("all");
  const [type, setType] = useState("xp");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchLeaderboard = async () => {};
  }, []);

  if (leaderboard.length == 0) {
    return (
      <main>
        <Nav />
        <div className="flex flex-col items-center">
          <p className="text-3xl text-center font-bold">Leaderboard</p>
          <table className="mt-10 w-4/5">
            <tbody className="w-full" id="data">
              <tr className="w-full bg-slate-700 text-center">
                <td className="p-2 rounded-sm">lol</td>
              </tr>
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
