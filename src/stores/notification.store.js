/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import axios from 'axios';

export const useNotificationStore = create((set, get) => ({
    notifications: [],
    unreadCount: 0,
    isLoading: false,
    error: null,
    connectionStatus: 'disconnected',
    
    // جلب الإشعارات من الخادم
    fetchNotifications: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get('/api/notifications');
            const notifications = response.data.notifications;
            
            set({ 
                notifications,
                unreadCount: notifications.filter(n => !n.read_at).length,
                isLoading: false
            });
        } catch (error) {
            console.error('Error fetching notifications:', error);
            set({ 
                error: 'فشل في جلب الإشعارات',
                isLoading: false
            });
        }
    },
    
 

}));