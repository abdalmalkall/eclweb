import { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/auth.store';
import { useUserStore } from '../../stores/user.store';
import LogInSvg from '../svg/LogInSvg';

// دوال التحقق من صحة البيانات
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password.length >= 8;
};

export default function SignUpForm() {
  // حالة النموذج
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // أخطاء التحقق من صحة النموذج
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // حالة نجاح التسجيل
  const [signupSuccess, setSignupSuccess] = useState(false);
  
  // الحصول على وظائف متجر الحالة
  const setAuth = useAuthStore((state) => state.setAuth);
  const setUserData = useUserStore((state) => state.setUserData);
  
  // استخدام React Query للتعامل مع طلب التسجيل
  const signupMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name: userData.fullName,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.confirmPassword
      });
      return response.data;
    },
    onSuccess: (data) => {
      // تحديث المتاجر عند نجاح التسجيل
      if (data.status === "success") {
        // تخزين توكن الوصول وبيانات المستخدم
        const token = data.data.access_token;
        const user = data.data.user;
        
        // تحديث المتاجر
        setAuth(true);
        setUserData(user);
        
        // حفظ التوكن في localStorage (اختياري)
        localStorage.setItem('token', token);
        localStorage.setItem('token_type', data.data.token_type);
         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setSignupSuccess(true);
      }
    }
  });
  
  // التعامل مع تغييرات المدخلات
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // مسح الخطأ عندما يكتب المستخدم
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // التحقق من صحة النموذج
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    // التحقق من الاسم الكامل
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'الاسم الكامل مطلوب';
      isValid = false;
    }
    
    // التحقق من البريد الإلكتروني
    if (!formData.email) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'يرجى إدخال بريد إلكتروني صالح';
      isValid = false;
    }
    
    // التحقق من كلمة المرور
    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
      isValid = false;
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'يجب أن تكون كلمة المرور 8 أحرف على الأقل';
      isValid = false;
    }
    
    // التحقق من تأكيد كلمة المرور
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'يرجى تأكيد كلمة المرور';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'كلمات المرور غير متطابقة';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // التعامل مع إرسال النموذج
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // إرسال البيانات
      signupMutation.mutate({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-[1700px] mx-auto flex items-center justify-between">
        {/* Left side - Form */}
        <div
          className="bg-white rounded-2xl p-8 w-full max-w-md"
          style={{ boxShadow: '6px 8px 16px rgba(0, 0, 0, 0.10)' }}
        >
          {signupSuccess ? (
            <div className="text-center">
              <div className="text-green-600 text-5xl mb-4">✓</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">تم التسجيل بنجاح!</h2>
              <p className="text-gray-600">شكراً للتسجيل. يمكنك الآن تسجيل الدخول باستخدام بيانات الاعتماد الخاصة بك.</p>
              <button
                className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  window.location.href = '/login';
                }}>
                الذهاب إلى تسجيل الدخول
              </button>
            </div>
          ) : (
            <>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-blue-900">Sign Up</h2>
              </div>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-5">
                  {/* الاسم الكامل */}
                  <div>
                    <label htmlFor="fullName" className="sr-only">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      className="block w-full px-3 py-2 border-0 border-b border-gray-300 text-gray-700 focus:border-b-blue-900 focus:outline-none bg-transparent"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    {errors.fullName && (
                      <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>
                    )}
                  </div>
                  
                  {/* البريد الإلكتروني */}
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
                  
                  {/* كلمة المرور */}
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
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
                  
                  {/* تأكيد كلمة المرور */}
                  <div>
                    <label htmlFor="confirmPassword" className="sr-only">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="block w-full px-3 py-2 border-0 border-b border-gray-300 text-gray-700 focus:border-b-blue-900 focus:outline-none bg-transparent"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                {/* رسالة خطأ API */}
                {signupMutation.isError && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          {signupMutation.error?.response?.data?.message || signupMutation.error?.message || 'حدث خطأ أثناء التسجيل'}
                        </h3>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={signupMutation.isPending}
                    className={`w-full bg-blue-900 text-white py-2 px-4 rounded-md font-medium ${signupMutation.isPending ? 'opacity-70' : 'hover:bg-blue-800'}`}
                  >
                    {signupMutation.isPending ? 'Signing up...' : 'Sign Up'}
                  </button>
                </div>

                <div className="text-center text-xs text-gray-500">
                  <span>Already have an account? </span>
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

                {/* Social Sign Up Buttons */}
                <div className="space-y-3">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.787-1.676-4.139-2.701-6.735-2.701-5.522 0-10.001 4.478-10.001 10s4.478 10 10.001 10c8.396 0 10.249-7.85 9.426-11.748l-9.426 0.081z" />
                    </svg>
                    Sign up with Google
                  </button>

                  <button
                    type="button"
                    className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-blue-600 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                    </svg>
                    Sign up with Facebook
                  </button>

                  <button
                    type="button"
                    className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-black text-sm font-medium text-white hover:bg-gray-900"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    Sign up with Apple
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
        <div className="hidden md:block md:w-3/5 pl-10">
        <LogInSvg />

        </div>
      </div>
    </div>
  );
}