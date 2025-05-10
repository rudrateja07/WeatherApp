import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Trash2 } from 'lucide-react';
import { useWeatherStore } from '../../store/weatherStore';

function SavedLocations({ locations = [], onSelectLocation, onRemoveLocation }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  if (!locations || locations.length === 0) {
    return (
      <div className="card p-5 text-center">
        <Star size={32} className="text-neutral-300 mx-auto mb-2" />
        <h3 className="text-lg font-medium text-neutral-700">No saved locations</h3>
        <p className="text-neutral-500 mt-1">Search for a location and save it to your favorites</p>
      </div>
    );
  }
  
  return (
    <div className="card">
      <div className="p-4 bg-primary-500 text-white">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Star size={20} />
          <span>Saved Locations</span>
        </h2>
      </div>
      
      <ul className="divide-y divide-neutral-100">
        <AnimatePresence>
          {locations.map((location, index) => (
            <motion.li
              key={location.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.2 }}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <button
                onClick={() => onSelectLocation(location)}
                className="w-full text-left p-4 hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="text-primary-500 mt-1" size={18} />
                  <div>
                    <h3 className="font-medium">{location.name}</h3>
                    <p className="text-sm text-neutral-500">
                      {location.lat.toFixed(2)}, {location.lon.toFixed(2)}
                    </p>
                  </div>
                </div>
              </button>
              
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-error-50 text-error-500 hover:bg-error-100 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveLocation(location.id);
                    }}
                    title="Remove from favorites"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default SavedLocations;