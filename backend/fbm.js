var request = require('request');
var schedule = require('node-schedule');
var googleapis = require('googleapis');

var serviceAccount = require('./config/test-crm-7c4a2-firebase-adminsdk-ue506-a2a82657cf.json');

var scopes = [
  'https://www.googleapis.com/auth/firebase.messaging'
];

var accessToken = "";

var FBM = function() {}

var google = new googleapis.GoogleApis();

function getAccessToken() {
  var jwtClient = new google.auth.JWT(
    serviceAccount.client_email,
    null,
    serviceAccount.private_key,
    scopes,
    null
  );

  jwtClient.authorize(function(err, tokens) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("access_token: " + tokens.access_token);
    accessToken = tokens.access_token;
  });
}

// Schedule the access token refresh every 30 minutes
schedule.scheduleJob('*/30 * * * *', function() {
  getAccessToken();
});
getAccessToken();

FBM.prototype.send = function(msg, callback) {
  request.post({
    uri: 'https://fcm.googleapis.com/v1/projects/test-crm-7c4a2/messages:send',
    body: JSON.stringify(msg),
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    }
  }, function(err, response, body) {
    callback(err, response, body);
  });
}

FBM.prototype.subscribeToTopic = function(token, topic, callback) {
  var url = `https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`;
  request.post({
    uri: url,
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
      'access_token_auth': true
    }
  }, function(err, response, body) {
    callback(err, response, body);
  });
}

module.exports = FBM;
