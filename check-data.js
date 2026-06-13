const fs = require('fs');

// Parse my data
const code = fs.readFileSync('schedule-data.js', 'utf8');
const start = code.indexOf('[');
const end = code.lastIndexOf('];') + 1;
const GROUP_MATCHES = eval(code.slice(start, end));

// Source data [id, group, team1, team2, utc, stadium, city]
const SRC = [
  [1,"A","Mexico","South Africa","2026-06-11T19:00:00","Estadio Azteca","Mexico City"],
  [2,"A","South Korea","Czech Republic","2026-06-12T02:00:00","Estadio Akron","Zapopan"],
  [3,"B","Canada","Bosnia and Herzegovina","2026-06-12T19:00:00","BMO Field","Toronto"],
  [4,"D","United States","Paraguay","2026-06-13T01:00:00","SoFi Stadium","Inglewood"],
  [5,"C","Haiti","Scotland","2026-06-14T01:00:00","Gillette Stadium","Foxborough"],
  [6,"D","Australia","Turkey","2026-06-14T04:00:00","BC Place","Vancouver"],
  [7,"C","Brazil","Morocco","2026-06-13T22:00:00","MetLife Stadium","East Rutherford"],
  [8,"B","Qatar","Switzerland","2026-06-13T19:00:00","Levi's Stadium","Santa Clara"],
  [9,"E","Ivory Coast","Ecuador","2026-06-14T23:00:00","Lincoln Financial Field","Philadelphia"],
  [10,"E","Germany","Curaçao","2026-06-14T17:00:00","NRG Stadium","Houston"],
  [11,"F","Netherlands","Japan","2026-06-14T20:00:00","AT&T Stadium","Arlington"],
  [12,"F","Sweden","Tunisia","2026-06-15T02:00:00","Estadio BBVA","Guadalupe"],
  [13,"H","Saudi Arabia","Uruguay","2026-06-15T22:00:00","Hard Rock Stadium","Miami Gardens"],
  [14,"H","Spain","Cape Verde","2026-06-15T16:00:00","Mercedes-Benz Stadium","Atlanta"],
  [15,"G","Iran","New Zealand","2026-06-16T01:00:00","SoFi Stadium","Inglewood"],
  [16,"G","Belgium","Egypt","2026-06-15T19:00:00","Lumen Field","Seattle"],
  [17,"I","France","Senegal","2026-06-16T19:00:00","MetLife Stadium","East Rutherford"],
  [18,"I","Iraq","Norway","2026-06-16T22:00:00","Gillette Stadium","Foxborough"],
  [19,"J","Argentina","Algeria","2026-06-17T01:00:00","Arrowhead Stadium","Kansas City"],
  [20,"J","Austria","Jordan","2026-06-17T04:00:00","Levi's Stadium","Santa Clara"],
  [21,"L","Ghana","Panama","2026-06-17T23:00:00","BMO Field","Toronto"],
  [22,"L","England","Croatia","2026-06-17T20:00:00","AT&T Stadium","Arlington"],
  [23,"K","Portugal","DR Congo","2026-06-17T17:00:00","NRG Stadium","Houston"],
  [24,"K","Uzbekistan","Colombia","2026-06-18T02:00:00","Estadio Azteca","Mexico City"],
  [25,"A","Czech Republic","South Africa","2026-06-18T16:00:00","Mercedes-Benz Stadium","Atlanta"],
  [26,"B","Switzerland","Bosnia and Herzegovina","2026-06-18T19:00:00","SoFi Stadium","Inglewood"],
  [27,"B","Canada","Qatar","2026-06-18T22:00:00","BC Place","Vancouver"],
  [28,"A","Mexico","South Korea","2026-06-19T01:00:00","Estadio Akron","Zapopan"],
  [29,"C","Brazil","Haiti","2026-06-20T00:30:00","Lincoln Financial Field","Philadelphia"],
  [30,"C","Scotland","Morocco","2026-06-19T22:00:00","Gillette Stadium","Foxborough"],
  [31,"D","Turkey","Paraguay","2026-06-20T03:00:00","Levi's Stadium","Santa Clara"],
  [32,"D","United States","Australia","2026-06-19T19:00:00","Lumen Field","Seattle"],
  [33,"E","Germany","Ivory Coast","2026-06-20T20:00:00","BMO Field","Toronto"],
  [34,"E","Ecuador","Curaçao","2026-06-21T00:00:00","Arrowhead Stadium","Kansas City"],
  [35,"F","Netherlands","Sweden","2026-06-20T17:00:00","NRG Stadium","Houston"],
  [36,"F","Tunisia","Japan","2026-06-21T04:00:00","Estadio BBVA","Guadalupe"],
  [37,"H","Uruguay","Cape Verde","2026-06-21T22:00:00","Hard Rock Stadium","Miami Gardens"],
  [38,"H","Spain","Saudi Arabia","2026-06-21T16:00:00","Mercedes-Benz Stadium","Atlanta"],
  [39,"G","Belgium","Iran","2026-06-21T19:00:00","SoFi Stadium","Inglewood"],
  [40,"G","New Zealand","Egypt","2026-06-22T01:00:00","BC Place","Vancouver"],
  [41,"I","Norway","Senegal","2026-06-23T00:00:00","MetLife Stadium","East Rutherford"],
  [42,"I","France","Iraq","2026-06-22T21:00:00","Lincoln Financial Field","Philadelphia"],
  [43,"J","Argentina","Austria","2026-06-22T17:00:00","AT&T Stadium","Arlington"],
  [44,"J","Jordan","Algeria","2026-06-23T03:00:00","Levi's Stadium","Santa Clara"],
  [45,"L","England","Ghana","2026-06-23T20:00:00","Gillette Stadium","Foxborough"],
  [46,"L","Panama","Croatia","2026-06-23T23:00:00","BMO Field","Toronto"],
  [47,"K","Portugal","Uzbekistan","2026-06-23T17:00:00","NRG Stadium","Houston"],
  [48,"K","Colombia","DR Congo","2026-06-24T02:00:00","Estadio Akron","Zapopan"],
  [49,"C","Scotland","Brazil","2026-06-24T22:00:00","Hard Rock Stadium","Miami Gardens"],
  [50,"C","Morocco","Haiti","2026-06-24T22:00:00","Mercedes-Benz Stadium","Atlanta"],
  [51,"B","Switzerland","Canada","2026-06-24T19:00:00","BC Place","Vancouver"],
  [52,"B","Bosnia and Herzegovina","Qatar","2026-06-24T19:00:00","Lumen Field","Seattle"],
  [53,"A","Czech Republic","Mexico","2026-06-25T01:00:00","Estadio Azteca","Mexico City"],
  [54,"A","South Africa","South Korea","2026-06-25T01:00:00","Estadio BBVA","Guadalupe"],
  [55,"E","Curaçao","Ivory Coast","2026-06-25T20:00:00","Lincoln Financial Field","Philadelphia"],
  [56,"E","Ecuador","Germany","2026-06-25T20:00:00","MetLife Stadium","East Rutherford"],
  [57,"F","Japan","Sweden","2026-06-25T23:00:00","AT&T Stadium","Arlington"],
  [58,"F","Tunisia","Netherlands","2026-06-25T23:00:00","Arrowhead Stadium","Kansas City"],
  [59,"D","Turkey","United States","2026-06-26T02:00:00","SoFi Stadium","Inglewood"],
  [60,"D","Paraguay","Australia","2026-06-26T02:00:00","Levi's Stadium","Santa Clara"],
  [61,"I","Norway","France","2026-06-26T19:00:00","Gillette Stadium","Foxborough"],
  [62,"I","Senegal","Iraq","2026-06-26T19:00:00","BMO Field","Toronto"],
  [63,"G","Egypt","Iran","2026-06-27T03:00:00","Lumen Field","Seattle"],
  [64,"G","New Zealand","Belgium","2026-06-27T03:00:00","BC Place","Vancouver"],
  [65,"H","Cape Verde","Saudi Arabia","2026-06-27T00:00:00","NRG Stadium","Houston"],
  [66,"H","Uruguay","Spain","2026-06-27T00:00:00","Estadio Akron","Zapopan"],
  [67,"L","Panama","England","2026-06-27T21:00:00","MetLife Stadium","East Rutherford"],
  [68,"L","Croatia","Ghana","2026-06-27T21:00:00","Lincoln Financial Field","Philadelphia"],
  [69,"J","Algeria","Austria","2026-06-28T02:00:00","Arrowhead Stadium","Kansas City"],
  [70,"J","Jordan","Argentina","2026-06-28T02:00:00","AT&T Stadium","Arlington"],
  [71,"K","Colombia","Portugal","2026-06-27T23:30:00","Hard Rock Stadium","Miami Gardens"],
  [72,"K","DR Congo","Uzbekistan","2026-06-27T23:30:00","Mercedes-Benz Stadium","Atlanta"],
];

const TIER1 = new Set([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]);
const TIER2 = new Set([25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]);
const TIER3 = new Set([49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72]);

const VN = {
  "Mexico":"Mexico","South Africa":"Nam Phi","South Korea":"Hàn Quốc","Czech Republic":"CH Séc",
  "Canada":"Canada","Bosnia and Herzegovina":"Bosna & Hercegovina","United States":"Mỹ","Paraguay":"Paraguay",
  "Haiti":"Haiti","Scotland":"Scotland","Australia":"Úc","Turkey":"Thổ Nhĩ Kỳ","Brazil":"Brasil",
  "Morocco":"Maroc","Qatar":"Qatar","Switzerland":"Thụy Sĩ","Ivory Coast":"Bờ Biển Ngà","Ecuador":"Ecuador",
  "Germany":"Đức","Curaçao":"Curaçao","Netherlands":"Hà Lan","Japan":"Nhật Bản","Sweden":"Thụy Điển",
  "Tunisia":"Tunisia","Saudi Arabia":"Ả Rập Xê Út","Uruguay":"Uruguay","Spain":"Tây Ban Nha","Cape Verde":"Cabo Verde",
  "Iran":"Iran","New Zealand":"New Zealand","Belgium":"Bỉ","Egypt":"Ai Cập",
  "France":"Pháp","Senegal":"Sénégal","Iraq":"Iraq","Norway":"Na Uy",
  "Argentina":"Argentina","Algeria":"Algérie","Austria":"Áo","Jordan":"Jordan",
  "Ghana":"Ghana","Panama":"Panama","England":"Anh","Croatia":"Croatia",
  "Portugal":"Bồ Đào Nha","DR Congo":"CHDC Congo","Uzbekistan":"Uzbekistan","Colombia":"Colombia"
};

const myMap = {};
GROUP_MATCHES.forEach(m => { myMap[m.id] = m; });

let errs = [];

SRC.forEach(s => {
  const [id, grp, t1, t2, utc, stad, cit] = s;
  const my = myMap[id];
  if (!my) { errs.push(`M${id}: MISSING`); return; }

  // Check teams - both must be present in the match
  const v1 = VN[t1];
  const v2 = VN[t2];
  const myTeams = [my.team1, my.team2];
  
  if (!myTeams.includes(v1)) errs.push(`M${id}: thiếu đội "${v1}" (có: ${my.team1} vs ${my.team2})`);
  if (!myTeams.includes(v2)) errs.push(`M${id}: thiếu đội "${v2}" (có: ${my.team1} vs ${my.team2})`);

  // Check group
  if (my.group !== grp) errs.push(`M${id}: sai bảng ${my.group} (phải là ${grp})`);

  // Check UTC
  if (my.utc !== utc) errs.push(`M${id}: SAI GIỜ! "${my.utc}" (phải là "${utc}") - ${my.team1} vs ${my.team2}`);

  // Check stadium-city
  if (my.stadium !== stad || my.city !== cit) {
    errs.push(`M${id}: sai sân/city "${my.stadium}, ${my.city}" (phải là "${stad}, ${cit}")`);
  }
});

// Check for duplicates in our data
const seen = {};
GROUP_MATCHES.forEach(m => {
  const key = `${m.team1}|${m.team2}`;
  if (seen[key]) errs.push(`TRÙNG: M${seen[key]} và M${m.id} đều là ${m.team1} vs ${m.team2}`);
  seen[key] = m.id;
});

if (errs.length === 0) {
  console.log("✅ Tất cả 72 trận ĐÚNG! Không có lỗi.");
} else {
  console.log(`🔴 Có ${errs.length} lỗi:\n`);
  errs.forEach(e => console.log("  " + e));
}
