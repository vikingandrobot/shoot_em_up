
const express = require('express');
const routes = require('./routes/index.js');
const port = process.env.PORT || 9090;

const app = express();

// Expose public stuff
app.use(express.static('public'));

// Set view engine
app.set('view engine', 'ejs');

// Set routes
app.use(routes);

// Start the server
app.listen(port, () => {
  console.log('Server is ready on port ' + port);
});
