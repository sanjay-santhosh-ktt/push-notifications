importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBhxlDm_wTd3qATOIrzPYroZNEFQdWni10",
    authDomain: "test-crm-7c4a2.firebaseapp.com",
    databaseURL: "https://test-crm-7c4a2-default-rtdb.firebaseio.com",
    projectId: "test-crm-7c4a2",
    storageBucket: "test-crm-7c4a2.appspot.com",
    messagingSenderId: "858406026815",
    appId: "1:858406026815:web:e7b6e54b894fbb94c3c28a",
    measurementId: "G-2P7YZ36G8H"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Listen for background messages
messaging.onBackgroundMessage((payload) => {
  
    const notificationTitle = payload.notification?.title || payload.data.title || "Default Title";
    const notificationOptions = {
        body: payload.notification?.body || payload.data.body || "Default Body",
        icon: payload.notification?.icon || payload.data.icon || 'https://cdn-icons-png.flaticon.com/128/17858/17858469.png',
        data: { url: payload.data.click_action || 'https://app.ktt.io' }
    };

    // Show the custom notification
    self.registration.showNotification(notificationTitle, notificationOptions);
});

// // Handle notification clicks
// self.addEventListener('notificationclick', (event) => {
//     event.notification.close();  // Close the notification
//     event.waitUntil(
//         clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
//             for (let client of clientList) {
//                 if (client.url === event.notification.data.url && 'focus' in client) {
//                     return client.focus();
//                 }
//             }
//             if (clients.openWindow) {
//                 return clients.openWindow(event.notification.data.url);
//             }
//         })
//     );
// });
