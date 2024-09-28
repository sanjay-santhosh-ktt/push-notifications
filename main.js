import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getMessaging, getToken } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js';

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
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Check if the browser supports service workers
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js') // Register service worker
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
} else {
    console.error('Service Workers are not supported in this browser.');
}

document.getElementById('subscribe').addEventListener('click', requestNotificationPermission);

function requestNotificationPermission() {
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            // Get the token after permission is granted
            getToken(messaging, { vapidKey: 'BNpJPurZEMYuH4qnlbKV3PQSX2ur8qJ8SN7OwXI6IJPvbqTEOcH5ecShd2V-qnA_2DPc_dIC2fUFEcp-99OpOuI' }) // Replace with your VAPID key
                .then((token) => {
                    console.log('FCM Token:', token);
                    // Send the token to your server
                    sendTokenToServer(token);
                })
                .catch((err) => {
                    console.error('Unable to retrieve token. ', err);
                });
        } else {
            console.error('Unable to get permission to notify.');
        }
    }).catch((err) => {
        console.error('Error requesting notification permission.', err);
    });
}

function sendTokenToServer(token) {
    fetch('http://localhost:3000/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: token, topic: 'sanjay' }) // Replace 'your-topic-name' with the actual topic name
    })
    .then(response => response.json())
    .then(data => {
        console.log('Token sent to server:', data);
    })
    .catch((error) => {
        console.error('Error sending token to server:', error);
    });
}
