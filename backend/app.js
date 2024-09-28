const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const FBM = require('./fbm');

// Create an instance of an Express application
const app = express();
const fbm = new FBM();

// Middleware to log HTTP requests
app.use(morgan('combined'));

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define a basic route that sends a response
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Define a POST route to send notifications
app.post('/send', (req, res) => {
  const message = req.body;
  fbm.send(message, (err, response, body) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(body);
  });
});

// Define a POST route to subscribe to a topic
app.post('/subscribe', (req, res) => {
  const { token, topic } = req.body;
  fbm.subscribeToTopic(token, topic, (err, response) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(response);
  });
});

// Start the server and listen on a specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});