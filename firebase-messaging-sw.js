// Import Firebase scripts using compat versions
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Your Firebase configuration
const firebaseConfig = {
    //add there
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
