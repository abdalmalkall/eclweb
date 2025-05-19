import React from 'react';
import { useNotification } from '@/contexts/NotificationContext';
import { Bell, BellOff, AlertTriangle, CheckCircle } from 'lucide-react';

const NotificationSettings = () => {
  const { 
    notificationPermission, 
    requestPermission,
    fcmToken 
  } = useNotification();

  const handleRequestPermission = async () => {
    const result = await requestPermission();
    if (result) {
      // Show success message or redirect
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <Bell className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-2xl font-semibold text-gray-800">Notification Settings</h1>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Push Notification Status</h2>
          
          {notificationPermission === 'granted' ? (
            <div className="flex items-center p-4 bg-green-50 border border-green-100 rounded-md">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
              <div>
                <p className="font-medium text-green-700">Notifications are enabled</p>
                <p className="text-sm text-green-600">You will receive real-time notifications when there are updates.</p>
              </div>
            </div>
          ) : notificationPermission === 'denied' ? (
            <div className="flex items-center p-4 bg-red-50 border border-red-100 rounded-md">
              <BellOff className="w-6 h-6 text-red-500 mr-3" />
              <div>
                <p className="font-medium text-red-700">Notifications are blocked</p>
                <p className="text-sm text-red-600">
                  Please enable notifications in your browser settings to receive updates.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center p-4 bg-yellow-50 border border-yellow-100 rounded-md">
              <AlertTriangle className="w-6 h-6 text-yellow-500 mr-3" />
              <div>
                <p className="font-medium text-yellow-700">Notifications not enabled</p>
                <p className="text-sm text-yellow-600 mb-3">
                  Enable notifications to receive real-time updates about your courses.
                </p>
                <button
                  onClick={handleRequestPermission}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Enable Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {fcmToken && (
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-700 mb-2">Device Registration</h2>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
              <p className="text-sm text-gray-600 mb-2">Your device is registered to receive notifications.</p>
              <div className="flex items-center">
                <div className="bg-gray-100 rounded px-3 py-2 text-xs font-mono text-gray-600 flex-1 truncate">
                  {fcmToken.substring(0, 20)}...{fcmToken.substring(fcmToken.length - 20)}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 pt-6 mt-6">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Notification Preferences</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800">Enrollment Requests</h3>
                <p className="text-sm text-gray-500">Notifications for new enrollment requests</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800">Course Updates</h3>
                <p className="text-sm text-gray-500">Notifications for course content updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800">Course Completion</h3>
                <p className="text-sm text-gray-500">Notifications when students complete courses</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;