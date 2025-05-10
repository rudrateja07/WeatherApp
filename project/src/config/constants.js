// API URLs
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:2033/api';
export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '68d11e73b3fc863568c7bb7f3e307a49';
export const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

// Units
export const DEFAULT_UNITS = 'metric'; // metric (Celsius) or imperial (Fahrenheit)

// Map Configuration
export const DEFAULT_MAP_CENTER = {
  latitude: 40.7128,
  longitude: -74.0060,
  zoom: 9
};

// Weather Icons Mapping
export const WEATHER_ICONS = {
  '01d': 'clear-day',
  '01n': 'clear-night',
  '02d': 'partly-cloudy-day',
  '02n': 'partly-cloudy-night',
  '03d': 'cloudy',
  '03n': 'cloudy',
  '04d': 'cloudy',
  '04n': 'cloudy',
  '09d': 'rain',
  '09n': 'rain',
  '10d': 'rain',
  '10n': 'rain',
  '11d': 'thunderstorm',
  '11n': 'thunderstorm',
  '13d': 'snow',
  '13n': 'snow',
  '50d': 'fog',
  '50n': 'fog'
};