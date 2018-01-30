// @flow
import CurrentWeather from './CurrentWeather';
import WeatherForecast from './WeatherForecast';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = '63c9cf8b64132ca4a08dac858073b116';

function getCurrentWeatherEndpoint(city: *){
    const { en, latitude, longitude } = city;
    if (latitude && longitude){
        return `${BASE_URL}weather`
            + `?lat=${latitude}&lon=${longitude}`
            + `&appid=${API_KEY}&lang=ja`;
    }
    return `${BASE_URL}weather?q=${en}&appid=${API_KEY}&lang=ja`;
}

function getWeatherForecastEndpoint(city: *){
    const { en, latitude, longitude } = city;
    if (latitude && longitude){
        return `${BASE_URL}forecast`
            + `?lat=${latitude}&lon=${longitude}`
            + `&appid=${API_KEY}&lang=ja`;
    }
    return `${BASE_URL}forecast?q=${en}&appid=${API_KEY}&lang=ja`;
}

function getCurrentWeather(city: *): Promise<CurrentWeahter>{
    const endpoint = getCurrentWeatherEndpoint(city);
    console.log(endpoint);
    return fetch(endpoint)
        .then(response => response.json())
        .then(json => new CurrentWeather(json));
}

function getWeatherForecast(city: *): Promise<WeatherForecast[]>{
    const endpoint = getWeatherForecastEndpoint(city);
    console.log(endpoint);
    return fetch(endpoint)
        .then(response => response.json())
        .then(json => json.list.map(item => new WeatherForecast(item)));
}

export { getCurrentWeather, getWeatherForecast };
