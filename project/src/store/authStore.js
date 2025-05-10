import { create } from 'zustand';
import axios from 'axios';
import { API_URL } from '../config/constants';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Login method without token-based authentication
  login: async (credentials) => {
    try {
      set({ isLoading: true, error: null });

      // Call the backend login API
      const response = await axios.post(`${API_URL}/login`, credentials);

      const { user } = response.data;  // Assuming the backend sends the user data directly

      // Set user details to the store
      set({
        user,
        isAuthenticated: true,
        isLoading: false
      });

      toast.success('Successfully logged in!');
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Failed to login'
        : 'An unknown error occurred';

      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
    }
  },

  // Register method
  register: async (credentials) => {
    try {
      set({ isLoading: true, error: null });

      if (credentials.password !== credentials.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Call the backend register API
      const response = await axios.post(`${API_URL}/register`, credentials);
      const { user } = response.data;  // Assuming the backend sends the user data directly

      set({
        user,
        isAuthenticated: true,
        isLoading: false
      });

      toast.success('Registration successful!');
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Registration failed'
        : 'An unknown error occurred';

      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
    }
  },

  // Logout method
  logout: () => {
    set({
      user: null,
      isAuthenticated: false
    });
    toast.success('Logged out successfully');
  },

  // Check authentication without token
  checkAuth: () => {
    const user = localStorage.getItem('user');
    if (!user) {
      set({
        user: null,
        isAuthenticated: false
      });
    } else {
      set({
        user: JSON.parse(user),
        isAuthenticated: true
      });
    }
  }
}));
