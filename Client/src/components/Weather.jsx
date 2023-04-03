import React, {useEffect, useState} from 'react';

const Weather = () => {
    const [temperature, setTemperature] = useState(null);
    const [weather, setWeather] = useState(null);
    const [description, setDescription] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/api/weather')
            .then(res => res.json())
            .then(data => {
                setTemperature((data.main.temp-273.15)*9/5+32);
                setWeather(data.weather[0].main);
                setDescription(data.weather[0].description);
            });
    }, []);

    return (
        <div>
            {temperature && <h1>{temperature.toFixed(0)}</h1>}
            {weather && <h1>{weather}</h1>}
            {description && <h1>{description}</h1>}
        </div>
    );
}

export default Weather;