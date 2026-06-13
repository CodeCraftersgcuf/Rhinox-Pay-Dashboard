import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import images from '../constants/images';
import { useNavigate } from 'react-router-dom';
import { adminApiSend } from '../services/adminApi';
import { ADMIN_ROUTES } from '../api/apiConfig';
import { setAdminToken, setAdminUser } from '../services/authService';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setError('');
      try {
        const data = await adminApiSend(ADMIN_ROUTES.AUTH.LOGIN, 'POST', {
          email: values.email,
          password: values.password,
        });
        setAdminToken(data.accessToken);
        setAdminUser(data.admin);
        navigate('/dashboard');
      } catch (err: any) {
        setError(err.message || 'Login failed');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${images.login_bg})`,
        backgroundColor: '#020C19'
      }}
    >
      <div className="w-full max-w-lg px-4">
        <div
          className="rounded-2xl px-8 py-10 w-full"
          style={{ backgroundColor: '#020C19', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}
        >
          <h1 className="text-4xl font-semibold text-white text-center mb-2">Login</h1>
          <p className="text-center text-gray-400 mb-8">Login to the admin dashboard</p>

          <form onSubmit={formik.handleSubmit} className="w-full">
            <div className="mb-5">
              <label className="block text-white mb-2 text-sm">Email</label>
              <input
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Enter email address"
                className="w-full text-white placeholder-gray-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-lime-400"
                style={{ backgroundColor: '#1a2332' }}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-white mb-2 text-sm">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="Enter Password"
                  className="w-full text-white placeholder-gray-500 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-lime-400"
                  style={{ backgroundColor: '#1a2332' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 focus:outline-none"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
              )}
            </div>

            {error ? <p className="text-sm text-red-500 mb-4">{error}</p> : null}

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full py-3 rounded-lg font-semibold text-gray-900 transition-colors"
              style={{ backgroundColor: '#A9EF45', opacity: formik.isSubmitting ? 0.7 : 1 }}
            >
              {formik.isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
