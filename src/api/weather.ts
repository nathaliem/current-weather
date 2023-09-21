import axios from 'axios';

interface WeatherCodes {
    [key: number]: string;
}

export const getMatchingLocations = (searchTerm: string) => axios({
    method: 'GET',
    url: `https://geocoding-api.open-meteo.com/v1/search?name=${searchTerm}&count=10&language=en&format=json`
}).then((response) => response.data.results);

export const getForecast = (latitude: number, longitude: number) => axios({
    method: 'GET',
    url: `https://api.open-meteo.com/v1/forecast?longitude=${longitude}&latitude=${latitude}&hourly=temperature_2m,precipitation,rain,showers&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Europe%2FBerlin`,
}).then((response) => response.data);

export const getWeatherInterpretation = (weathercode: number) => {
    const weathercodes: WeatherCodes = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Fog',
        51: 'Drizzle',
        53: 'Drizzle',
        55: 'Heavy drizzle',
        56: 'Freezing drizzle',
        57: 'Freezing drizzle',
        61: 'Rain',
        63: 'Rain',
        65: 'Heavy rain',
        66: 'Freezing rain',
        67: 'Heavy freezing rain',
        71: 'Snow fall',
        73: 'Moderate snow fall',
        75: 'Heavy snow fall',
        77: 'Snow grains',
        80: 'Rain showers',
        81: 'Moderate rain showers',
        82: 'Heavy rain showers',
        85: 'Light snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorms',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail',
    };

    return weathercodes[weathercode];
};
