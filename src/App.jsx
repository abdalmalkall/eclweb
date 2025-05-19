import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './router';
import './index.css';
import { requestNotificationPermission, onForegroundMessage } from './firebase/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotificationProvider } from './contexts/TrainerNotificationContext';


const queryClient = new QueryClient();

function App() {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Request notification permission when the component mounts
    const requestPermission = async () => {
      await requestNotificationPermission();
    };

    requestPermission();

    // Set up foreground message handler
    const unsubscribe = onForegroundMessage((payload) => {
      // Show notification using toast or custom component
      toast.info(payload.notification.title, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
        data: payload.data
      });
    });

    // Clean up subscription when component unmounts
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div>جاري التحميل...</div>}>

          {/* Toast container for notifications */}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />

          {/* Custom notification component */}
          {notification && (
            <div className="notification-popup">
              <h3>{notification.title}</h3>
              <p>{notification.body}</p>
              <button onClick={() => setNotification(null)}>Close</button>
            </div>
          )}
          <NotificationProvider>
            <AppRoutes />
          </NotificationProvider>


        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
