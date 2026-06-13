const ICS_URL = location.href.replace(/\/?$/, "/") + "worldcup-2026-lich.ics";
const WEBCAL_URL = "webcal://" + ICS_URL.replace(/^https?:\/\//, "");

document.getElementById("btnApple").href = WEBCAL_URL;

function toVnTime(utcStr) {
  const d = new Date(utcStr + "Z");
  const vn = new Date(d.getTime() + 7 * 3600000);
  return vn;
}

function formatDateVN(date) {
  const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const d = days[date.getDay()];
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${d}, ${dd}/${mm}`;
}

function formatTimeVN(date) {
  const h = date.getHours();
  const m = date.getMinutes();
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function getKhungGio(date) {
  const h = date.getHours();
  if (h < 12) return { label: "Sáng", cls: "badge-morning" };
  if (h < 18) return { label: "Chiều", cls: "badge-afternoon" };
  return { label: "Tối", cls: "badge-evening" };
}

function sortMatches(matches) {
  return [...matches].sort((a, b) => {
    const da = new Date(a.utc + "Z");
    const db = new Date(b.utc + "Z");
    return da - db;
  });
}

function getFilteredMatches() {
  const g = document.getElementById("groupFilter").value;
  return g === "all" ? GROUP_MATCHES : GROUP_MATCHES.filter(m => m.group === g);
}

function renderTable() {
  const tbody = document.getElementById("tableBody");
  const filtered = sortMatches(getFilteredMatches());

  document.getElementById("matchCount").textContent =
    `Hiển thị ${filtered.length}/${GROUP_MATCHES.length} trận`;

  tbody.innerHTML = filtered.map(m => {
    const vn = toVnTime(m.utc);
    const khung = getKhungGio(vn);
    return `<tr>
      <td>M${m.id}</td>
      <td><span class="group-tag">${m.group}</span></td>
      <td>${m.team1}</td>
      <td class="vs">vs</td>
      <td>${m.team2}</td>
      <td>${formatDateVN(vn)}</td>
      <td><strong>${formatTimeVN(vn)}</strong></td>
      <td><span class="badge ${khung.cls}">${khung.label}</span></td>
      <td>${m.stadium}, ${m.city}</td>
    </tr>`;
  }).join("");
}

function showToast(msg, isError = false) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.style.background = isError ? "#ef4444" : "#22c55e";
  t.style.color = isError ? "#fff" : "#052e16";
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3000);
}

function toICSDate(utcStr) {
  const d = utcStr.endsWith("Z") ? new Date(utcStr) : new Date(utcStr + "Z");
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function downloadICS() {
  let ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//WorldCup2026//VN//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:FIFA World Cup 2026 - Lịch thi đấu",
    "X-WR-TIMEZONE:Asia/Ho_Chi_Minh"
  ];

  const sorted = sortMatches(GROUP_MATCHES);

  for (const m of sorted) {
    const dtStart = toICSDate(m.utc);
    const endDate = new Date(new Date(m.utc + "Z").getTime() + 135 * 60000);
    const dtEnd = endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const summary = `[WC26] ${m.team1} vs ${m.team2} (Bảng ${m.group})`;
    const desc = `World Cup 2026 - Vòng bảng\nBảng ${m.group}: ${m.team1} vs ${m.team2}\nSân: ${m.stadium}, ${m.city}`;
    const location = `${m.stadium}, ${m.city}`;

    ics.push("BEGIN:VEVENT");
    ics.push("UID:" + `wc26-m${m.id}@worldcup2026` + new Date().getTime());
    ics.push("DTSTAMP:" + toICSDate(new Date().toISOString()));
    ics.push("DTSTART:" + dtStart);
    ics.push("DTEND:" + dtEnd);
    ics.push("SUMMARY:" + summary);
    ics.push("DESCRIPTION:" + desc);
    ics.push("LOCATION:" + location);
    ics.push("CATEGORIES:WORLD CUP 2026,FOOTBALL,SOCCER");
    ics.push("END:VEVENT");
  }

  ics.push("END:VCALENDAR");
  const blob = new Blob([ics.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "worldcup-2026-lich.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("✅ Đã tải file .ics!");
}

function syncGoogleCalendar(e) {
  downloadICS();
  showToast("📥 Đã tải file .ics! Vào Google Calendar → ⚙️ Settings → Import & Export → Import → chọn file vừa tải");
}

function copyShareLink() {
  const url = window.location.href;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      showToast("✅ Đã sao chép link: " + url);
    }).catch(() => fallbackCopy(url));
  } else {
    fallbackCopy(url);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); showToast("✅ Đã sao chép link!"); }
  catch { showToast("❌ Không thể copy, hãy copy thủ công", true); }
  document.body.removeChild(ta);
}

renderTable();
