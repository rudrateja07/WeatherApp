import { create } from 'zustand';
import axios from 'axios';
import { WEATHER_API_KEY, WEATHER_API_URL, DEFAULT_UNITS } from '../config/constants';
import toast from 'react-hot-toast';

export const useWeatherStore = create((set, get) => ({
  currentWeather: null,
  forecast: null,
  savedLocations: [],
  alerts: [],
  isLoading: false,
  error: null,

  fetchCurrentWeather: async (location) => {
    try {
      set({ isLoading: true, error: null });

      const response = await axios.get(`${WEATHER_API_URL}/weather`, {
        params: {
          q: location,
          appid: WEATHER_API_KEY,
          units: DEFAULT_UNITS
        }
      });

      set({
        currentWeather: response.data,
        isLoading: false
      });

      return response.data;
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Failed to fetch weather data'
        : 'An unknown error occurred';

      set({ error: errorMessage, isLoading: false });
      toast.error(`Weather data error: ${errorMessage}`);
      throw new Error(errorMessage);
    }
  },

  fetchForecast: async (location) => {
    try {
      set({ isLoading: true, error: null });

      const response = await axios.get(`${WEATHER_API_URL}/forecast`, {
        params: {
          q: location,
          appid: WEATHER_API_KEY,
          units: DEFAULT_UNITS
        }
      });

      set({
        forecast: response.data.list,
        isLoading: false
      });

      return response.data;
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Failed to fetch forecast data'
        : 'An unknown error occurred';

      set({ error: errorMessage, isLoading: false });
      toast.error(`Forecast data error: ${errorMessage}`);
      throw new Error(errorMessage);
    }
  },

  fetchWeatherByCoords: async (lat, lon) => {
    try {
      set({ isLoading: true, error: null });

      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(`${WEATHER_API_URL}/weather`, {
          params: {
            lat,
            lon,
            appid: WEATHER_API_KEY,
            units: DEFAULT_UNITS
          }
        }),
        axios.get(`${WEATHER_API_URL}/forecast`, {
          params: {
            lat,
            lon,
            appid: WEATHER_API_KEY,
            units: DEFAULT_UNITS
          }
        })
      ]);

      set({
        currentWeather: weatherResponse.data,
        forecast: forecastResponse.data.list,
        isLoading: false
      });

      return {
        currentWeather: weatherResponse.data,
        forecast: forecastResponse.data
      };
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Failed to fetch weather data'
        : 'An unknown error occurred';

      set({ error: errorMessage, isLoading: false });
      toast.error(`Weather data error: ${errorMessage}`);
      throw new Error(errorMessage);
    }
  },

  getUserLocation: async () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        toast.error('Geolocation is not supported by your browser');
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            await get().fetchWeatherByCoords(latitude, longitude);
            resolve({ latitude, longitude });
          } catch (error) {
            reject(error);
          }
        },
        (error) => {
          let errorMessage = 'Failed to get your location';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location permission denied';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
          }
          toast.error(errorMessage);
          reject(new Error(errorMessage));
        }
      );
    });
  },

  saveFavoriteLocation: async (location) => {
    try {
      const { API_URL } = await import('../config/constants');

      const response = await axios.post(`${API_URL}/locations`, location);

      set((state) => ({
        savedLocations: [...state.savedLocations, response.data]
      }));

      toast.success(`${location.name} added to favorites`);
      return response.data;
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Failed to save location'
        : 'An unknown error occurred';

      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  fetchSavedLocations: async () => {
    try {
      const { API_URL } = await import('../config/constants');

      const response = await axios.get(`${API_URL}/locations`);

      set({ savedLocations: response.data });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch saved locations:', error);
      return [];
    }
  },

  removeSavedLocation: async (locationId) => {
    try {
      const { API_URL } = await import('../config/constants');

      await axios.delete(`${API_URL}/locations/${locationId}`);

      set((state) => ({
        savedLocations: state.savedLocations.filter(loc => loc.id !== locationId)
      }));

      toast.success('Location removed from favorites');
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Failed to remove location'
        : 'An unknown error occurred';

      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
}));
