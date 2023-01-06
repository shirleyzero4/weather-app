import React, {useState} from "react"
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=a86ac6f164e80a61d42fa9ea208dbe2b`

  const searchLocation = (event) => {
    if(event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="main">
      <div className="weather">
        <div className="search">
          <input value={location} onChange={event => setLocation(event.target.value)} onKeyUp={searchLocation} placeholder="Enter Location" type="text" />
        </div>
        <div className="time">
        </div>
        <div className="location">
          <h1>{data.name}</h1>
        </div>
        <div className="main-weather">
          <div className="weather-image">
            {data.weather ? <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} /> : null}
          </div>
          <div className="temp">
            {data.main ? <h2>{data.main.temp.toFixed()}°F</h2> : null} 
          </div>
        </div>
        <div className="clouds">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>

        {data.name != undefined &&
          <div className="fhw">
          <div className="feel">
            <p className="bold">Feels Like</p>
            {data.main ? <p className="content">{data.main.feels_like.toFixed()}°F</p> : null}
          </div>
          <div className="humidity">
            <p className="bold">Humidity</p>
            {data.main ? <p className="content">{data.main.humidity}%</p> : null}
          </div>
          <div className="wind">
            <p className="bold">Wind</p>
            {data.wind ? <p className="content">{data.wind.speed.toFixed()} mph</p> : null}
          </div>
        </div>
        }
      </div>
    </div>
  );
}

export default App;
