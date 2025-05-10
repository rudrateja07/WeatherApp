import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { useWeatherStore } from '../store/weatherStore';
import { User, MapPin, LogOut, Save, Edit2, X, Settings } from 'lucide-react';
import SavedLocations from '../components/weather/SavedLocations';

function Profile() {
  const { user, logout } = useAuthStore();
  const { savedLocations, removeSavedLocation } = useWeatherStore();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    username: user?.username || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user profile API would go here
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfileData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      username: user?.username || '',
    });
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-neutral-600 mt-1">
          Manage your account settings and saved locations
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card"
          >
            <div className="p-4 bg-primary-500 text-white flex justify-between items-center">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <User size={20} />
                <span>Profile Information</span>
              </h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <Edit2 size={16} />
                </button>
              ) : (
                <button
                  onClick={handleCancel}
                  className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="p-6">
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  {/* Editable Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleChange}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleChange}
                        className="input"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={profileData.username}
                      onChange={handleChange}
                      className="input"
                      disabled
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="btn btn-outline mr-3"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary flex items-center gap-2">
                      <Save size={18} />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </form>
              ) : (
                // Read-only Profile Info
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-neutral-500">Username</h3>
                      <p className="mt-1 text-lg">{user?.username || 'Not set'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-neutral-500">Email</h3>
                      <p className="mt-1 text-lg">{user?.email || 'Not set'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-neutral-500">First Name</h3>
                      <p className="mt-1 text-lg">{user?.firstName || 'Not set'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-neutral-500">Last Name</h3>
                      <p className="mt-1 text-lg">{user?.lastName || 'Not set'}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-200">
                    <h3 className="text-sm font-medium text-neutral-500">Account Created</h3>
                    <p className="mt-1">
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : 'Unknown'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Preferences Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 card"
          >
            <div className="p-4 bg-primary-500 text-white">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Settings size={20} />
                <span>Preferences</span>
              </h2>
            </div>
            <div className="p-6">
              {/* Preferences Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Temperature Unit
                  </label>
                  <div className="flex">
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-l-lg">
                      Celsius (°C)
                    </button>
                    <button className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-r-lg">
                      Fahrenheit (°F)
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Distance Unit
                  </label>
                  <div className="flex">
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-l-lg">
                      Kilometers
                    </button>
                    <button className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-r-lg">
                      Miles
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Wind Speed Unit
                  </label>
                  <select className="input">
                    <option value="ms">Meters/Second (m/s)</option>
                    <option value="mph">Miles/Hour (mph)</option>
                    <option value="kph">Kilometers/Hour (km/h)</option>
                    <option value="knots">Knots (kn)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Time Format
                  </label>
                  <div className="flex">
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-l-lg">
                      24-hour
                    </button>
                    <button className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-r-lg">
                      12-hour
                    </button>
                  </div>
                </div>
              </div>

              {/* Notification Toggle */}
              <div className="mt-6 pt-4 border-t border-neutral-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Notification Settings</h3>
                    <p className="text-sm text-neutral-500 mt-1">
                      Receive alerts about severe weather conditions
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-neutral-200 peer-checked:bg-primary-500 rounded-full peer after:content-[''] after:absolute after:left-[2px] after:top-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white" />
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card"
          >
            <div className="p-4 bg-primary-500 text-white flex items-center gap-2">
              <MapPin size={20} />
              <h2 className="text-xl font-semibold">Saved Locations</h2>
            </div>
            <div className="p-4">
              {savedLocations.length === 0 ? (
                <p className="text-sm text-neutral-500">No saved locations yet.</p>
              ) : (
                <SavedLocations
                  locations={savedLocations}
                  onRemove={removeSavedLocation}
                />
              )}
            </div>
          </motion.div>

          {/* Logout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card"
          >
            <div className="p-4 bg-primary-500 text-white flex items-center gap-2">
              <LogOut size={20} />
              <h2 className="text-xl font-semibold">Logout</h2>
            </div>
            <div className="p-4">
              <button
                onClick={logout}
                className="btn btn-danger w-full flex items-center justify-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
