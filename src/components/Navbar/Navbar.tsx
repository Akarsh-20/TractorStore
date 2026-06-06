import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-green-700 to-emerald-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* logo and brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => navigate('/products')}
          >
            <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">
              <img src="/tractor.png" alt="Tractor Store" className="w-8 h-8 object-contain drop-shadow-md" />
            </div>
            <span className="text-xl font-bold tracking-tight">Tractor Store</span>
          </div>

          {/* desktop navigation links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-green-100 hover:text-white font-medium transition-colors">Home</Link>
            <Link to="/products" className="text-white font-semibold transition-colors">Products</Link>
            <Link to="/products/new" className="text-green-100 hover:text-white font-medium transition-colors">Add Product</Link>
            <Link to="#" className="text-green-100 hover:text-white font-medium transition-colors">Details</Link>
          </div>

          {/* actions */}
          <div>
            <button
              onClick={handleLogout}
              className="text-green-100 hover:text-white font-medium px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200"
            >
              Logout
            </button>
          </div>

        </div>
      </div>

      {/* mobile navigation (simple fallback) */}
      <div className="md:hidden bg-green-800/50 px-4 py-2 flex justify-between border-t border-white/10 overflow-x-auto gap-4">
        <Link to="/" className="text-green-100 hover:text-white text-sm whitespace-nowrap">Home</Link>
        <Link to="/products" className="text-white text-sm font-semibold whitespace-nowrap">Products</Link>
        <Link to="/products/new" className="text-green-100 hover:text-white text-sm whitespace-nowrap">Add Product</Link>
        <Link to="#" className="text-green-100 hover:text-white text-sm whitespace-nowrap">Details</Link>
      </div>
    </nav>
  );
};

export default Navbar;
