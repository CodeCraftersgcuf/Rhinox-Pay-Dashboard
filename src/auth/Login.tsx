import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import images from '../constants/images';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
    }),
    onSubmit: (values) => {
      console.log('Login Data:', values);
      // Handle login logic here
      navigate('/authenticator-setup');
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

          <form
            onSubmit={formik.handleSubmit}
            className="w-full"
          >
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
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {showPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    )}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full text-gray-900 font-semibold py-3 rounded-xl transition-colors"
              style={{ backgroundColor: '#A9EF45' }}
            >
              Login
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
