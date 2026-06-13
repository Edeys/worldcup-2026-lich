const fs = require("fs");
console.log("=== TONG KIEM TRA WORLD CUP 2026 LICH ===");

const d = fs.readFileSync("schedule-data.js","utf8");
const matches = eval(d.slice(d.indexOf("["), d.lastIndexOf("];")+1));
console.log("1. Du lieu:", matches.length, "tran -", new Set(matches.map(m=>m.group)).size, "bang");

const ics = fs.readFileSync("worldcup-2026-lich.ics","utf8");
const events = ics.split("BEGIN:VEVENT").length-1;
console.log("2. .ics file:", events, "events");

const s = fs.readFileSync("script.js","utf8");
console.log("3. Google Calendar:", s.includes("addbyurl") ? "OK - mo settings + toast" : "LOI");
console.log("   Apple:", s.includes("btnApple") && s.includes("WEBCAL_URL") ? "OK - webcal://" : "LOI");
console.log("   toVnTime:", s.includes("Date.UTC(") ? "OK - Date.UTC" : "LOI - van getTime+7");
console.log("   formatDateVN:", s.includes("getUTCDay") ? "OK - getUTC*" : "LOI - van get*");

const h = fs.readFileSync("index.html","utf8");
console.log("   btnGcal:", h.includes("btnGcal") ? "OK" : "LOI");
console.log("   Credit:", h.includes("xuanloi096") ? "OK" : "THIEU");

console.log("=== KET THUC ===");
