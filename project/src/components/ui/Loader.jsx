import { motion } from 'framer-motion';
import { Cloud, CloudRain, CloudSnow } from 'lucide-react';

function Loader() {
  return (
    <div className="fixed inset-0 bg-neutral-50/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2">
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              delay: 0
            }}
          >
            <Cloud className="text-primary-500" size={32} />
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              delay: 0.3
            }}
          >
            <CloudRain className="text-primary-600" size={32} />
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              delay: 0.6
            }}
          >
            <CloudSnow className="text-primary-400" size={32} />
          </motion.div>
        </div>
        <p className="mt-4 text-neutral-600 font-medium">Loading weather data...</p>
      </div>
    </div>
  );
}

export default Loader;