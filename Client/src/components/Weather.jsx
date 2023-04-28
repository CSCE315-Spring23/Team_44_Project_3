import React, {useEffect, useState} from "react";

/**
 * A component that displays the current weather and temperature
 * @function
 * @returns {JSX.Element} - The rendered weather component
 */
function Weather() {
    const [temperature, setTemperature] = useState(null);
    const [weather, setWeather] = useState(null);
    const [description, setDescription] = useState(null);
    const [icon, setIcon] = useState(null);

    const isLocal = window.location.hostname === "localhost";
    const HOST = isLocal ? "http://localhost:3001" : "https://chick-fil-a-m0ss.onrender.com";

    /**
     * Convert temperature from Celsius to Fahrenheit
     * @function
     * @param {number} temp - The temperature in Celsius
     * @returns {number} - The temperature in Fahrenheit
     */
    function toFahrenheit(temp) {
        const fahrenheit = 1.8 * temp + 32;
        console.log(`Converted ${ temp } to ${ fahrenheit }\u2109.`);
        return fahrenheit;
    }

    useEffect(() => {
        /**
         * Fetch weather data from API and set component state
         * @function
         * @returns {void}
         */
        fetch(`${ HOST }/api/weather`)
            .then(res => res.json())
            .then(data => {
                setTemperature(toFahrenheit(data.main.temp));
                setWeather(data.weather[0].main);
                setDescription(data.weather[0].description);
                setIcon(data.weather[0].icon);
            });
    }, []);

    return (
        <div className="weather">
            <img src={"https://openweathermap.org/img/wn/" + icon + "@2x.png"} />
            {temperature && <p>{temperature.toFixed(2)} ℉</p>}
            {/* {weather && <p>{weather}</p>} */}
            {/* {description && <p>{description}</p>} */}
        </div>
    );
}

export default Weather;
