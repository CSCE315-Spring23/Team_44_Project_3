import React, {useEffect, useState} from 'react';

const Weather = () => {
    const [temperature, setTemperature] = useState(null);
    const [weather, setWeather] = useState(null);
    const [description, setDescription] = useState(null);
    const [icon, setIcon] = useState(null);

    function toFahrenheit(temp) {
        const fahrenheit = 1.8 * temp + 32
        console.log(`Converted ${temp} to ${fahrenheit}\u2109.`);
        return fahrenheit;
    }

    useEffect(() => {
        fetch('http://localhost:3001/api/weather')
            .then(res => res.json())
            .then(data => {
                setTemperature(toFahrenheit(data.main.temp));
                setWeather(data.weather[0].main);
                setDescription(data.weather[0].description);
                setIcon(data.weather[0].icon)
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