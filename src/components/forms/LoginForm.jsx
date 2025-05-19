import { useState, useEffect } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth.store';
import { useUserStore } from '@/stores/user.store';
import LogInSvg from '../svg/LogInSvg';
import { normalizeLoginResponse, setAuthToken } from '@/stores/app-initializer';

export default function LoginForm() {
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Form validation errors
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  // Login success state
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Get state store functions
  const setAuth = useAuthStore((state) => state.setAuth);
  const setUserData = useUserStore((state) => state.setUserData);

  // Use React Query for login request
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const response = await axios.post('http://127.0.0.1:8000/api/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('✅ Original response data:', data);
      
      // Normalize data
      const normalizedData = normalizeLoginResponse(data);
      console.log('✅ Normalized data:', normalizedData);

      // Use normalized data
      if (normalizedData.isSuccess) {
        // Set authentication state first
        setAuth(true);

        // Set token
        if (normalizedData.token) {
          setAuthToken(normalizedData.token);
        }

        // Set user data
        setUserData(normalizedData.userData);

        setLoginSuccess(true);
      }
    }
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Send credentials
      loginMutation.mutate({
        email: formData.email,
        password: formData.password
      });
    }
  };

  // Handle "Remember Me"
  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);

    // Store "Remember Me" state in localStorage
    if (e.target.checked) {
      localStorage.setItem('rememberMe', 'true');
      localStorage.setItem('savedEmail', formData.email);
    } else {
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('savedEmail');
    }
  };

  // Retrieve saved email when component loads
  useEffect(() => {
    const rememberedUser = localStorage.getItem('rememberMe') === 'true';
    const savedEmail = localStorage.getItem('savedEmail') || '';

    if (rememberedUser && savedEmail) {
      setRememberMe(true);
      setFormData(prev => ({ ...prev, email: savedEmail }));
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-[1700px] mx-auto flex items-center justify-between">
        {/* Left side - Form */}
        <div
          className="bg-white rounded-2xl p-8 w-full max-w-md"
          style={{ boxShadow: '6px 8px 16px rgba(0, 0, 0, 0.10)' }}
        >

          {loginSuccess ? (
            <div className="text-center">
              <div className="text-green-600 text-5xl mb-4">✓</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">تم تسجيل الدخول بنجاح!</h2>
              <p className="text-gray-600">مرحبًا بعودتك! سيتم توجيهك إلى لوحة التحكم خلال لحظات.</p>
              <button
                className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  window.location.href = '/dashboard';
                }}>
                الذهاب إلى لوحة التحكم
              </button>
            </div>
          ) : (
            <>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-blue-900">Log In</h2>
              </div>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-5">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full px-3 py-2 border-0 border-b border-gray-300 text-gray-700 focus:border-b-blue-900 focus:outline-none bg-transparent"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full px-3 py-2 border-0 border-b border-gray-300 text-gray-700 focus:border-b-blue-900 focus:outline-none bg-transparent"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-900 border-gray-300 rounded"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-500">
                    Remember Me
                  </label>
                </div>

                {/* API error message */}
                {loginMutation.isError && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          {loginMutation.error?.response?.data?.message || 'Invalid email or password'}
                        </h3>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className={`w-full bg-blue-900 text-white py-2 px-4 rounded-md font-medium ${loginMutation.isPending ? 'opacity-70' : 'hover:bg-blue-800'}`}
                  >
                    {loginMutation.isPending ? 'Logging in...' : 'Login'}
                  </button>
                </div>

                <div className="text-center text-xs text-gray-500">
                  <span>Already Checked? </span>
                  <a href="/login" className="text-blue-900">Login here</a>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500 text-xs">OR</span>
                  </div>
                </div>

                {/* Social Login Buttons */}
                <div className="space-y-3">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.787-1.676-4.139-2.701-6.735-2.701-5.522 0-10.001 4.478-10.001 10s4.478 10 10.001 10c8.396 0 10.249-7.85 9.426-11.748l-9.426 0.081z" />
                    </svg>
                    Login with Google
                  </button>

                  <button
                    type="button"
                    className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-blue-600 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                    </svg>
                    Login with Facebook
                  </button>

                  <button
                    type="button"
                    className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-black text-sm font-medium text-white hover:bg-gray-900"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    Login with Apple
                  </button>
                </div>

                <div className="text-center text-xs text-gray-500">
                  <p>By continuing, you agree to the <a href="#" className="text-orange-500">Terms of Service</a> and <a href="#" className="text-orange-500">Privacy Policy</a></p>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Right side - Illustration */}
        <div className="hidden md:block md:w-3/5 pl-10 ">
          <LogInSvg />
        </div>
      </div>
    </div>
  );
}