import {useCallback, useEffect, useState} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

/*
  1. 앱이 실행되자마자 현재위치 기반의 날씨가 보인다.
  2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨 상태가 보인다.
  3. 5개의 버튼이 있다.(1개는 현재 위치, 4개는 다른 도시)
  4. 도시 버튼을 클릭할 때마다 도시별 날씨가 나온다. 
  5. 현재 위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 나온다.
  6. 데이터를 들고 오는 동안 로딩 스피너가 돈다.

*/
function App() {
  const [weather,setWeather] = useState(null);
  const [city,setCity] = useState('');
  const [loading,setLoading] =useState(false); 
  const cities =['Rome','Hanoi','Praha','Seoul']
  
  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  }, []); // 빈 배열을 넣어, 컴포넌트가 처음 마운트될 때 한 번만 생성

  const getWeatherByCurrentLocation=async(lat,lon)=>{
    const url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e7bca847bf4faef9b20270e3cb573aba&units=metric`;
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log("data",data);
      setWeather(data);
    } catch (err) {
      console.error("Error fetching weather data: ",err);
    } finally {
      setLoading(false);
    }       
  };

  const getWeatherByCity = async (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e7bca847bf4faef9b20270e3cb573aba&units=metric`;
    setLoading(true);
    try {
      let response = await fetch(url);
      let data = await response.json();
      //console.log("data",data);
      setWeather(data);  
    } catch (err) {
      console.error("Error fetching weather data: ",err); 
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if(city === ""){
      getCurrentLocation();
    } else{
      getWeatherByCity(city); // city 인자를 전달
    }
  },[city, getCurrentLocation]); // getCurrentLocation 의존성 추가


  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader
              color="#f8c6b"
              loading={loading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
          /> 
        </div> )
      :( <div className="container">
        <WeatherBox weather={weather}/>
        <WeatherButton cities={cities} setCity={setCity}/>
        </div> )
      }
     
    </div>
  );
}

export default App;
