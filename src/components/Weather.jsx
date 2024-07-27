import React, { useEffect } from 'react'
import './Weather.css'
import search_icon from '../Assets/search.png';
import clear from '../Assets/clear.png';
import cloud from '../Assets/cloud.png';
import drizzle from '../Assets/drizzle.png';
import rain from '../Assets/rain.png';
import snow from '../Assets/snow.png';
import wind from '../Assets/wind.png';
import humidity from '../Assets/humidity.png';
import { useState } from 'react';
import { useRef } from 'react';




export const Weather = () => {
  
  const inputRef = useRef();

  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "11d": rain,
    "11n": rain,
    "13d": snow,
    "13n": snow,
  };

  const search = async (city)=>{
    if(city === ""){
      alert("Enter city Name")
      return ;
    }
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=1faf63eff083a0981e186c58c3ab98a1`;

      const response = await fetch(url);
      const data =  await response.json();
      
      if(!response.ok){
        alert(data.message);
        return;
      }

      console.log(data); 
      const icon = allIcons[data.weather[0].icon];
      const description = data.weather[0].description;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location : data.name,
        icon: icon,
      })    
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data!!")
    }
  }

  useEffect(()=>{
    search("Srikakulam");
  },[])

  return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={inputRef} type='text' placeholder='Enter City'/>
            <img src={search_icon} alt='' onClick={()=> search(inputRef.current.value)} />
        </div>
        {weatherData?<>
          <img src={weatherData.icon} alt=''></img>
        <p className='temperature'>{weatherData.temperature}°C</p>  {/* alt+0176 */}
        <p className='location'>{weatherData.location}</p>

        <div className='weather-data'>
          <div className='col'>
            <img src={humidity}></img>
            <div>
              <p>{weatherData.humidity}</p>
              <span>humidity</span>
            </div>
          </div>

          <div className='col'>
            <img src={wind}></img>
            <div>
              <p>{weatherData.windSpeed}</p>
              <span>Wind speed</span>
            </div>
          </div>
           
        </div>
        </>:<>
          
        </>}
        
    </div>
  )
}
