// Business hours / open-now logic, ported from the website's
// src/utils/businessHours.ts (Asia/Kathmandu).
const sundayOpen = 10;
const sundayClose = 18;
const weekdayOpen = 9;
const weekdayClose = 20;

function kathmanduNow() {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kathmandu",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  const parts = fmt.formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    weekday: get("weekday"),
    hour: parseInt(get("hour"), 10),
    minute: parseInt(get("minute"), 10),
  };
}

export function isOpenNow(): boolean {
  const { weekday, hour, minute } = kathmanduNow();
  if (weekday === "Sun") {
    return hour > sundayOpen && hour < sundayClose;
  }
  return hour >= weekdayOpen && (hour < weekdayClose || (hour === weekdayClose && minute === 0));
}
