import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import images from '../constants/images';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  
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
      navigate('/dashboard');
    },
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${images.gymBg})` }}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="flex justify-center mb-4">
          <img src={images.logo} alt="Logo" className="w-16 h-16" />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-1">Login</h2>
        <p className="text-center text-gray-500 mb-6">Login to your dashboard</p>

        <div className="mb-4">
          <input
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Enter Email"
            className="w-full border rounded p-2 focus:outline-none"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div className="mb-6">
          <input
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="Enter Password"
            className="w-full border rounded p-2 focus:outline-none"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="cursor-pointer w-full bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-red-500 hover:underline"
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
