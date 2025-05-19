// import Echo from 'laravel-echo';
// import Pusher from 'pusher-js';

// window.Pusher = Pusher;

// // تكوين Echo مع مفاتيح Pusher
// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: "0fbb8173172e153f57c2",
//     cluster: "ap2",
//     // wsHost: import.meta.env.VITE_PUSHER_HOST,
//     wsPort: import.meta.env.VITE_PUSHER_PORT || 443,
//     wssPort: import.meta.env.VITE_PUSHER_PORT || 443,
//     forceTLS: (import.meta.env.VITE_PUSHER_SCHEME || 'https') === 'https',
//     enabledTransports: ['ws', 'wss'],
//     disableStats: true,
//     authEndpoint: 'http://127.0.0.1:8000/api/broadcasting/auth',  
//     auth: {
//         headers: {
//             'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
//             'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
//         }
//     }
// });

// // تصدير Echo للاستخدام في المكونات
// export default window.Echo;