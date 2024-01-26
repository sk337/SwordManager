export const types = {
  kills: "Kills",
  coins: "Coins",
  playtime: "Survived",
  xp: "XP",
};

export const ranges = {
  all: "All-Time",
  day: "Past Day",
  week: "Past Week",
};

export const rangeLst = [
  ["all", "All-Time"],
  ["day", "Past Day"],
  ["week", "Past Week"],
];
export const typeLst = [
  ["kills", "Kills"],
  ["coins", "Coins"],
  ["playtime", "Survived"],
  ["xp", "XP"],
  ["coins", "Total Coins"],
  ["kills", "Total Stabs"],
  ["playtime", "Total Playtime"],
];

const ApiUrl = "https://sb-api-fb48ef34a197.herokuapp.com/";

export async function getLeaderboard(range, type) {
  const isGames = type === "coins" || type === "kills" || type === "playtime";
  const leaders = await fetch(`${ApiUrl}${isGames ? "games" : "stats"}/fetch`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      timeRange: range,
      sortBy: type,
      limit: 100,
    }),
  });
  const data = await leaders.json();
  console.log(data);
  return data;
}
