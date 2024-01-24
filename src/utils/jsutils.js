import cosmetics from "@/../cosmetics.json";

export function playtimeParse(seconds) {
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

export function prettyNum(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function id2skin(id) {
  for (let i = 0; i < cosmetics.skins.length; i++) {
    if (cosmetics.skins[i].id == id) {
      return cosmetics.skins[i];
    }
  }
}

export function dateParse(dates){
  let date = new Date(dates).toString().split(" ");
  let monthMap= {
    "Jan": "January",
    "Feb": "February",
    "Mar": "March",
    "Apr": "April",
    "May": "May",
    "Jun": "June",
    "Jul": "July",
    "Aug": "August",
    "Sep": "September",
    "Oct": "October",
    "Nov": "November",
    "Dec": "December"
  }
  return `${monthMap[date[1]]} ${date[2]} ${date[3]}`;
}
