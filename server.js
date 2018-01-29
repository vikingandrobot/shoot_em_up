// Load environment variables
require('dotenv').load();

const express = require('express');
const routes = require('./routes/index.js');
const session = require('express-session');
const bodyParser = require('body-parser');

const port = process.env.PORT || 9090;

const app = express();

// Set view engine
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'this-is-a-secret-token',
  cookie: { maxAge: 3600000 },
  resave: false,
  saveUninitialized: true,
}));

// Set routes
app.use(routes);

// 404 Error
app.use((req, res) => res.render('404'));

// Error handler
// eslint-disable-next-line
app.use((err, req, res, next) => {
  const status = err.code || 500;
  res.status(status);

  if (status === 404) {
    return res.render('404');
  }

  // TODO : Log the error

  return res.render('error', {
    error: (app.get('env') === 'development') ? err : {},
  });
});

// Start the server
app.listen(port, () => {
});
