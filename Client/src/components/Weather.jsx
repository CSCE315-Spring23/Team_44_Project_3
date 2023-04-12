import React, {useEffect, useState} from 'react';

const Weather = () => {
    const [temperature, setTemperature] = useState(null);
    const [weather, setWeather] = useState(null);
    const [description, setDescription] = useState(null);

    function toFahrenheit(temp) {
        const fahrenheit = 1.8 * toCelcius(temp) + 32
        console.log(`Converted ${temp} to ${fahrenheit}\u2109.`);
        return fahrenheit;
    }

    function toCelcius(temp) {
        const celcius = temp - 273.15;
        console.log(`Converted ${temp} to ${celcius}\u2103.`);
        return celcius;
    }

    useEffect(() => {
        fetch('http://localhost:3001/api/weather')
            .then(res => res.json())
            .then(data => {
                setTemperature(toFahrenheit(data.main.temp));
                setWeather(data.weather[0].main);
                setDescription(data.weather[0].description);
            });
    }, []);

    return (
        <div className="weather">
            {temperature && <h1>{temperature.toFixed(0)}℉</h1>}
            {weather && <h1>{weather}</h1>}
            {description && <h1>{description}</h1>}
        </div>
    );
}

export default Weather;