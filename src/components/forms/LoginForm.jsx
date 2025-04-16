import { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth.store';
import { useUserStore } from '@/stores/user.store';

// دالة تطبيع البيانات القادمة من API
const normalizeApiResponse = (responseData) => {
  if (!responseData || !responseData.data) {
    return {
      userData: null,
      token: null,
      isSuccess: false
    };
  }

  return {
    userData: responseData.data.user ? {
      id: responseData.data.user.id || null,
      name: responseData.data.user.name || '',
      email: responseData.data.user.email || '',
      role: responseData.data.user.role || 'user',
      isVerified: !!responseData.data.user.email_verified_at,
    } : null,
    token: responseData.data.access_token || null,
    isSuccess: true
  };
};

export default function LoginForm() {
  // حالة النموذج
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  // أخطاء التحقق من صحة النموذج
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  
  // حالة نجاح تسجيل الدخول
  const [loginSuccess, setLoginSuccess] = useState(false);
  
  // الحصول على وظائف متجر الحالة
  const setAuth = useAuthStore((state) => state.setAuth);
  const setUserData = useUserStore((state) => state.setUserData);
  
  // استخدام React Query للتعامل مع طلب تسجيل الدخول
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const response = await axios.post('http://127.0.0.1:8000/api/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('✅ بيانات الاستجابة الأصلية:', data);
      
      // تطبيع البيانات
      const normalizedData = normalizeApiResponse(data);
      console.log('✅ البيانات بعد التطبيع:', normalizedData);
    
      // استخدام البيانات المطبعة
      if (normalizedData.isSuccess) {
        // تعيين حالة المصادقة أولاً
        setAuth(true);
        
        // تعيين التوكن
        if (normalizedData.token) {
          // استخدم الوظيفة الجديدة setToken
          useAuthStore.getState().setToken(normalizedData.token);
        }
        
        // تعيين بيانات المستخدم
        setUserData(normalizedData.userData);
        
    setLoginSuccess(true);
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
    
    // التحقق من البريد الإلكتروني
    if (!formData.email) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'الرجاء إدخال بريد إلكتروني صالح';
      isValid = false;
    }
    
    // التحقق من كلمة المرور
    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'كلمة المرور يجب أن تكون على الأقل 6 أحرف';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // التعامل مع إرسال النموذج
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // إرسال بيانات الاعتماد
      loginMutation.mutate({
        email: formData.email,
        password: formData.password
      });
    }
  };
  
  // التعامل مع "تذكرني"
  const [rememberMe, setRememberMe] = useState(false);
  
  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
    
    // يمكنك تخزين حالة "تذكرني" في localStorage
    if (e.target.checked) {
      localStorage.setItem('rememberMe', 'true');
      localStorage.setItem('savedEmail', formData.email);
    } else {
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('savedEmail');
    }
  };
  
  // استرجاع البريد الإلكتروني المحفوظ عند تحميل المكون
  useState(() => {
    const rememberedUser = localStorage.getItem('rememberMe') === 'true';
    const savedEmail = localStorage.getItem('savedEmail') || '';
    
    if (rememberedUser && savedEmail) {
      setRememberMe(true);
      setFormData(prev => ({ ...prev, email: savedEmail }));
    }
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md" dir="rtl">
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
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">تسجيل الدخول إلى حسابك</h2>
              <p className="mt-2 text-sm text-gray-600">
                أو{" "}
                <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                  إنشاء حساب جديد
                </a>
              </p>
            </div>
            
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm space-y-4">
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
                    autoComplete="current-password"
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
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                  <label htmlFor="remember-me" className="mr-2 block text-sm text-gray-900">
                    تذكرني
                  </label>
                </div>
                
                <div className="text-sm">
                  <a href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                    نسيت كلمة المرور؟
                  </a>
                </div>
              </div>
              
              {/* رسالة خطأ API */}
              {loginMutation.isError && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="mr-3">
                      <h3 className="text-sm font-medium text-red-800">
                        {loginMutation.error?.response?.data?.message || 'البريد الإلكتروني أو كلمة المرور غير صحيحة'}
                      </h3>
                    </div>
                  </div>
                </div>
              )}
              
              <div>
                <button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                    loginMutation.isPending ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  {loginMutation.isPending ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                </button>
              </div>
              
              {/* خيارات تسجيل الدخول البديلة */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">أو استمر باستخدام</span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div>
                    <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">تسجيل الدخول بواسطة Google</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.787-1.676-4.139-2.701-6.735-2.701-5.522 0-10.001 4.478-10.001 10s4.478 10 10.001 10c8.396 0 10.249-7.85 9.426-11.748l-9.426 0.081z" />
                      </svg>
                    </a>
                  </div>
                  
                  <div>
                    <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">تسجيل الدخول بواسطة Facebook</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                  
                  <div>
                    <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">تسجيل الدخول بواسطة Twitter</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}