import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <img
          src="/tractor.png"
          alt="Tractor Store"
          className="w-24 h-24 object-contain mx-auto mb-6 opacity-40"
        />
        <h1 className="text-7xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-gray-500 text-lg mb-2">Page not found</p>
        <p className="text-gray-400 text-sm mb-8">Looks like this field doesn't exist.</p>
        <button
          id="back-home-btn"
          onClick={() => navigate('/login')}
          className="bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-md shadow-green-500/20"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
