import axios from 'axios';
const forecastEndpoint = params => `http://api.weatherapi.com/v1/forecast.json?key=03eb1511c4d14baa96375400250208&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`
const locationsEndpoint = params => `http://api.weatherapi.com/v1/search.json?key=03eb1511c4d14baa96375400250208&q=${params.cityName}`
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