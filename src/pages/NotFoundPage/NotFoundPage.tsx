import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-8xl mb-6">🚜</div>
        <h1 className="text-7xl font-bold text-white mb-4">404</h1>
        <p className="text-gray-400 text-lg mb-2">Page not found</p>
        <p className="text-gray-600 text-sm mb-8">Looks like this field doesn't exist.</p>
        <button
          id="back-home-btn"
          onClick={() => navigate('/login')}
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-green-500/25"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
