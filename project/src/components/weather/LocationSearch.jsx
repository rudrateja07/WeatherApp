import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, X } from 'lucide-react';
import toast from 'react-hot-toast';

function LocationSearch({ onSearch, recentSearches = [], addToRecent = () => {} }) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error('Please enter a location');
      return;
    }
    
    setIsSearching(true);
    
    onSearch(query.trim())
      .then(() => {
        addToRecent(query.trim());
        setQuery('');
      })
      .catch((error) => {
        toast.error(error.message || 'Location not found');
      })
      .finally(() => {
        setIsSearching(false);
      });
  };
  
  return (
    <div className="card">
      <div className="p-4">
        <form onSubmit={handleSearch} className="relative">
          <div className="flex rounded-lg shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-neutral-300 bg-neutral-50 text-neutral-500">
              <MapPin size={20} />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a city..."
              className="flex-1 input rounded-none rounded-r-lg border-neutral-300 focus:ring-primary-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="absolute right-0 top-0 h-full px-4 rounded-r-lg text-white bg-primary-500 hover:bg-primary-600 transition-colors flex items-center justify-center"
          >
            {isSearching ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Search size={20} />
              </motion.div>
            ) : (
              <Search size={20} />
            )}
          </button>
        </form>
        
        {recentSearches.length > 0 && (
          <div className="mt-3">
            <p className="text-sm text-neutral-500 mb-2">Recent searches:</p>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((location, index) => (
                <button
                  key={index}
                  onClick={() => onSearch(location)}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors"
                >
                  <span>{location}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LocationSearch;