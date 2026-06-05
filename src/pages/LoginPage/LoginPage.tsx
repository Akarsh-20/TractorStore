import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ username, password });
      navigate('/products');
    } catch {
      setError('Wrong username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // fill in test creds quickly
  const fillTestCredentials = () => {
    setUsername('mor_2314');
    setPassword('83r5^_');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 to-emerald-700 flex-col items-center justify-center p-12 relative overflow-hidden">

        {/* decorative circles */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 text-center">
          <img
            src="/tractor.png"
            alt="Tractor Store"
            className="w-32 h-32 object-contain mx-auto mb-8 drop-shadow-2xl"
          />
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Tractor Store
          </h1>
          <p className="text-green-100 text-lg max-w-sm leading-relaxed">
            Your one-stop shop for everything agricultural.
          </p>

          {/* small feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {['Quality Products', 'Best Prices', 'Fast Delivery'].map((tag) => (
              <span
                key={tag}
                className="bg-white/20 text-white text-sm px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* right panel - login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">

          {/* mobile logo (only shows on small screens) */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <img src="/tractor.png" alt="logo" className="w-10 h-10 object-contain" />
            <span className="text-xl font-bold text-gray-800">Tractor Store</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="text-gray-500 mt-1">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" id="login-form">

            {/* error box */}
            {error && (
              <div
                id="login-error"
                className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2"
              >
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1.5">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                autoComplete="username"
                className="w-full border border-gray-200 bg-white text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200"
              />
            </div>

            {/* password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="w-full border border-gray-200 bg-white text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200"
                />
                <button
                  type="button"
                  id="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors text-lg"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* submit */}
            <button
              type="submit"
              id="login-submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-500 disabled:bg-green-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-green-500/20 mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* test credentials */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center mb-3">Test credentials</p>
            <button
              id="fill-test-creds"
              type="button"
              onClick={fillTestCredentials}
              className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-500 font-mono transition-all duration-200 text-left"
            >
              <div>username: <span className="text-green-600 font-semibold">mor_2314</span></div>
              <div>password: <span className="text-green-600 font-semibold">83r5^_</span></div>
              <div className="text-gray-400 mt-1">click to autofill</div>
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            Tractor Store &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
