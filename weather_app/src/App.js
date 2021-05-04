import './App.css';
import React, { useState } from 'react';

const api = {
  key: "4ecc9a5f335687c3559a19c6288e732d",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = eve => {
    if (eve.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('');
          console.log(result);
        });
    }
  }

  // current date getter
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ?
      ((weather.weather[0].main === "Rain") ?
        'App rainy'
        : (weather.weather[0].main === "Snow") ?
          'App snowy'
          : (weather.main.temp > 20) ?
            'App hot'
            : (weather.main.temp < 0) ?
              'App cold'
              : (weather.weather[0].main === "Clouds") ?
                'App clouds'
                : 'App clear')
      : 'App'}>
      <main>
        <div className="searchBox">
          <input type="text"
            className="searchBar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="infoBox">
              <div className="city">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weatherBox">
              <div className="temperature">{weather.main.temp}°C </div>
              <div className="weatherType">{weather.weather[0].main}</div>
              <div className="wind">Wind: {weather.wind.speed} m/s</div>
              <div className="pressure">Pressure: {weather.main.pressure}hPa</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
