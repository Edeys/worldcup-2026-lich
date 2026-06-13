const fs = require("fs");

const GROUP_MATCHES = [
  { id: 1, group: "A", team1: "México", team2: "Nam Phi", utc: "2026-06-11T19:00:00", stadium: "Estadio Azteca", city: "Mexico City" },
  { id: 2, group: "A", team1: "Hàn Quốc", team2: "CH Séc", utc: "2026-06-12T02:00:00", stadium: "Estadio Akron", city: "Zapopan" },
  { id: 25, group: "A", team1: "CH Séc", team2: "Nam Phi", utc: "2026-06-18T16:00:00", stadium: "Mercedes-Benz Stadium", city: "Atlanta" },
  { id: 28, group: "A", team1: "México", team2: "Hàn Quốc", utc: "2026-06-19T01:00:00", stadium: "Estadio Akron", city: "Zapopan" },
  { id: 53, group: "A", team1: "CH Séc", team2: "México", utc: "2026-06-25T01:00:00", stadium: "Estadio Azteca", city: "Mexico City" },
  { id: 54, group: "A", team1: "Nam Phi", team2: "Hàn Quốc", utc: "2026-06-25T01:00:00", stadium: "Estadio BBVA", city: "Guadalupe" },
  { id: 3, group: "B", team1: "Canada", team2: "Bosna & Hercegovina", utc: "2026-06-12T19:00:00", stadium: "BMO Field", city: "Toronto" },
  { id: 8, group: "B", team1: "Qatar", team2: "Thụy Sĩ", utc: "2026-06-13T19:00:00", stadium: "Levi's Stadium", city: "Santa Clara" },
  { id: 26, group: "B", team1: "Thụy Sĩ", team2: "Bosna & Hercegovina", utc: "2026-06-18T19:00:00", stadium: "SoFi Stadium", city: "Inglewood" },
  { id: 27, group: "B", team1: "Canada", team2: "Qatar", utc: "2026-06-18T22:00:00", stadium: "BC Place", city: "Vancouver" },
  { id: 51, group: "B", team1: "Thụy Sĩ", team2: "Canada", utc: "2026-06-24T19:00:00", stadium: "BC Place", city: "Vancouver" },
  { id: 52, group: "B", team1: "Bosna & Hercegovina", team2: "Qatar", utc: "2026-06-24T19:00:00", stadium: "Lumen Field", city: "Seattle" },
  { id: 5, group: "C", team1: "Haiti", team2: "Scotland", utc: "2026-06-14T01:00:00", stadium: "Gillette Stadium", city: "Foxborough" },
  { id: 7, group: "C", team1: "Brasil", team2: "Maroc", utc: "2026-06-13T22:00:00", stadium: "MetLife Stadium", city: "East Rutherford" },
  { id: 29, group: "C", team1: "Brasil", team2: "Haiti", utc: "2026-06-20T00:30:00", stadium: "Lincoln Financial Field", city: "Philadelphia" },
  { id: 30, group: "C", team1: "Scotland", team2: "Maroc", utc: "2026-06-19T22:00:00", stadium: "Gillette Stadium", city: "Foxborough" },
  { id: 49, group: "C", team1: "Scotland", team2: "Brasil", utc: "2026-06-24T22:00:00", stadium: "Hard Rock Stadium", city: "Miami Gardens" },
  { id: 50, group: "C", team1: "Maroc", team2: "Haiti", utc: "2026-06-24T22:00:00", stadium: "Mercedes-Benz Stadium", city: "Atlanta" },
  { id: 4, group: "D", team1: "Mỹ", team2: "Paraguay", utc: "2026-06-13T01:00:00", stadium: "SoFi Stadium", city: "Inglewood" },
  { id: 6, group: "D", team1: "Úc", team2: "Thổ Nhĩ Kỳ", utc: "2026-06-14T04:00:00", stadium: "BC Place", city: "Vancouver" },
  { id: 31, group: "D", team1: "Thổ Nhĩ Kỳ", team2: "Paraguay", utc: "2026-06-20T03:00:00", stadium: "Levi's Stadium", city: "Santa Clara" },
  { id: 32, group: "D", team1: "Mỹ", team2: "Úc", utc: "2026-06-19T19:00:00", stadium: "Lumen Field", city: "Seattle" },
  { id: 59, group: "D", team1: "Thổ Nhĩ Kỳ", team2: "Mỹ", utc: "2026-06-26T02:00:00", stadium: "SoFi Stadium", city: "Inglewood" },
  { id: 60, group: "D", team1: "Paraguay", team2: "Úc", utc: "2026-06-26T02:00:00", stadium: "Levi's Stadium", city: "Santa Clara" },
  { id: 9, group: "E", team1: "Bờ Biển Ngà", team2: "Ecuador", utc: "2026-06-14T23:00:00", stadium: "Lincoln Financial Field", city: "Philadelphia" },
  { id: 10, group: "E", team1: "Đức", team2: "Curaçao", utc: "2026-06-14T17:00:00", stadium: "NRG Stadium", city: "Houston" },
  { id: 33, group: "E", team1: "Đức", team2: "Bờ Biển Ngà", utc: "2026-06-20T20:00:00", stadium: "BMO Field", city: "Toronto" },
  { id: 34, group: "E", team1: "Ecuador", team2: "Curaçao", utc: "2026-06-21T00:00:00", stadium: "Arrowhead Stadium", city: "Kansas City" },
  { id: 55, group: "E", team1: "Curaçao", team2: "Bờ Biển Ngà", utc: "2026-06-25T20:00:00", stadium: "Lincoln Financial Field", city: "Philadelphia" },
  { id: 56, group: "E", team1: "Ecuador", team2: "Đức", utc: "2026-06-25T20:00:00", stadium: "MetLife Stadium", city: "East Rutherford" },
  { id: 11, group: "F", team1: "Hà Lan", team2: "Nhật Bản", utc: "2026-06-14T20:00:00", stadium: "AT&T Stadium", city: "Arlington" },
  { id: 12, group: "F", team1: "Thụy Điển", team2: "Tunisia", utc: "2026-06-15T02:00:00", stadium: "Estadio BBVA", city: "Guadalupe" },
  { id: 35, group: "F", team1: "Hà Lan", team2: "Thụy Điển", utc: "2026-06-20T17:00:00", stadium: "NRG Stadium", city: "Houston" },
  { id: 36, group: "F", team1: "Tunisia", team2: "Nhật Bản", utc: "2026-06-21T04:00:00", stadium: "Estadio BBVA", city: "Guadalupe" },
  { id: 57, group: "F", team1: "Nhật Bản", team2: "Thụy Điển", utc: "2026-06-25T23:00:00", stadium: "AT&T Stadium", city: "Arlington" },
  { id: 58, group: "F", team1: "Tunisia", team2: "Hà Lan", utc: "2026-06-25T23:00:00", stadium: "Arrowhead Stadium", city: "Kansas City" },
  { id: 15, group: "G", team1: "Iran", team2: "New Zealand", utc: "2026-06-16T01:00:00", stadium: "SoFi Stadium", city: "Inglewood" },
  { id: 16, group: "G", team1: "Bỉ", team2: "Ai Cập", utc: "2026-06-15T19:00:00", stadium: "Lumen Field", city: "Seattle" },
  { id: 39, group: "G", team1: "Bỉ", team2: "Iran", utc: "2026-06-21T19:00:00", stadium: "SoFi Stadium", city: "Inglewood" },
  { id: 40, group: "G", team1: "New Zealand", team2: "Ai Cập", utc: "2026-06-22T01:00:00", stadium: "BC Place", city: "Vancouver" },
  { id: 63, group: "G", team1: "Ai Cập", team2: "Iran", utc: "2026-06-27T03:00:00", stadium: "Lumen Field", city: "Seattle" },
  { id: 64, group: "G", team1: "New Zealand", team2: "Bỉ", utc: "2026-06-27T03:00:00", stadium: "BC Place", city: "Vancouver" },
  { id: 13, group: "H", team1: "Ả Rập Xê Út", team2: "Uruguay", utc: "2026-06-15T22:00:00", stadium: "Hard Rock Stadium", city: "Miami Gardens" },
  { id: 14, group: "H", team1: "Tây Ban Nha", team2: "Cabo Verde", utc: "2026-06-15T16:00:00", stadium: "Mercedes-Benz Stadium", city: "Atlanta" },
  { id: 37, group: "H", team1: "Uruguay", team2: "Cabo Verde", utc: "2026-06-21T22:00:00", stadium: "Hard Rock Stadium", city: "Miami Gardens" },
  { id: 38, group: "H", team1: "Tây Ban Nha", team2: "Ả Rập Xê Út", utc: "2026-06-21T16:00:00", stadium: "Mercedes-Benz Stadium", city: "Atlanta" },
  { id: 65, group: "H", team1: "Cabo Verde", team2: "Ả Rập Xê Út", utc: "2026-06-27T00:00:00", stadium: "NRG Stadium", city: "Houston" },
  { id: 66, group: "H", team1: "Uruguay", team2: "Tây Ban Nha", utc: "2026-06-27T00:00:00", stadium: "Estadio Akron", city: "Zapopan" },
  { id: 17, group: "I", team1: "Pháp", team2: "Sénégal", utc: "2026-06-16T19:00:00", stadium: "MetLife Stadium", city: "East Rutherford" },
  { id: 18, group: "I", team1: "Iraq", team2: "Na Uy", utc: "2026-06-16T22:00:00", stadium: "Gillette Stadium", city: "Foxborough" },
  { id: 41, group: "I", team1: "Na Uy", team2: "Sénégal", utc: "2026-06-23T00:00:00", stadium: "MetLife Stadium", city: "East Rutherford" },
  { id: 42, group: "I", team1: "Pháp", team2: "Iraq", utc: "2026-06-22T21:00:00", stadium: "Lincoln Financial Field", city: "Philadelphia" },
  { id: 61, group: "I", team1: "Na Uy", team2: "Pháp", utc: "2026-06-26T19:00:00", stadium: "Gillette Stadium", city: "Foxborough" },
  { id: 62, group: "I", team1: "Sénégal", team2: "Iraq", utc: "2026-06-26T19:00:00", stadium: "BMO Field", city: "Toronto" },
  { id: 19, group: "J", team1: "Argentina", team2: "Algérie", utc: "2026-06-17T01:00:00", stadium: "Arrowhead Stadium", city: "Kansas City" },
  { id: 20, group: "J", team1: "Áo", team2: "Jordan", utc: "2026-06-17T04:00:00", stadium: "Levi's Stadium", city: "Santa Clara" },
  { id: 43, group: "J", team1: "Argentina", team2: "Áo", utc: "2026-06-22T17:00:00", stadium: "AT&T Stadium", city: "Arlington" },
  { id: 44, group: "J", team1: "Jordan", team2: "Algérie", utc: "2026-06-23T03:00:00", stadium: "Levi's Stadium", city: "Santa Clara" },
  { id: 69, group: "J", team1: "Algérie", team2: "Áo", utc: "2026-06-28T02:00:00", stadium: "Arrowhead Stadium", city: "Kansas City" },
  { id: 70, group: "J", team1: "Jordan", team2: "Argentina", utc: "2026-06-28T02:00:00", stadium: "AT&T Stadium", city: "Arlington" },
  { id: 23, group: "K", team1: "Bồ Đào Nha", team2: "CHDC Congo", utc: "2026-06-17T17:00:00", stadium: "NRG Stadium", city: "Houston" },
  { id: 24, group: "K", team1: "Uzbekistan", team2: "Colombia", utc: "2026-06-18T02:00:00", stadium: "Estadio Azteca", city: "Mexico City" },
  { id: 47, group: "K", team1: "Bồ Đào Nha", team2: "Uzbekistan", utc: "2026-06-23T17:00:00", stadium: "NRG Stadium", city: "Houston" },
  { id: 48, group: "K", team1: "Colombia", team2: "CHDC Congo", utc: "2026-06-24T02:00:00", stadium: "Estadio Akron", city: "Zapopan" },
  { id: 71, group: "K", team1: "Colombia", team2: "Bồ Đào Nha", utc: "2026-06-27T23:30:00", stadium: "Hard Rock Stadium", city: "Miami Gardens" },
  { id: 72, group: "K", team1: "CHDC Congo", team2: "Uzbekistan", utc: "2026-06-27T23:30:00", stadium: "Mercedes-Benz Stadium", city: "Atlanta" },
  { id: 21, group: "L", team1: "Ghana", team2: "Panama", utc: "2026-06-17T23:00:00", stadium: "BMO Field", city: "Toronto" },
  { id: 22, group: "L", team1: "Anh", team2: "Croatia", utc: "2026-06-17T20:00:00", stadium: "AT&T Stadium", city: "Arlington" },
  { id: 45, group: "L", team1: "Anh", team2: "Ghana", utc: "2026-06-23T20:00:00", stadium: "Gillette Stadium", city: "Foxborough" },
  { id: 46, group: "L", team1: "Panama", team2: "Croatia", utc: "2026-06-23T23:00:00", stadium: "BMO Field", city: "Toronto" },
  { id: 67, group: "L", team1: "Panama", team2: "Anh", utc: "2026-06-27T21:00:00", stadium: "MetLife Stadium", city: "East Rutherford" },
  { id: 68, group: "L", team1: "Croatia", team2: "Ghana", utc: "2026-06-27T21:00:00", stadium: "Lincoln Financial Field", city: "Philadelphia" },
];

function toICSDate(utcStr) {
  const d = utcStr.endsWith("Z") ? new Date(utcStr) : new Date(utcStr + "Z");
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

const SITE_URL = "https://edeys.github.io/worldcup-2026-lich";

let lines = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//WorldCup2026//VN//EN",
  "CALSCALE:GREGORIAN",
  "METHOD:PUBLISH",
  "X-WR-CALNAME:FIFA World Cup 2026 - Lịch thi đấu (VN)",
  "X-WR-TIMEZONE:Asia/Ho_Chi_Minh",
  "X-PUBLISHED-TTL:PT12H",
];

GROUP_MATCHES.sort((a, b) => new Date(a.utc + "Z") - new Date(b.utc + "Z"));

for (const m of GROUP_MATCHES) {
  const dtStart = toICSDate(m.utc);
  const endDate = new Date(new Date(m.utc + "Z").getTime() + 135 * 60000);
  const dtEnd = endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const summary = `[WC26] ${m.team1} vs ${m.team2} (Bảng ${m.group})`;
  const desc = `FIFA World Cup 2026 - Vòng bảng\\nBảng ${m.group}: ${m.team1} vs ${m.team2}\\nSân: ${m.stadium}, ${m.city}`;
  const location = `${m.stadium}, ${m.city}`;

  lines.push("BEGIN:VEVENT");
  lines.push(`UID:wc26-m${m.id}@worldcup2026`);
  lines.push(`DTSTAMP:${toICSDate(new Date().toISOString())}`);
  lines.push(`DTSTART:${dtStart}`);
  lines.push(`DTEND:${dtEnd}`);
  lines.push(`SUMMARY:${summary}`);
  lines.push(`DESCRIPTION:${desc}`);
  lines.push(`LOCATION:${location}`);
  lines.push("CATEGORIES:WORLD CUP 2026,FOOTBALL,SOCCER");
  lines.push("END:VEVENT");
}

lines.push("END:VCALENDAR");

fs.writeFileSync("worldcup-2026-lich.ics", lines.join("\r\n"), "utf8");
console.log("✅ worldcup-2026-lich.ics created with " + GROUP_MATCHES.length + " events");
