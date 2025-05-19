import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';
import { useUserStore } from '@/stores/user.store';

/**
 * تطبيع بيانات المستخدم
 * تضمن أن بيانات المستخدم تتبع نفس الهيكل المتوقع في كل مكان
 */
export const normalizeUserData = (userData) => {
    if (!userData) return null;
    
    return {
        id: userData.id || null,
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || 'user',
        avatar: userData.avatar || null,
        isVerified: !!userData.email_verified_at,
        permissions: Array.isArray(userData.permissions) ? userData.permissions : [],
        settings: userData.settings || {},
        createdAt: userData.created_at || null,
        updatedAt: userData.updated_at || null,
        // يمكنك إضافة المزيد من الحقول حسب حاجة التطبيق
    };
};

/**
 * تطبيع استجابة تسجيل الدخول
 * تعيد هيكل موحد لبيانات تسجيل الدخول
 */
export const normalizeLoginResponse = (responseData) => {
    if (!responseData) {
        return {
            userData: null,
            token: null,
            isSuccess: false
        };
    }

    // التعامل مع هياكل الاستجابة المختلفة
    const userData = responseData.user || (responseData.data && responseData.data.user);
    const token = responseData.access_token || (responseData.data && responseData.data.access_token);

    return {
        userData: userData ? normalizeUserData(userData) : null,
        token: token || null,
        isSuccess: !!(userData && token)
    };
};

/**
 * تعيين توكن المصادقة
 * تستخدم بعد تسجيل الدخول بنجاح
 */
export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('authToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        localStorage.removeItem('authToken');
        delete axios.defaults.headers.common['Authorization'];
    }
};

/**
 * تهيئة التطبيق
 * تستدعى عند بدء تشغيل التطبيق لاستعادة حالة المصادقة وبيانات المستخدم
 */
export const initializeApp = async () => {
    console.log('بدء تهيئة التطبيق...');
    
    try {
        // التحقق مما إذا كان المستخدم قد سجل الدخول بالفعل
        const token = localStorage.getItem('authToken');
        
        if (!token) {
            console.log('لم يتم العثور على توكن المصادقة');
            return false;
        }
        
        console.log('تم العثور على توكن المصادقة، جاري التحقق من صحته...');
        
        // تعيين توكن المصادقة في رؤوس الطلبات
        setAuthToken(token);
        
        // استرجاع بيانات المستخدم
        const userData = await fetchUserData();
        
        if (userData) {
            console.log('تم تهيئة التطبيق بنجاح');
            return true;
        } else {
            console.log('فشل في استرجاع بيانات المستخدم');
            useAuthStore.getState().logout();
            return false;
        }
    } catch (error) {
        console.error('خطأ أثناء تهيئة التطبيق:', error);
        useAuthStore.getState().logout();
        return false;
    }
};

/**
 * استرجاع بيانات المستخدم من API
 * يمكن استدعاؤها بشكل منفصل عند الحاجة لتحديث بيانات المستخدم
 */
export const fetchUserData = async () => {
    try {
        console.log('جاري استرجاع بيانات المستخدم من API...');
        
        const response = await axios.get('http://127.0.0.1:8000/api/user');
        
        if (response.data && response.data.data) {
            // تطبيع البيانات قبل تخزينها
            const normalizedUserData = normalizeUserData(response.data.data);
            
            // تعيين حالة المصادقة
            useAuthStore.getState().setAuth(true);
            
            // تعيين بيانات المستخدم
            useUserStore.getState().setUserData(normalizedUserData);
            
            console.log('تم استرجاع بيانات المستخدم بنجاح:', normalizedUserData);
            return normalizedUserData;
        }
        
        throw new Error('بيانات المستخدم غير صالحة');
    } catch (error) {
        console.error('خطأ أثناء استرجاع بيانات المستخدم:', error);
        throw error;
    }
};

/**
 * استدعاء عند تسجيل الخروج
 */
export const handleLogout = async () => {
    try {
        // يمكنك إضافة طلب API لتسجيل الخروج من الخادم إذا لزم الأمر
        await axios.post('http://127.0.0.1:8000/api/logout');
        
        // استدعاء وظيفة تسجيل الخروج من المتجر
        useAuthStore.getState().logout();
        
        console.log('تم تسجيل الخروج بنجاح');
        return true;
    } catch (error) {
        console.error('خطأ أثناء تسجيل الخروج:', error);
        
        // حتى في حالة حدوث خطأ، قم بتنظيف بيانات الجلسة المحلية
        useAuthStore.getState().logout();
        
        return false;
    }
};

/**
 * التحقق من حالة المصادقة
 * تستخدم للتحقق من صحة الجلسة الحالية
 */
export const checkAuthStatus = () => {
    const token = localStorage.getItem('authToken');
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    const user = useUserStore.getState().user;
    
    return {
        hasToken: !!token,
        isAuthenticated,
        hasUserData: !!user,
        isValid: isAuthenticated && !!user && !!token
    };
};

/**
 * تهيئة رؤوس الطلبات الافتراضية
 */
export const setupAxiosDefaults = () => {
    // تعيين URL الأساسي
    axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
    
    // تعيين رؤوس الطلبات الافتراضية
    axios.defaults.headers.common['Accept'] = 'application/json';
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    
    // إضافة توكن المصادقة إذا كان موجودًا
    const token = localStorage.getItem('authToken');
    if (token) {
        setAuthToken(token);
    }
    
    // اعتراض الاستجابات للتعامل مع أخطاء المصادقة
    axios.interceptors.response.use(
        response => response,
        error => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                console.log('خطأ في المصادقة، جاري تسجيل الخروج...');
                useAuthStore.getState().logout();
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    );
};

// تصدير وظيفة واحدة لتهيئة كل شيء
export const setupApplication = async () => {
    setupAxiosDefaults();
    return await initializeApp();
};

// تصدير الوظائف للاستخدام في أجزاء أخرى من التطبيق
export default {
    initializeApp,
    fetchUserData,
    normalizeUserData,
    setAuthToken,
    normalizeLoginResponse,
    handleLogout,
    checkAuthStatus,
    setupAxiosDefaults,
    setupApplication
};