import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSelector from '../../components/LanguageSelector';

const Login: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate login
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/');
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Header with language selector */}
      <div className="bg-gradient-to-r from-green-700 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <span className="font-medium text-sm">{t('algerianRepublic')}</span>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Logo and Title */}
          <div className={`text-center ${isRTL ? 'rtl' : 'ltr'}`}>
            <div className="mx-auto h-20 w-20 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Scale className="h-10 w-10 text-white" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              {t('appName')}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {t('appDescription')}
            </p>
            <div className="mt-4 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm font-medium text-green-800">
                {t('login')}
              </p>
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="email" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('email')}
                </label>
                <div className="relative">
                  <Mail className={`absolute top-3 h-5 w-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full border border-gray-300 rounded-xl px-3 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      isRTL ? 'pr-10 text-right' : 'pl-10 text-left'
                    }`}
                    placeholder="exemple@email.com"
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('password')}
                </label>
                <div className="relative">
                  <Lock className={`absolute top-3 h-5 w-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full border border-gray-300 rounded-xl px-3 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      isRTL ? 'pr-10 pl-10 text-right' : 'pl-10 pr-10 text-left'
                    }`}
                    placeholder="••••••••"
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute top-3 text-gray-400 hover:text-gray-600 ${isRTL ? 'left-3' : 'right-3'}`}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className={`block text-sm text-gray-700 ${isRTL ? 'mr-2' : 'ml-2'}`}>
                    {t('rememberMe')}
                  </label>
                </div>

                <Link
                  to="/forgot-password"
                  className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  {t('forgotPassword')}
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-xl font-medium hover:from-green-700 hover:to-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 ${
                  isRTL ? 'space-x-reverse' : ''
                }`}
              >
                {loading ? (
                  <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>{t('loading')}</span>
                  </div>
                ) : (
                  <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                    <span>{t('login')}</span>
                    <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                  </div>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t('noAccount')}{' '}
                <Link
                  to="/register"
                  className="text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  {t('createAccount')}
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              {t('allRightsReserved')} © 2024 {t('appName')}
            </p>
            <div className={`flex items-center justify-center space-x-4 mt-2 ${isRTL ? 'space-x-reverse' : ''}`}>
              <Link to="/privacy" className="text-xs text-green-600 hover:text-green-700">
                {t('privacyPolicy')}
              </Link>
              <span className="text-gray-300">•</span>
              <Link to="/terms" className="text-xs text-green-600 hover:text-green-700">
                {t('termsOfService')}
              </Link>
              <span className="text-gray-300">•</span>
              <Link to="/contact" className="text-xs text-green-600 hover:text-green-700">
                {t('contact')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;