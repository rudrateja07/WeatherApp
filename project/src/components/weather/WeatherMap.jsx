import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWeatherStore } from '../../store/weatherStore';
import { formatTemperature } from '../../utils/weatherUtils';
import Loader from '../ui/Loader';

function WeatherMap({ locations = [], onSelectLocation }) {
  const [locationData, setLocationData] = useState({});
  const { fetchCurrentWeather, isLoading } = useWeatherStore();

  useEffect(() => {
    const fetchLocationData = async () => {
      const data = {};
      
      for (const location of locations) {
        try {
          const weatherData = await fetchCurrentWeather(location.name);
          data[location.id] = weatherData;
        } catch (error) {
          console.error(`Error fetching data for ${location.name}:`, error);
        }
      }
      
      setLocationData(data);
    };

    if (locations.length > 0) {
      fetchLocationData();
    }
  }, [locations, fetchCurrentWeather]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-[70vh] md:h-[80vh] rounded-lg overflow-hidden shadow-lg border border-neutral-200 relative"
    >
      {!isLoading && !locationData && <Loader />}

      {/* Google Map iframe */}
      <div className="h-full w-full">
        <iframe
          title="Google Maps"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src={`https://www.google.com/maps/embed/v1/view?center=40.7128,-74.0060&zoom=9`} // Centered on NYC, adjust coordinates as needed
          allowFullScreen
        ></iframe>
      </div>

      {isLoading && <Loader />}
    </motion.div>
  );
}

export default WeatherMap;
