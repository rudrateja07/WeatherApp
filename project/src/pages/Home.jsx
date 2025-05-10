import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Cloud, 
  MapPin, 
  BarChart2, 
  Bell, 
  Map, 
  ShieldCheck, 
  Clock,
  CloudSun,
  CloudMoon,
  CloudSnow,
  CloudRain
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

function Home() {
  const { isAuthenticated } = useAuthStore();
  
  const features = [
    {
      icon: <Cloud size={32} className="text-primary-500" />,
      title: "Real-Time Weather",
      description: "Get accurate, up-to-the-minute weather information for any location worldwide."
    },
    {
      icon: <BarChart2 size={32} className="text-primary-500" />,
      title: "Detailed Forecasts",
      description: "View hourly and 5-day forecasts with comprehensive weather data."
    },
    
    
    {
      icon: <MapPin size={32} className="text-primary-500" />,
      title: "Saved Locations",
      description: "Save your favorite locations for quick access to their weather information."
    },
    {
      icon: <ShieldCheck size={32} className="text-primary-500" />,
      title: "Secure Account",
      description: "Keep your preferences and saved locations secure with your personal account."
    }
  ];
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-day">
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-24 -right-24">
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <CloudSun size={240} className="text-white/20" />
            </motion.div>
          </div>
          <div className="absolute top-96 -left-20">
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <CloudRain size={180} className="text-white/20" />
            </motion.div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pt-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-shadow">
                Weather Forecasts<br />You Can <span className="text-accent-400">Trust</span>
              </h1>
              <p className="mt-4 text-lg text-white/90 max-w-xl">
                HelloSky provides accurate, real-time weather data and forecasts to help you plan your day with confidence.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to={isAuthenticated ? "/dashboard" : "/register"}
                  className="btn btn-accent py-3 px-6 text-white shadow-lg hover:shadow-xl transition-shadow"
                >
                  {isAuthenticated ? "Go to Dashboard" : "Get Started"}
                </Link>
                <Link
                  to="/map"
                  className="btn bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 py-3 px-6"
                >
                  Explore Weather Map
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 flex justify-center"
            >
              <div className="relative w-full max-w-md">
                <div className="card-glass p-6 backdrop-blur-lg">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-neutral-800">Andhra Pradesh</h2>
                      <p className="text-neutral-600">India</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-4xl font-bold text-neutral-800">23°C</div>
                      <p className="text-neutral-600">Partly Cloudy</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center mb-6">
                    <div className="bg-white/50 rounded-lg p-3">
                      <p className="text-sm text-neutral-500">Humidity</p>
                      <p className="text-lg font-semibold text-neutral-700">68%</p>
                    </div>
                    <div className="bg-white/50 rounded-lg p-3">
                      <p className="text-sm text-neutral-500">Wind</p>
                      <p className="text-lg font-semibold text-neutral-700">12 km/h</p>
                    </div>
                  </div>
                  <div className="border-t border-neutral-200 pt-4">
                    <p className="text-neutral-500 text-sm mb-3 flex items-center">
                      <Clock size={14} className="mr-1" /> 
                      5-Day Forecast
                    </p>
                    <div className="flex justify-between">
                      <div className="text-center">
                        <p className="text-xs text-neutral-500">Mon</p>
                        <CloudSun size={20} className="mx-auto my-1 text-accent-500" />
                        <p className="text-sm font-medium">24°</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-neutral-500">Tue</p>
                        <CloudRain size={20} className="mx-auto my-1 text-primary-500" />
                        <p className="text-sm font-medium">21°</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-neutral-500">Wed</p>
                        <CloudRain size={20} className="mx-auto my-1 text-primary-500" />
                        <p className="text-sm font-medium">19°</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-neutral-500">Thu</p>
                        <Cloud size={20} className="mx-auto my-1 text-primary-500" />
                        <p className="text-sm font-medium">22°</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-neutral-500">Fri</p>
                        <CloudSun size={20} className="mx-auto my-1 text-accent-500" />
                        <p className="text-sm font-medium">25°</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <motion.div
                  className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-accent-400 flex items-center justify-center shadow-lg"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 3, 0, -3, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <CloudSun size={40} className="text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              All the Weather Data You Need
            </h2>
            <p className="text-neutral-600 text-lg">
              HelloSky provides a comprehensive suite of weather features to keep you informed and prepared.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 hover:shadow-lg transition-shadow"
              >
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary-50 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-neutral-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Ready to Get Started?</h2>
              <p className="text-neutral-300">
                Create your free account and start accessing accurate weather forecasts today.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to={isAuthenticated ? "/dashboard" : "/register"}
                className="btn btn-accent py-3 px-6"
              >
                {isAuthenticated ? "Go to Dashboard" : "Sign Up for Free"}
              </Link>
              <Link
                to="/login"
                className="btn border border-white/30 bg-transparent hover:bg-white/10 text-white py-3 px-6"
              >
                {isAuthenticated ? "View Profile" : "Login"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;