import axios from 'axios';
const API_KEY = 'your_weather_api_key_here'
const forecastEndpoint = params => `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`
const locationsEndpoint = params => `http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${params.cityName}`
const apiCall = async (endpoint) => {
    const options = {
        method: 'GET',
        url: endpoint
    }
    try {
        const response = await axios.request(options)
        return response.data
    } catch (err) {
        console.log('error: ' + err)
        return null
    }
}
export const fetchWeatherForecast = params => {
    return apiCall(forecastEndpoint(params))
}
export const fetchLocation = params => {
    return apiCall(locationsEndpoint(params))
}