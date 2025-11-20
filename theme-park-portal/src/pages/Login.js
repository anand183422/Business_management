import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email,password);

    try {
      const res = await axios.post('https://business-management-backend-gamma.vercel.app/api/auth/login', {
        email,
        password,
      });

      const user = res.data;
     
      localStorage.setItem('user', JSON.stringify(user));

      switch (user.role) {
        case 'SUPER_ADMIN':
          navigate('/superadmin');
          break;
        case 'ADMIN':
          navigate('/admin');
          break;
        case 'VISITOR':
          navigate('/visitor');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-600">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-600">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
