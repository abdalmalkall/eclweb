import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { useUserStore } from './user.store';

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      
      setAuth: (value) => set({ isAuthenticated: value }),
      
      setToken: (token) => {
        set({ token });
        
        if (token) {
          localStorage.setItem('authToken', token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
          localStorage.removeItem('authToken');
          delete axios.defaults.headers.common['Authorization'];
        }
      },
      
      logout: () => {
        // مسح الرمز المميز من التخزين المحلي
        localStorage.removeItem('authToken');
        
        // إزالة رأس التفويض الافتراضي من axios
        delete axios.defaults.headers.common['Authorization'];
        
        // تعيين حالة المصادقة إلى false
        set({ isAuthenticated: false, token: null });
        
        // مسح بيانات المستخدم من متجر المستخدم
        useUserStore.getState().clearUserData();
      },
      
      // استرجاع توكن المصادقة عند تحميل التطبيق
      initializeAuth: () => {
        const token = localStorage.getItem('authToken');
        if (token) {
          set({ isAuthenticated: true, token });
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // يمكنك هنا إضافة طلب للتحقق من صحة التوكن إذا أردت
        }
      }
    }),
    {
      name: 'auth-storage',  // اسم التخزين في localStorage
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated, token: state.token }),  // تخزين فقط هذه الحقول
    }
  )
);