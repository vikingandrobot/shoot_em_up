const GitHubApi = require('github');
const request = require('request');
const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('../views/index', {clientId: process.env.GH_BASIC_CLIENT_ID});
});

router.get('/callback', (req, res) => {

  // Get github code check
  const code = req.query.code;

  const data = {
    client_id: process.env.GH_BASIC_CLIENT_ID,
    client_secret: process.env.GH_BASIC_SECRET_ID,
    code: code,
  };

  // Send back the code check
  request.post({
    headers: {'Accept':'application/json'},
    url: 'https://github.com/login/oauth/access_token',
    body: data,
    json: true
  }, (err, res, body) => {

    // Get the token and store in session
    req.session.token = body.access_token;
  });

  res.redirect('/');
});

module.exports = router;
