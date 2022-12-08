export const units = {
  year: 31536000,
  month: 2592000,
  week: 604800,
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
};

type TimeSinceConfig = {
  shorthand?: boolean;
  roundSeconds?: number;
};

export function timeSince(date: Date, config?: TimeSinceConfig) {
  const seconds = getSecondsForDate(date, config);

  let unit = "second";
  let since: number | string = 0;

  if (seconds < (config?.roundSeconds ?? 1)) {
    return "now";
  }

  for (const u of Object.keys(units)) {
    const s: number | string = Math.floor(
      seconds / units[u as keyof typeof units]
    );
    if (s >= 1) {
      unit = u;
      since = s;
      break;
    }
  }

  const s = since === 1 ? "" : "s";
  if (since === 1 && !config?.shorthand) {
    since = unit === "hour" ? "an" : "a";
  }
  return config?.shorthand ? since + unit[0] : `${since} ${unit + s} ago`;
}

export function secondsUntilNextValue(date: Date, config?: TimeSinceConfig) {
  const seconds = getSecondsForDate(date, config);

  for (const key of Object.keys(units)) {
    const unit = units[key as keyof typeof units];
    const since = Math.floor(seconds / unit);
    if (since >= 1) {
      if (key === "second") {
        return 1;
      }
      return unit * (since + 1) - seconds;
    }
  }

  return 1;
}

function getSecondsForDate(date: Date, config?: TimeSinceConfig) {
  const now = Date.now();
  let seconds = Math.floor((now - date.getTime()) / 1000);

  if (config?.roundSeconds && seconds < 60) {
    seconds -= seconds % config.roundSeconds;
  }

  return seconds;
}

export function secondsPastSince(date: Date) {
  const now = Date.now();
  return Math.floor((now - date.getTime()) / 1000);
}

export function unitFromSeconds(seconds: number) {
  for (const key of Object.keys(units)) {
    const unit = units[key as keyof typeof units];
    const since = Math.floor(seconds / unit);
    if (since >= 1) {
      return unit;
    }
  }
}
