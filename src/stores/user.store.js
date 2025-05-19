import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      
      setUserData: (userData) => {
        console.log('تعيين بيانات المستخدم:', userData);
        set({ user: userData });
      },
      
      clearUserData: () => {
        set({ user: null });
      },
      
      // وظيفة للحصول على اسم المستخدم أو أي معلومات أخرى
      getUserName: () => {
        const user = get().user;
        return user ? user.name : 'زائر';
      }
    }),
    {
      name: 'user-storage',  // اسم التخزين في localStorage
      partialize: (state) => ({ user: state.user }),  // تخزين فقط حقل المستخدم
    }
  )
);