
import React, { createContext, useState, useContext, useEffect } from 'react';
import { requestNotificationPermission, onForegroundMessage } from '@/firebase/firebase';
import Notification from '@/components/TrainerNotification';

const TrainerNotificationContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => useContext(TrainerNotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [fcmToken, setFcmToken] = useState(null);
  const [notificationPermission, setNotificationPermission] = useState('default');

  useEffect(() => {
    // Check permission status on mount
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }

    // Request notification permission when the component mounts
    const initializeNotifications = async () => {
      try {
        const token = await requestNotificationPermission();
        if (token) {
          setFcmToken(token);
          setNotificationPermission('granted');
        } else {
          console.log('No FCM token available');
          setNotificationPermission(Notification.permission);
        }
      } catch (error) {
        console.error('Error initializing notifications:', error);
      }
    };
    
    initializeNotifications();
    
    // Set up foreground message handler
    const unsubscribe = onForegroundMessage((payload) => {
      console.log('Received foreground notification:', payload);
      
      // Extract notification data
      const notificationData = {
        title: payload.notification?.title || 'New Notification',
        body: payload.notification?.body || '',
        data: payload.data || {}
      };
      
      setNotification(notificationData);
    });
    
    // Clean up subscription when component unmounts
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const requestPermission = async () => {
    const token = await requestNotificationPermission();
    if (token) {
      setFcmToken(token);
      setNotificationPermission('granted');
      return true;
    }
    setNotificationPermission(Notification.permission);
    return false;
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const value = {
    notification,
    fcmToken,
    notificationPermission,
    requestPermission,
    closeNotification
  };

  return (
    <TrainerNotificationContext.Provider value={value}>
      {children}
      {notification && (
        <Notification 
          notification={notification} 
          onClose={closeNotification} 
        />
      )}
    </TrainerNotificationContext.Provider>
  );
};

export default TrainerNotificationContext;