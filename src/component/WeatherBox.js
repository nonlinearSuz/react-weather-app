import React from 'react';

const WeatherBox = ({weather}) => {
    
    
    
    if (!weather || !weather.main || !weather.weather) {
        return <div>Loading...</div>; // 데이터가 없는 경우 로딩 상태 표시
    }


    // 온도 계산
    const temperatureCelsius = weather?.main.temp;
    const temperatureFahrenheit = temperatureCelsius * 1.8 + 32;    
    
    return (
        <div className="weather-box">
        <div>{weather?.name}</div>
        <h2>{temperatureCelsius.toFixed(1)}°C / {temperatureFahrenheit.toFixed(1)}°F </h2>
        <h3>{weather?.weather[0]?.description}</h3>
        </div>
    );
}

// function WeatherBox({ weather }) {
//     return (
//       <div>
//         <h1>WeatherBox Component</h1>
//         <p>{weather ? `Weather: ${weather.name}` : 'No weather data'}</p>
//       </div>
//     );
//   }
  

export default WeatherBox
