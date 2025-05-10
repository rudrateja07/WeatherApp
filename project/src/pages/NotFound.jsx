import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cloud, Home, CloudOff } from 'lucide-react';

function NotFound() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-12 flex items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card max-w-lg w-full text-center p-8"
      >
        <CloudOff size={64} className="text-neutral-400 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-neutral-700 mb-4">Page Not Found</h2>
        <p className="text-neutral-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/"
            className="btn btn-primary flex items-center justify-center gap-2"
          >
            <Home size={18} />
            <span>Go Home</span>
          </Link>
          <Link 
            to="/dashboard"
            className="btn btn-outline flex items-center justify-center gap-2"
          >
            <Cloud size={18} />
            <span>Weather Dashboard</span>
          </Link>
        </div>
        
        <div className="mt-8">
          <p className="text-neutral-500 text-sm">
            Lost? Try checking the weather instead!
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default NotFound;