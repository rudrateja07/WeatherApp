import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Loader from '../ui/Loader';

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuthStore();
  
  if (isLoading) {
    return <Loader />;
  }
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;