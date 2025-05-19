// src/components/TrainerNotification.jsx

import React, { useEffect } from 'react';
import { Bell, X, Check } from 'lucide-react';

const TrainerNotification = ({ notification, onClose }) => {
  if (!notification) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // Auto close notification after 5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification, onClose]);

  const handleAction = () => {
    // Handle action based on notification data
    if (notification.data && notification.data.click_action) {
      window.location.href = `/${notification.data.click_action.toLowerCase()}`;
    }
    onClose();
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md w-full animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="flex items-center justify-between p-4 bg-blue-50 border-b border-blue-100">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 mr-3">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-800">{notification.title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Close notification"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4">
          <p className="text-gray-600">{notification.body}</p>
        </div>
        
        <div className="flex justify-end p-3 bg-gray-50 border-t border-gray-100">
          <button
            onClick={handleAction}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Check className="w-4 h-4 mr-2" />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainerNotification;