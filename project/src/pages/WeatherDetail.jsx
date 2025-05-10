import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWeatherStore } from '../store/weatherStore';
import { Heart, ChevronLeft, Share2, Download, Thermometer, Droplets, Wind, Compass, Gauge, Clock, Sun, CloudRain } from 'lucide-react';
import Loader from '../components/ui/Loader';
import CurrentWeather from '../components/weather/CurrentWeather';
import WeatherForecast from '../components/weather/WeatherForecast';
import { formatDate, formatTime, formatTemperature, formatWind } from '../utils/weatherUtils';

function WeatherDetail() {
  const { location } = useParams();
  const { 
    currentWeather, 
    forecast, 
    isLoading, 
    fetchCurrentWeather, 
    fetchForecast,
    saveFavoriteLocation
  } = useWeatherStore();
  const [loadingError, setLoadingError] = useState(null);
  
  useEffect(() => {
    if (location) {
      const fetchData = async () => {
        try {
          setLoadingError(null);
          await Promise.all([
            fetchCurrentWeather(location),
            fetchForecast(location)
          ]);
        } catch (error) {
          console.error('Failed to load weather data:', error);
          setLoadingError('Failed to load weather data for this location');
        }
      };
      
      fetchData();
    }
  }, [location, fetchCurrentWeather, fetchForecast]);
  
  const handleSaveLocation = () => {
    if (!currentWeather) return;
    
    const locationData = {
      name: currentWeather.name,
      lat: currentWeather.coord.lat,
      lon: currentWeather.coord.lon
    };
    
    saveFavoriteLocation(locationData);
  };
  
  const renderDetailSection = () => {
    if (!currentWeather) return null;
    
    const { main, wind, sys, visibility, dt } = currentWeather;
    
    return (
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="p-4 bg-primary-500 text-white">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Thermometer size={20} />
              <span>Detailed Conditions</span>
            </h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <div className="p-3 bg-neutral-50 rounded-lg">
              <p className="text-neutral-500 text-sm">Feels Like</p>
              <p className="text-lg font-semibold">{formatTemperature(main.feels_like)}</p>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg">
              <p className="text-neutral-500 text-sm">Humidity</p>
              <p className="text-lg font-semibold">{main.humidity}%</p>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg">
              <p className="text-neutral-500 text-sm">Pressure</p>
              <p className="text-lg font-semibold">{main.pressure} hPa</p>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg">
              <p className="text-neutral-500 text-sm">Visibility</p>
              <p className="text-lg font-semibold">{visibility / 1000} km</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="p-4 bg-primary-500 text-white">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Wind size={20} />
              <span>Wind & Sun</span>
            </h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <div className="p-3 bg-neutral-50 rounded-lg">
              <p className="text-neutral-500 text-sm">Wind Speed</p>
              <p className="text-lg font-semibold">{formatWind(wind.speed, wind.deg)}</p>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg">
              <p className="text-neutral-500 text-sm">Wind Gust</p>
              <p className="text-lg font-semibold">{wind.gust ? `${wind.gust} m/s` : 'N/A'}</p>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg">
              <p className="text-neutral-500 text-sm">Sunrise</p>
              <p className="text-lg font-semibold">{formatTime(sys.sunrise)}</p>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg">
              <p className="text-neutral-500 text-sm">Sunset</p>
              <p className="text-lg font-semibold">{formatTime(sys.sunset)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-12 flex justify-center">
        <Loader />
      </div>
    );
  }
  
  if (loadingError) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="card p-8 text-center">
          <CloudRain size={48} className="text-neutral-400 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-neutral-800">Weather Data Not Available</h2>
          <p className="text-neutral-600 mt-2 mb-6">{loadingError}</p>
          <Link to="/dashboard" className="btn btn-primary">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center justify-between"
      >
        <div className="flex items-center">
          <Link 
            to="/dashboard" 
            className="mr-3 p-2 rounded-full hover:bg-neutral-100 transition-colors"
          >
            <ChevronLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{location}</h1>
            <p className="text-neutral-600 mt-1">
              Detailed weather information
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
            title="Share"
          >
            <Share2 size={20} />
          </button>
          <button 
            className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
            title="Download report"
          >
            <Download size={20} />
          </button>
          <button 
            onClick={handleSaveLocation}
            className="p-2 rounded-full bg-primary-50 text-primary-500 hover:bg-primary-100 transition-colors"
            title="Save to favorites"
          >
            <Heart size={20} />
          </button>
        </div>
      </motion.div>
      
      {currentWeather && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CurrentWeather data={currentWeather} />
          
          {renderDetailSection()}
          
          {forecast && forecast.length > 0 && (
            <div className="mt-8">
              <WeatherForecast forecastData={forecast} />
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default WeatherDetail;