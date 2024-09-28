// Import Firebase scripts using compat versions
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

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log('Received background message ', payload);
    const notificationTitle = payload.notification.title || "Default Title";
    const notificationOptions = {
        body: payload.notification.body || "Default Body",
        icon: 'images/icon.png' // Optional: Set an icon for the notification
    };

    // Show the notification
    self.registration.showNotification(notificationTitle, notificationOptions);
});
