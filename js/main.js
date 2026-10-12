import { loadWeather } from './weather.js';
import { renderWeather, setStatus } from './render.js';

const form = document.querySelector('#search-form');
const input = document.querySelector('#city-input');
const retryBtn = document.querySelector('#retry-btn');

let lastCity = 'Bratislava';

// Turn any error into plain words for the user
function friendly(err) {
  if (err.message === 'not-found') {
    return `No city called "${lastCity}" was found. Check the spelling.`;
  }
  if (err.message.startsWith('HTTP')) {
    return `The weather service answered with an error (${err.message}). Try again shortly.`;
  }
  return "Couldn't reach the weather service. Check your connection and retry.";
}

async function search(city) {
  lastCity = city;
  setStatus('loading', `Loading ${city}…`);
  try {
    const data = await loadWeather(city);
    renderWeather(data);
    setStatus('success', `Showing live weather for ${data.name}.`);
  } catch (err) {
    console.warn('Weather request failed', err);
    setStatus('error', friendly(err));
  }
}

function handleSubmit(e) {
  e.preventDefault(); // a form submit would reload the page
  const city = input.value.trim();
  if (!city) {
    setStatus('idle', 'Type a city name first.');
    input.focus();
    return;
  }
  search(city);
}

form.addEventListener('submit', handleSubmit);
retryBtn.addEventListener('click', () => search(lastCity));

// Open with live weather from Bratislava
search(lastCity);
