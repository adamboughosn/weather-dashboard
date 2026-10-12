import { describe } from './conditions.js';

// The only file that touches the DOM
const statusEl   = document.querySelector('#status');
const searchBtn  = document.querySelector('#search-btn');
const retryBtn   = document.querySelector('#retry-btn');
const weatherEl  = document.querySelector('#weather');
const placeEl    = document.querySelector('#place');
const updatedEl  = document.querySelector('#updated');
const iconEl     = document.querySelector('#icon');
const tempEl     = document.querySelector('#temp');
const condEl     = document.querySelector('#condition');
const feelsEl    = document.querySelector('#feels');
const humidityEl = document.querySelector('#humidity');
const windEl     = document.querySelector('#wind');
const forecastEl = document.querySelector('#forecast');

// Four states: idle, loading, success, error
export function setStatus(state, message = '') {
  statusEl.dataset.state = state;    // styled in CSS
  statusEl.textContent = message;
  searchBtn.disabled = state === 'loading';
  retryBtn.hidden = state !== 'error';
  if (state === 'error') weatherEl.hidden = true;
}

// One function turns the data into the page. API text goes in with textContent.
export function renderWeather(data) {
  const { name, region, country, current, daily } = data;
  const now = describe(current.weather_code);

  placeEl.textContent = [name, region, country].filter(part => part).join(', ');
  updatedEl.textContent = `Updated ${current.time.replace('T', ' ')} (local time)`;

  iconEl.textContent = now.icon;
  iconEl.setAttribute('aria-label', now.label);
  tempEl.textContent = `${Math.round(current.temperature_2m)}°C`;
  condEl.textContent = now.label;

  feelsEl.textContent = `${Math.round(current.apparent_temperature)}°C`;
  humidityEl.textContent = `${current.relative_humidity_2m}%`;
  windEl.textContent = `${current.wind_speed_10m} km/h`;

  forecastEl.replaceChildren(
    ...daily.time.map((day, i) => {
      const { label, icon } = describe(daily.weather_code[i]);
      const card = document.createElement('li');

      const dayName = document.createElement('strong');
      dayName.textContent = i === 0 ? 'Today' : day;

      const iconSpan = document.createElement('div');
      iconSpan.classList.add('day-icon');
      iconSpan.textContent = icon;

      const text = document.createElement('div');
      text.textContent = `${label} · ${Math.round(daily.temperature_2m_max[i])}° / ${Math.round(daily.temperature_2m_min[i])}°`;

      card.append(dayName, iconSpan, text);
      return card;
    })
  );

  weatherEl.hidden = false;
}
