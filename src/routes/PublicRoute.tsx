import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface Props {
  children: JSX.Element;
}

// if already logged in, skip login page and go to products
const PublicRoute = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/products" replace />;
};

export default PublicRoute;
