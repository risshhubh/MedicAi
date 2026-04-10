import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Activity, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import LoadingScreen from '../components/LoadingScreen';
import { GoogleLogin } from '@react-oauth/google';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signup, googleLogin } = useAuth();
  const message = location.state?.message;

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    const result = await googleLogin(credentialResponse.credential);
    if (result.success) {
      setLoading(true);
      setTimeout(() => navigate('/'), 2000);
    } else {
      setError(result.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await signup(formData.name, formData.email, formData.password);

    if (result.success) {
      setLoading(true);
      setTimeout(() => {
        navigate('/');
      }, 2500);
    } else {
      setError(result.error);
    }
  };

  if (loading) return <LoadingScreen message="Creating your MedicAi profile..." />;

  return (
    <div className="min-h-screen bg-slate-50 font-plus-jakarta flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-teal-100/50 rounded-full blur-3xl mix-blend-multiply opacity-70"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-3xl mix-blend-multiply opacity-70"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-600/30">
            <Activity size={28} />
          </div>
          <span className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-teal-500 tracking-tight">
            MedicAi
          </span>
        </Link>
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-teal-600 hover:text-teal-500 transition-colors">
            Log in here
          </Link>
        </p>
      </motion.div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white py-10 px-4 shadow-2xl shadow-slate-200/50 sm:rounded-3xl sm:px-10 border border-slate-100"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {message && (
              <div className="p-4 rounded-xl bg-teal-50 text-teal-700 text-sm border border-teal-100 flex items-center gap-3 font-semibold animate-pulse">
                <Activity className="w-5 h-5" />
                <span>{message}</span>
              </div>
            )}
            {error && (
              <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm border border-red-100 flex flex-col space-y-1">
                <span>{error}</span>
                {error === 'User already exists' && (
                  <Link to="/login" className="font-bold underline hover:text-red-700">
                    Log in here
                  </Link>
                )}
              </div>
            )}
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-slate-900">
                Full Name
              </label>
              <div className="mt-2 relative rounded-xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <User className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="block w-full rounded-xl border-0 py-3 pl-11 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 transition-all"
                  placeholder="Dr. Jane Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-900">
                Email address
              </label>
              <div className="mt-2 relative rounded-xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Mail className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="block w-full rounded-xl border-0 py-3 pl-11 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 transition-all"
                  placeholder="doctor@hospital.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-slate-900">
                Password
              </label>
              <div className="mt-2 relative rounded-xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Lock className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="block w-full rounded-xl border-0 py-3 pl-11 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group flex w-full justify-center items-center rounded-xl bg-slate-900 px-3 py-3.5 text-sm font-semibold text-white shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
              >
                Sign Up
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-slate-500">Or continue with</span>
              </div>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Google Login Failed')}
                useOneTap
                theme="outline"
                shape="pill"
                size="large"
                width="100%"
              />
            </div>

            <div className="mt-4 text-center text-xs text-slate-500">
              By registering, you agree to our <a href="#" className="underline hover:text-slate-800">Terms of Service</a> and <a href="#" className="underline hover:text-slate-800">Privacy Policy</a>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
