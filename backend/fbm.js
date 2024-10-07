var admin = require('firebase-admin');

var serviceAccount = require(__dirname + '/atrack-d82d0-firebase-adminsdk-76mqd-739a9e4f67.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

var FBM = function() {};
FBM.prototype.send = function(msg, callback) {
  admin.messaging().send(msg)
    .then(function(response) {
      console.log('Successfully sent message:', response);
      callback(null, response);
    })
    .catch(function(error) {
      console.error('Error sending message:', error);
      callback(error, null);
    });
};

FBM.prototype.subscribeToTopic = function(token, topic, callback) {
  console.log(token,topic);
  admin.messaging().subscribeToTopic(token, topic)
    .then(function(response) {
      console.log('Successfully subscribed to topic:', response);
      callback(null, response);
    })  
    .catch(function(error) {
      console.error('Error subscribing to topic:', error);
      callback(error, null);
    });
};

FBM.prototype.unsubscribeFromTopic = function(token, topic, callback) {
  admin.messaging().unsubscribeFromTopic(token, topic)
    .then(function(response) {
      console.log('Successfully unsubscribed from topic:', response);
      callback(null, response);
    })
    .catch(function(error) {
      console.error('Error unsubscribing from topic:', error);
      callback(error, null);
    });
};

module.exports = FBM;
