import { motion } from 'framer-motion';
import { 
  Cloud, 
  Droplets, 
  Wind, 
  Sunrise, 
  Sunset, 
  Eye, 
  Thermometer,
  CloudRain,
  CloudSnow,
  CloudSun,
  CloudMoon,
  CloudFog,
  CloudLightning
} from 'lucide-react';
import { formatTemperature, formatTime, formatWind, getWeatherBackground } from '../../utils/weatherUtils';

function CurrentWeather({ data, unit = 'metric' }) {
  if (!data) return null;
  
  const { weather, main, wind, sys, visibility, name, dt } = data;
  const condition = weather[0]?.main;
  const description = weather[0]?.description;
  const isDay = dt > sys.sunrise && dt < sys.sunset;
  
  const getWeatherIcon = (condition) => {
    if (!condition) return <Cloud size={64} className="text-primary-500" />;
    
    const conditions = condition.toLowerCase();
    if (conditions.includes('clear')) {
      return isDay 
        ? <CloudSun size={64} className="text-accent-500" /> 
        : <CloudMoon size={64} className="text-primary-800" />;
    } else if (conditions.includes('cloud') || conditions.includes('overcast')) {
      return <Cloud size={64} className="text-primary-500" />;
    } else if (conditions.includes('rain') || conditions.includes('drizzle')) {
      return <CloudRain size={64} className="text-primary-600" />;
    } else if (conditions.includes('snow')) {
      return <CloudSnow size={64} className="text-primary-200" />;
    } else if (conditions.includes('mist') || conditions.includes('fog')) {
      return <CloudFog size={64} className="text-neutral-500" />;
    } else if (conditions.includes('thunder')) {
      return <CloudLightning size={64} className="text-warning-500" />;
    } else {
      return <Cloud size={64} className="text-primary-500" />;
    }
  };

  const bgClass = getWeatherBackground(condition, isDay);
  
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`card-glass overflow-hidden ${isDay ? 'border-white/20' : 'border-neutral-800/20'}`}
    >
      <div className={`p-6 ${bgClass}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className={`text-2xl font-bold ${isDay ? 'text-neutral-800' : 'text-white'}`}>{name}</h2>
              <span className={`text-sm px-2 py-0.5 rounded-full ${isDay ? 'bg-white/30' : 'bg-neutral-800/30'}`}>
                {sys.country}
              </span>
            </div>
            <p className={`mt-1 capitalize ${isDay ? 'text-neutral-700' : 'text-neutral-200'}`}>
              {description}
            </p>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            {getWeatherIcon(condition)}
            <span className={`text-5xl font-bold ml-2 ${isDay ? 'text-neutral-800' : 'text-white'}`}>
              {formatTemperature(main.temp, unit)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center p-3 bg-neutral-50 rounded-lg">
            <Thermometer size={24} className="text-primary-500 mb-2" />
            <span className="text-neutral-500 text-sm">Feels Like</span>
            <span className="font-semibold">{formatTemperature(main.feels_like, unit)}</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-neutral-50 rounded-lg">
            <Droplets size={24} className="text-primary-500 mb-2" />
            <span className="text-neutral-500 text-sm">Humidity</span>
            <span className="font-semibold">{main.humidity}%</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-neutral-50 rounded-lg">
            <Wind size={24} className="text-primary-500 mb-2" />
            <span className="text-neutral-500 text-sm">Wind</span>
            <span className="font-semibold">{formatWind(wind.speed, wind.deg, unit)}</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-neutral-50 rounded-lg">
            <Eye size={24} className="text-primary-500 mb-2" />
            <span className="text-neutral-500 text-sm">Visibility</span>
            <span className="font-semibold">{(visibility / 1000).toFixed(1)} km</span>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 bg-gradient-day text-white rounded-lg">
            <div className="flex items-center">
              <Sunrise size={20} className="mr-2" />
              <span>Sunrise</span>
            </div>
            <span className="font-semibold">{formatTime(sys.sunrise, data.timezone)}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gradient-night text-white rounded-lg">
            <div className="flex items-center">
              <Sunset size={20} className="mr-2" />
              <span>Sunset</span>
            </div>
            <span className="font-semibold">{formatTime(sys.sunset, data.timezone)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CurrentWeather;