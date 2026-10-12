import { getJSON } from './api.js';

// Open-Meteo: public, no API key, no sign-up (see README)
const GEO = 'https://geocoding-api.open-meteo.com/v1/search';
const WX = 'https://api.open-meteo.com/v1/forecast';

// City name in, forecast out — any city in the world
export async function loadWeather(city) {
  const q = new URLSearchParams({
    name: city,
    count: 1,
  });
  const geo = await getJSON(`${GEO}?${q}`);
  if (!geo.results?.length) throw new Error('not-found');

  const { latitude, longitude, name, admin1, country } = geo.results[0];
  const p = new URLSearchParams({
    latitude,
    longitude,
    forecast_days: 3,
    timezone: 'auto', // the searched city's own local time
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
  });
  const forecast = await getJSON(`${WX}?${p}`);

  return { name, region: admin1, country, ...forecast };
}
