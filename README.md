# Weather Dashboard (Assignment 4)

Type any city in the world and see live conditions: temperature, conditions with an icon,
feels-like, humidity, wind, and a 3-day outlook. The page opens on Bratislava.

## Run it

ES modules are blocked on `file://`, so double-clicking `index.html` will not work.

1. Open the folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` → **Open with Live Server**.

## API and API key

Data comes from **Open-Meteo** (the API used in Session 11):

- Geocoding: `https://geocoding-api.open-meteo.com/v1/search` (city name → latitude, longitude, country)
- Forecast: `https://api.open-meteo.com/v1/forecast`

**No API key is needed** — Open-Meteo is free with no sign-up, so there is no secret in this
repository. `.gitignore` still excludes `.env` so that a key can never be committed if the project
is switched to a keyed API (e.g. OpenWeatherMap). In that case: create a `.env` file containing
`WEATHER_API_KEY=your_key_here`, never paste the key into the JavaScript, and keep `.env` out of Git.

## File structure

```
index.html        page structure
style.css         layout, responsive rules, status colours
js/main.js        wires listeners, runs searches
js/weather.js     geocode city → fetch forecast (async/await)
js/api.js         getJSON: fetch + response.ok check
js/render.js      the only file that touches the DOM; loading/error/success states
js/conditions.js  weather code → description + icon
```

## Error handling

- Empty input is rejected with a message.
- City not found → clear message.
- Non-200 responses → thrown in `getJSON` and shown to the user.
- Offline / network failure → friendly message with a **Retry** button.
- All fetches run inside `try / catch` — no unhandled console errors.

Test: DevTools → Network → **Offline**, then search. The page explains itself.

## Screenshot

`screenshot.png` — the dashboard showing live weather for Bratislava.
