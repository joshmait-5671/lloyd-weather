/**
 * Open-Meteo weather fetcher for NYC tri-state locations.
 * Free API, no key needed.
 */

const LOCATIONS: Record<string, { lat: number; lon: number; label: string }> = {
  westchester: { lat: 41.03, lon: -73.76, label: "Westchester, NY" },
  montauk: { lat: 41.04, lon: -71.95, label: "Montauk, NY" },
  windham: { lat: 42.3, lon: -74.25, label: "Windham, NY" },
  "long-island": { lat: 40.79, lon: -73.13, label: "Long Island, NY" },
  "north-jersey": { lat: 40.88, lon: -74.17, label: "North Jersey" },
  fairfield: { lat: 41.14, lon: -73.26, label: "Fairfield, CT" },
  nyc: { lat: 40.71, lon: -74.01, label: "New York City" },
  hamptons: { lat: 40.96, lon: -72.18, label: "The Hamptons, NY" },
  "hunter-mountain": { lat: 42.18, lon: -74.23, label: "Hunter Mountain, NY" },
};

export type WeatherData = {
  location: string;
  current: {
    temperature_f: number;
    feels_like_f: number;
    humidity: number;
    wind_mph: number;
    wind_direction: string;
    weather_description: string;
    precipitation_in: number;
  };
  daily: Array<{
    date: string;
    day_name: string;
    high_f: number;
    low_f: number;
    precipitation_probability: number;
    precipitation_sum_in: number;
    wind_max_mph: number;
    weather_description: string;
  }>;
};

const WMO_CODES: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

const WIND_DIRS = [
  "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
  "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW",
];

function degToDir(deg: number): string {
  return WIND_DIRS[Math.round(deg / 22.5) % 16];
}

function cToF(c: number): number {
  return Math.round(c * 9 / 5 + 32);
}

function mmToIn(mm: number): number {
  return Math.round(mm / 25.4 * 100) / 100;
}

function kmhToMph(kmh: number): number {
  return Math.round(kmh * 0.621);
}

function getDayName(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const diff = Math.round((d.getTime() - today.getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return d.toLocaleDateString("en-US", { weekday: "long" });
}

export async function getWeather(locationKey: string): Promise<WeatherData> {
  const loc = LOCATIONS[locationKey] || LOCATIONS.westchester;

  const params = new URLSearchParams({
    latitude: loc.lat.toString(),
    longitude: loc.lon.toString(),
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max",
    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
    precipitation_unit: "mm",
    timezone: "America/New_York",
    forecast_days: "7",
  });

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!res.ok) throw new Error(`Open-Meteo API error: ${res.status}`);
  const data = await res.json();

  const c = data.current;
  const d = data.daily;

  return {
    location: loc.label,
    current: {
      temperature_f: cToF(c.temperature_2m),
      feels_like_f: cToF(c.apparent_temperature),
      humidity: c.relative_humidity_2m,
      wind_mph: kmhToMph(c.wind_speed_10m),
      wind_direction: degToDir(c.wind_direction_10m),
      weather_description: WMO_CODES[c.weather_code] || "Unknown",
      precipitation_in: mmToIn(c.precipitation),
    },
    daily: d.time.map((date: string, i: number) => ({
      date,
      day_name: getDayName(date),
      high_f: cToF(d.temperature_2m_max[i]),
      low_f: cToF(d.temperature_2m_min[i]),
      precipitation_probability: d.precipitation_probability_max[i],
      precipitation_sum_in: mmToIn(d.precipitation_sum[i]),
      wind_max_mph: kmhToMph(d.wind_speed_10m_max[i]),
      weather_description: WMO_CODES[d.weather_code[i]] || "Unknown",
    })),
  };
}

export function getLocationOptions() {
  return Object.entries(LOCATIONS).map(([key, val]) => ({
    key,
    label: val.label,
  }));
}
