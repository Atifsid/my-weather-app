import { useState } from "react";

export default function Weather() {
    const [city, setCity] = useState('');
    const [weatherData, setWetherData] = useState(null);
    const [isVisible, setVisible] = useState(true);
    const [error, setError] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        fetchWeatherByCityName()
    }

    function fetchWeatherByCityName() {
        const apiUrl = `${process.env.REACT_APP_WEATHER_API_KEY}`;
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiUrl}&units=metric`)
            .then((response) => response.json())
            .then((data) => {
                if (data.cod == 200) {
                    setWetherData(data)
                    setVisible(false)
                } else {
                    setError(data.message)
                }
            })
            .catch((error) => setError(error));
    }

    return (
        <div>
            {isVisible && <div className="w-full max-w-xs text-center">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="font-mono text-lg text-center font-semibold mb-6">Welcome to myWeather App</div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cityField">
                            Enter City
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="cityField" type="text" placeholder="City Name" onChange={e => setCity(e.target.value)} required />
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Submit
                    </button>
                    {
                        error && <div className="err">{error}</div>
                    }
                </form>
            </div>}

            {
                !isVisible && weatherData &&
                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white shadow-md rounded text-center">
                    <img className="w-full" src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`} alt="Sunset in the mountains" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">Weather Conditions for {city}</div>
                        <div className="grid grid-cols-2">
                            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                <span className="font-bold">Min Temp</span>
                                <p>{weatherData.main.temp_min} &deg;C</p>
                            </div>
                            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                <span className="font-bold">Max Temp</span>
                                <p>{weatherData.main.temp_min} &deg;C</p>
                            </div>
                            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                <span className="font-bold">Wind Speed</span>
                                <p>{weatherData.wind.speed} km/h</p>
                            </div>
                            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                <span className="font-bold">Humidity</span>
                                <p>{weatherData.main.humidity} &#37;</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}