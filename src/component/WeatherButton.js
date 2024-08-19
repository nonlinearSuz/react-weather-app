import React, { useState } from 'react';
import { Button } from 'react-bootstrap';


//WeatherButton.js (약간의 단방향성 : 부 -> 자)
// 내리사랑만 가능. 부모가 모든 정보를 가지고 props로 뿌려주는 형식으로 가야함.
// 따라서 날씨정보 변경 데이터는 최초 뿌리인 App.js에 가지고 있어야함.
function WeatherButton({cities,setCity}) {
    
   console.log("cities?",cities);
   const [activeButton, setActiveButton] = useState('');

   // 이벤트 핸들러 
   const handleButtonClick = (city)=>{
    setCity(city);          // 도시 설정
    setActiveButton(city); // 클릭된 도시 색상 변경으로 활성화 표시
   };
    
    return (
        <div className="button-group">
            <Button variant={activeButton ===''? 'danger':'warning'} 
                    onClick={() => handleButtonClick('')}>Current Location</Button>
            {cities.map((item, index) => (
            <Button 
                key={index} 
                variant={activeButton === item ? 'danger':'warning'} 
                onClick={() => handleButtonClick(item)}
            >
                {item}
            </Button>
            ))}
      </div>
    );
  };

export default WeatherButton
