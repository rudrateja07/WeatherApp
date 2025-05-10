import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { 
  Cloud, 
  User, 
  LogOut, 
  LogIn, 
  Menu, 
  X, 
  Home, 
  Map, 
  BarChart2
} from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location.pathname]);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              className="text-primary-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Cloud size={32} />
            </motion.div>
            <span className={`text-xl font-bold ${scrolled ? 'text-primary-900' : 'text-white text-shadow'}`}>
               Weather
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`flex items-center gap-1 font-medium transition-colors ${
                scrolled ? 'text-neutral-700 hover:text-primary-600' : 'text-white hover:text-primary-200'
              }`}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            {isAuthenticated && (
              <>
                <Link 
                  to="/dashboard" 
                  className={`flex items-center gap-1 font-medium transition-colors ${
                    scrolled ? 'text-neutral-700 hover:text-primary-600' : 'text-white hover:text-primary-200'
                  }`}
                >
                  <BarChart2 size={18} />
                  <span>Dashboard</span>
                </Link>
                {/* <Link 
                  to="/map" 
                  className={`flex items-center gap-1 font-medium transition-colors ${
                    scrolled ? 'text-neutral-700 hover:text-primary-600' : 'text-white hover:text-primary-200'
                  }`}
                >
                  <Map size={18} />
                  <span>Weather Map</span>
                </Link> */}
              </>
            )}
          </nav>
          
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 py-1 px-3 rounded-full border-2 border-transparent hover:border-primary-200 transition-all"
                >
                  <User size={18} className={scrolled ? 'text-primary-600' : 'text-white'} />
                  <span className={scrolled ? 'text-neutral-700' : 'text-white'}>
                    {user?.username}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className={`flex items-center gap-2 py-1 px-3 rounded-lg transition-colors ${
                    scrolled 
                      ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700' 
                      : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`flex items-center gap-2 py-1 px-3 rounded-lg transition-colors ${
                    scrolled 
                      ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700' 
                      : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 py-1 px-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white transition-colors"
                >
                  <User size={18} />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-neutral-600 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white shadow-lg rounded-b-lg"
        >
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col gap-3">
              <Link 
                to="/" 
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-neutral-100"
              >
                <Home size={18} />
                <span>Home</span>
              </Link>
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-neutral-100"
                  >
                    <BarChart2 size={18} />
                    <span>Dashboard</span>
                  </Link>
                  <Link 
                    to="/map" 
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-neutral-100"
                  >
                    <Map size={18} />
                    <span>Weather Map</span>
                  </Link>
                  <Link 
                    to="/profile" 
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-neutral-100"
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-neutral-100 text-left"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-neutral-100"
                  >
                    <LogIn size={18} />
                    <span>Login</span>
                  </Link>
                  <Link 
                    to="/register" 
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 text-white"
                  >
                    <User size={18} />
                    <span>Register</span>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
}

export default Navbar;