// Load environment variables
require('dotenv').load();

const express = require('express');
const routes = require('./routes/index.js');
const session = require('express-session');
const bodyParser = require('body-parser');

const port = process.env.PORT || 9090;

const app = express();

// Expose public stuff
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use cookie for the sessions
app.use(session({
  secret: 'this-is-a-secret-token',
  cookie: { maxAge: 3600000 },
  resave: false,
  saveUninitialized: true,
}));

// Set view engine
app.set('view engine', 'ejs');

// Set routes
app.use(routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is ready on port ${port}`);
});
