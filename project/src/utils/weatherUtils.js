import { WEATHER_ICONS } from '../config/constants';

/**
 * Converts temperature based on the unit
 * @param {number} temp - Temperature value
 * @param {string} unit - 'metric' (Celsius) or 'imperial' (Fahrenheit)
 * @returns {string} - Formatted temperature string with unit
 */
export const formatTemperature = (temp, unit = 'metric') => {
  if (temp === undefined || temp === null) return 'N/A';
  
  const roundedTemp = Math.round(temp);
  const unitSymbol = unit === 'metric' ? '°C' : '°F';
  
  return `${roundedTemp}${unitSymbol}`;
};

/**
 * Get appropriate icon based on weather condition code
 * @param {string} iconCode - Weather icon code from API
 * @returns {string} - Icon name for lucide-react icons
 */
export const getWeatherIcon = (iconCode) => {
  return WEATHER_ICONS[iconCode] || 'cloud';
};

/**
 * Convert timestamp to readable time
 * @param {number} timestamp - UNIX timestamp
 * @param {number} timezoneOffset - Timezone offset in seconds
 * @returns {string} - Formatted time string
 */
export const formatTime = (timestamp, timezoneOffset = 0) => {
  if (!timestamp) return 'N/A';
  
  const date = new Date((timestamp + timezoneOffset) * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Format date for display
 * @param {number} timestamp - UNIX timestamp
 * @returns {string} - Formatted date string
 */
export const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString(undefined, { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
};

/**
 * Get appropriate background gradient based on weather and time
 * @param {string} condition - Weather condition
 * @param {boolean} isDay - Whether it's daytime
 * @returns {string} - CSS class for background gradient
 */
export const getWeatherBackground = (condition, isDay) => {
  if (!condition) return 'bg-gradient-day';
  
  const conditions = condition.toLowerCase();
  
  if (conditions.includes('clear') || conditions.includes('sun')) {
    return isDay ? 'bg-gradient-day' : 'bg-gradient-night';
  } else if (conditions.includes('cloud')) {
    return 'bg-neutral-200';
  } else if (conditions.includes('rain') || conditions.includes('drizzle')) {
    return 'bg-gradient-rain';
  } else if (conditions.includes('snow')) {
    return 'bg-neutral-100';
  } else if (conditions.includes('thunder')) {
    return 'bg-neutral-700';
  } else {
    return isDay ? 'bg-gradient-day' : 'bg-gradient-night';
  }
};

/**
 * Group forecast by day
 * @param {Array} forecastList - List of forecast items
 * @returns {Object} - Grouped forecast by day
 */
export const groupForecastByDay = (forecastList) => {
  if (!forecastList || !Array.isArray(forecastList)) return {};
  
  return forecastList.reduce((grouped, item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString(undefined, { weekday: 'short' });
    
    if (!grouped[day]) {
      grouped[day] = [];
    }
    
    grouped[day].push(item);
    return grouped;
  }, {});
};

/**
 * Format wind information
 * @param {number} speed - Wind speed
 * @param {number} deg - Wind direction in degrees
 * @param {string} unit - 'metric' (m/s) or 'imperial' (mph)
 * @returns {string} - Formatted wind string
 */
export const formatWind = (speed, deg, unit = 'metric') => {
  if (speed === undefined || deg === undefined) return 'N/A';
  
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
  const index = Math.round(deg / 45);
  const direction = directions[index];
  
  const speedUnit = unit === 'metric' ? 'm/s' : 'mph';
  
  return `${Math.round(speed)} ${speedUnit} ${direction}`;
};