import { Link } from 'react-router-dom';
import { Cloud, Github, Twitter, Mail, Heart } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <Cloud size={28} className="text-primary-400" />
              <span className="text-xl font-bold">Weather App</span>
            </Link>
            <p className="mt-4 text-neutral-400">
              Accurate weather forecasts and insights to help you plan your day.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-neutral-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/dashboard" className="text-neutral-400 hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Account</h3>
            <ul className="space-y-2">
              <li><Link to="/profile" className="text-neutral-400 hover:text-white transition-colors">Profile</Link></li>
              <li><Link to="/login" className="text-neutral-400 hover:text-white transition-colors">Login</Link></li>
              <li><Link to="/register" className="text-neutral-400 hover:text-white transition-colors">Register</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-neutral-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            &copy; {currentYear} Weather App. All rights reserved.
          </p>
         
        </div>
      </div>
    </footer>
  );
}

export default Footer;