import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cloud, 
  CloudSun, 
  CloudRain, 
  CloudSnow,
  CloudLightning, 
  CloudFog,
  ChevronDown,
  ChevronUp,
  Droplets, 
  Wind
} from 'lucide-react';
import { formatDate, formatTemperature, groupForecastByDay } from '../../utils/weatherUtils';

function WeatherForecast({ forecastData, unit = 'metric' }) {
  const [expandedDay, setExpandedDay] = useState(null);
  
  if (!forecastData || !Array.isArray(forecastData) || forecastData.length === 0) {
    return null;
  }
  
  const groupedForecast = groupForecastByDay(forecastData);
  
  const getWeatherIcon = (iconCode) => {
    if (!iconCode) return <Cloud size={24} />;
    
    if (iconCode.includes('01') || iconCode.includes('02')) {
      return <CloudSun size={24} className="text-accent-500" />;
    } else if (iconCode.includes('03') || iconCode.includes('04')) {
      return <Cloud size={24} className="text-primary-500" />;
    } else if (iconCode.includes('09') || iconCode.includes('10')) {
      return <CloudRain size={24} className="text-primary-600" />;
    } else if (iconCode.includes('11')) {
      return <CloudLightning size={24} className="text-warning-500" />;
    } else if (iconCode.includes('13')) {
      return <CloudSnow size={24} className="text-primary-200" />;
    } else if (iconCode.includes('50')) {
      return <CloudFog size={24} className="text-neutral-500" />;
    } else {
      return <Cloud size={24} className="text-primary-500" />;
    }
  };
  
  const toggleExpand = (day) => {
    if (expandedDay === day) {
      setExpandedDay(null);
    } else {
      setExpandedDay(day);
    }
  };
  
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="card"
    >
      <div className="p-4 bg-primary-500 text-white">
        <h2 className="text-xl font-semibold">5-Day Forecast</h2>
      </div>
      
      <div className="divide-y divide-neutral-100">
        {Object.entries(groupedForecast).map(([day, forecasts], index) => {
          // Get middle of day forecast for the day summary
          const midDayForecast = forecasts[Math.floor(forecasts.length / 2)];
          const isExpanded = expandedDay === day;
          
          // Calculate min and max temperatures for the day
          const temperatures = forecasts.map(f => f.main.temp);
          const minTemp = Math.min(...temperatures);
          const maxTemp = Math.max(...temperatures);
          
          return (
            <div key={day} className="forecast-day">
              <div 
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-neutral-50 transition-colors"
                onClick={() => toggleExpand(day)}
              >
                <div className="flex items-center gap-3">
                  {getWeatherIcon(midDayForecast.weather[0]?.icon)}
                  <div>
                    <h3 className="font-medium">{day}</h3>
                    <p className="text-sm text-neutral-500 capitalize">
                      {midDayForecast.weather[0]?.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="font-semibold">
                      {formatTemperature(maxTemp, unit)}
                    </span>
                    <span className="text-neutral-500 ml-2">
                      {formatTemperature(minTemp, unit)}
                    </span>
                  </div>
                  
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-4"
                >
                  <div className="bg-neutral-50 rounded-lg p-2 overflow-x-auto">
                    <div className="flex gap-2 min-w-max">
                      {forecasts.map((forecast, i) => (
                        <div 
                          key={i} 
                          className="flex flex-col items-center bg-white p-3 rounded-lg min-w-[80px]"
                        >
                          <span className="text-sm text-neutral-500">
                            {new Date(forecast.dt * 1000).getHours()}:00
                          </span>
                          <div className="my-2">
                            {getWeatherIcon(forecast.weather[0]?.icon)}
                          </div>
                          <span className="font-medium">
                            {formatTemperature(forecast.main.temp, unit)}
                          </span>
                          <div className="mt-2 flex gap-2 text-neutral-500">
                            <div className="flex items-center" title="Humidity">
                              <Droplets size={14} />
                              <span className="text-xs ml-1">{forecast.main.humidity}%</span>
                            </div>
                            <div className="flex items-center" title="Wind Speed">
                              <Wind size={14} />
                              <span className="text-xs ml-1">
                                {unit === 'metric' ? forecast.wind.speed.toFixed(1) : Math.round(forecast.wind.speed)}
                                {unit === 'metric' ? 'm/s' : 'mph'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default WeatherForecast;