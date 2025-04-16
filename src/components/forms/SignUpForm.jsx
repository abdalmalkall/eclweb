import { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/auth.store';
import { useUserStore } from '../../stores/user.store';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        {signupSuccess ? (
          <div className="text-center">
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">تم التسجيل بنجاح!</h2>
            <p className="text-gray-600">شكراً للتسجيل. يمكنك الآن تسجيل الدخول باستخدام بيانات الاعتماد الخاصة بك.</p>
            <button 
              className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                // في تطبيق حقيقي، إعادة التوجيه إلى صفحة تسجيل الدخول
                window.location.href = '/login';
              }}>
              الذهاب إلى تسجيل الدخول
            </button>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">إنشاء حساب</h2>
              <p className="mt-2 text-sm text-gray-600">
                هل لديك حساب بالفعل؟{" "}
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  تسجيل الدخول
                </a>
              </p>
            </div>
            
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm space-y-4">
                {/* الاسم الكامل */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    الاسم الكامل
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="محمد أحمد"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && (
                    <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>
                  )}
                </div>
                
                {/* البريد الإلكتروني */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    البريد الإلكتروني
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="your-email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
                
                {/* كلمة المرور */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    كلمة المرور
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>
                
                {/* تأكيد كلمة المرور */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    تأكيد كلمة المرور
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="••••••••"
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
                  className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                    signupMutation.isPending ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {signupMutation.isPending ? 'جاري التسجيل...' : 'التسجيل'}
                </button>
              </div>
              
              <div className="text-sm text-center">
                <p className="text-gray-500">
                  بالتسجيل، أنت توافق على{" "}
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    شروط الخدمة
                  </a>{" "}
                  و{" "}
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    سياسة الخصوصية
                  </a>
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}