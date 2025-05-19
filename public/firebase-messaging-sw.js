// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.19.1/firebase-app-compat.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.19.1/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// eslint-disable-next-line no-undef
firebase.initializeApp({
    apiKey: "AIzaSyCJ6zTqSBhomF_S9zlYalXidjzb2R4tDbI",
    authDomain: "laravel-rel-77813.firebaseapp.com",
    projectId: "laravel-rel-77813",
    storageBucket: "laravel-rel-77813.firebasestorage.app",
    messagingSenderId: "939568267551",
    appId: "1:939568267551:web:8d4a7f10ac7cc24a18b02a",
    measurementId: "G-C2F80FMTRS"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Background message received:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png',
    data: payload.data
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    // eslint-disable-next-line no-undef
    clients.matchAll({
      type: 'window'
    })
    .then((clientList) => {
      const clickAction = event.notification.data.click_action;
      const url = clickAction ? `/${clickAction.toLowerCase()}` : '/';
      
      for (const client of clientList) {
        if (client.url === url && 'focus' in client)
          return client.focus();
      }
      
      // eslint-disable-next-line no-undef
      if (clients.openWindow) {
        // eslint-disable-next-line no-undef
        return clients.openWindow(url);
      }
    })
  );
});