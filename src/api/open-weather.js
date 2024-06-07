import axios from 'axios';

export default async function getWeatherByCoordinates() {
  const url ='https://api.openweathermap.org/data/2.5/weather?lang=kr&units=metric';
  try {
    // getCurrentPosition() 함수는 콜백 기반이기 때문에 반환값을 직접 반환하지 못함
    // Promise를 사용하여 비동기 작업을 처리해야 함
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const { latitude: lat, longitude: lon } = position.coords;
    const res = await axios.get(
      `${url}&lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
    );

    return {
      description: res.data.weather[0].description,
      temp: res.data.main.temp.toFixed(1),
      icon: `http://openweathermap.org/img/wn/${res.data.weather[0].icon}.png`,
    };
  } catch (err) {
    console.error(err); 
    return null;
  }
};
