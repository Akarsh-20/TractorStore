import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* logo and brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => navigate('/products')}
          >
            <div className="bg-green-50 p-2 rounded-lg group-hover:bg-green-100 transition-colors">
              <img src="/tractor.png" alt="Tractor Store" className="w-8 h-8 object-contain" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Tractor Store</span>
          </div>

          {/* actions */}
          <div>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-600 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-all duration-200"
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
