export type WeatherDateTime = {
  label: string;
  hours: string;
  minutes: string;
  time: string;
};
export type WeatherDay = {
  weekday: string;
  date: string;
  key: string;
};

type DateFormatters = {
  dateKey: Intl.DateTimeFormat;
  time: Intl.DateTimeFormat;
  dateLong: Intl.DateTimeFormat;
  dateShort: Intl.DateTimeFormat;
  weekdayShort: Intl.DateTimeFormat;
  timeZoneName: Intl.DateTimeFormat;
};

const dateFormatterCache = new Map<string, DateFormatters>();

function dateFormatter(tz: string): DateFormatters {
  let cached = dateFormatterCache.get(tz);

  if (!cached) {
    cached = {
      dateKey: new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: tz,
      }),
      time: new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
        timeZone: tz,
      }),
      dateLong: new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        timeZone: tz,
      }),
      dateShort: new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        timeZone: tz,
      }),
      weekdayShort: new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        timeZone: tz,
      }),
      timeZoneName: new Intl.DateTimeFormat("en-GB", {
        timeZoneName: "short",
        timeZone: tz,
      }),
    };
    dateFormatterCache.set(tz, cached);
  }

  return cached;
}

export function parseWeatherDay(value: string, tz: string): WeatherDay {
  const date = new Date(value);
  const f = dateFormatter(tz);
  return {
    weekday: f.weekdayShort.format(date),
    date: f.dateShort.format(date),
    key: f.dateKey.format(date),
  };
}

export function parseWeatherDateTime(
  value: string,
  tz: string,
): WeatherDateTime {
  const date = new Date(value);
  const f = dateFormatter(tz);

  const timeParts = f.time.formatToParts(date);
  const hours = timeParts.find((part) => part.type === "hour")?.value ?? "";
  const minutes = timeParts.find((part) => part.type === "minute")?.value ?? "";
  const time = `${hours}:${minutes}`;
  const datePart = f.dateLong.format(date);

  // const timezonePart =
  //   f.timeZoneName
  //     .formatToParts(date)
  //     .find((part) => part.type === "timeZoneName")?.value ?? "";

  return {
    hours,
    minutes,
    time,
    label: `${datePart} ${time}`,
  };
}

export function formatTemperature(
  value: number,
  unit: "C" | "F",
): {
  value: number;
  display: string;
} {
  value = unit === "F" ? (value * 9) / 5 + 32 : value;
  return {
    value,
    display: `${Math.round(value)}°`,
  };
}
