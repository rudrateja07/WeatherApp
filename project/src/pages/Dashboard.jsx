import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWeatherStore } from '../store/weatherStore';
import { useAuthStore } from '../store/authStore';
import Loader from '../components/ui/Loader';
import CurrentWeather from '../components/weather/CurrentWeather';
import WeatherForecast from '../components/weather/WeatherForecast';
import LocationSearch from '../components/weather/LocationSearch';
import SavedLocations from '../components/weather/SavedLocations';
import { MapPin, Heart, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

function Dashboard() {
  const [recentSearches, setRecentSearches] = useState([]);
  const {
    currentWeather,
    forecast,
    savedLocations,
    isLoading,
    fetchCurrentWeather,
    fetchForecast,
    fetchSavedLocations,
    getUserLocation,
    saveFavoriteLocation,
    removeSavedLocation
  } = useWeatherStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSavedLocations();

    const lastLocation = localStorage.getItem('lastLocation');
    if (lastLocation) {
      handleSearch(lastLocation);
    } else {
      getUserLocation().catch(() => {
        handleSearch('New York');
      });
    }

    const savedRecentSearches = localStorage.getItem('recentSearches');
    if (savedRecentSearches) {
      try {
        setRecentSearches(JSON.parse(savedRecentSearches));
      } catch (error) {
        console.error('Failed to parse recent searches:', error);
      }
    }
  }, [fetchSavedLocations, getUserLocation]);

  const handleSearch = async (location) => {
    try {
      await Promise.all([fetchCurrentWeather(location), fetchForecast(location)]);
      localStorage.setItem('lastLocation', location);
      return true;
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to fetch weather data');
      throw error;
    }
  };

  const addToRecentSearches = (location) => {
    setRecentSearches(prev => {
      const newSearches = [
        location,
        ...prev.filter(item => item.toLowerCase() !== location.toLowerCase())
      ].slice(0, 5);

      localStorage.setItem('recentSearches', JSON.stringify(newSearches));
      return newSearches;
    });
  };

  const handleSaveLocation = () => {
    if (!currentWeather) return;

    if (!user) {
      toast.error('You must be logged in to save locations');
      return;
    }

    const isAlreadySaved = savedLocations.some(
      (loc) => loc.name.toLowerCase() === currentWeather.name.toLowerCase()
    );

    if (isAlreadySaved) {
      toast.error('This location is already saved');
      return;
    }

    const location = {
      name: currentWeather.name,
      lat: currentWeather.coord.lat,
      lon: currentWeather.coord.lon,
      userId: user.id
    };

    saveFavoriteLocation(location);
  };

  const handleSelectSavedLocation = (location) => {
    handleSearch(location.name);
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-center">Weather Dashboard</h1>
        <p className="text-neutral-600 mt-1 text-center">
          View current weather conditions and forecasts for your locations
        </p>
      </motion.div>

      <div className="flex flex-col items-center w-full">
        {/* Search Bar - Full Width */}
        <div className="w-full">
          <LocationSearch
            onSearch={handleSearch}
            recentSearches={recentSearches}
            addToRecent={addToRecentSearches}
          />
        </div>

        {/* Loader */}
        {isLoading ? (
          <div className="mt-6 h-96 card flex items-center justify-center w-full max-w-3xl">
            <Loader />
          </div>
        ) : (
          <>
            {currentWeather && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 relative w-full max-w-3xl"
              >
                <CurrentWeather data={currentWeather} />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSaveLocation}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-primary-50 transition-colors"
                  title="Save to favorites"
                >
                  <Heart size={20} className="text-primary-500" />
                </motion.button>
              </motion.div>
            )}
          </>
        )}

        {/* Empty State */}
        {!isLoading && !currentWeather && (
          <div className="mt-6 card p-8 text-center w-full max-w-3xl">
            <MapPin size={40} className="text-neutral-300 mx-auto mb-3" />
            <h3 className="text-xl font-semibold text-neutral-700">No location selected</h3>
            <p className="text-neutral-500 mt-2">
              Search for a location or use your current location to view weather data
            </p>
            <button
              onClick={() => getUserLocation()}
              className="mt-4 btn btn-primary"
            >
              Use My Location
            </button>
          </div>
        )}

        {/* Forecast - Full Width */}
        {forecast && forecast.length > 0 && (
          <div className="w-full mt-6">
            <WeatherForecast forecastData={forecast} />
          </div>
        )}

        {/* Thunderstorm Alert - Keep max-w-3xl */}
        {currentWeather && currentWeather.weather[0].main === 'Thunderstorm' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-6 p-4 bg-warning-50 border border-warning-200 rounded-lg w-full max-w-3xl"
          >
            <div className="flex items-start">
              <AlertTriangle size={24} className="text-warning-500 mr-3 mt-0.5" />
              <div>
                <h3 className="font-semibold text-warning-800">Thunderstorm Alert</h3>
                <p className="text-warning-700 mt-1">
                  Thunderstorms are forecasted in {currentWeather.name}. Take necessary precautions 
                  and stay indoors if possible.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
