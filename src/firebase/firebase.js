import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import axiosInstance from '@/api/axiosConfig';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJ6zTqSBhomF_S9zlYalXidjzb2R4tDbI",
  authDomain: "laravel-rel-77813.firebaseapp.com",
  projectId: "laravel-rel-77813",
  storageBucket: "laravel-rel-77813.firebasestorage.app",
  messagingSenderId: "939568267551",
  appId: "1:939568267551:web:8d4a7f10ac7cc24a18b02a",
  measurementId: "G-C2F80FMTRS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Function to request notification permission
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      return await getFirebaseToken();
    } else {
      console.log('Notification permission denied');
      return null;
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return null;
  }
};

// Get Firebase messaging token
export const getFirebaseToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "BNxY4Ad0i5mgFhL0el-wDUDnxiWl0FNC-ztbvg6eTarZ36NRtxUnCwsQfTMND74V2Jp2Yu5SyDu2RuIiY9qdBOU"
    });
    
    if (token) {
      console.log('FCM Token:', token);
      // Send token to backend
      await sendTokenToServer(token);
      return token;
    } else {
      console.log('No registration token available');
      return null;
    }
  } catch (error) {
    console.error('Error getting Firebase token:', error);
    return null;
  }
};

// Send FCM token to server
const sendTokenToServer = async (token) => {
  try {
    const response = await axiosInstance.post('/fcm-token', { token });

    console.log('Token sent to server:', response.data);
  } catch (error) {
    console.error('Error sending token to server:', error);
  }
};

// Handle foreground messages
export const onForegroundMessage = (callback) => {
  return onMessage(messaging, (payload) => {
    console.log('Message received in foreground:', payload);
    callback(payload);
  });
};

export default messaging;