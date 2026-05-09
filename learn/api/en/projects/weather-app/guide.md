# Weather Dashboard

Build a weather application that allows users to search for a city and see the current weather conditions. You'll learn about `fetch`, APIs, and working with JSON data.

## Goal

- A search bar to enter city names
- Display the current temperature, humidity, and weather description
- Show a weather icon (sunny, cloudy, rainy, etc.)
- Handle errors (e.g., city not found)

## Steps

- [ ] Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api).
- [ ] Build the HTML layout with a search input, button, and a container for results.
- [ ] Style the app to make it look modern.
- [ ] In `script.js`, add an event listener to the search button.
- [ ] Use `fetch()` to call the OpenWeatherMap API with the city name.
- [ ] Parse the JSON response and extract the data you need.
- [ ] Update the DOM with the weather information.
- [ ] Add error handling if the API call fails or the city is invalid.

## Hints

- Use `async/await` for your fetch call.
- Remember to use your API key in the URL: `https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric`.
- You can get icons from `http://openweathermap.org/img/wn/{icon_code}@2x.png`.
