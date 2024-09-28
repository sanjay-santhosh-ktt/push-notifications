// Import and configure Firebase
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
  firebase.initializeApp(firebaseConfig);
  
  const messaging = firebase.messaging();