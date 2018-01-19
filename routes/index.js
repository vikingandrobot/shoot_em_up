const GitHubApi = require('github');
const request = require('request');
const router = require('express').Router();

router.get('/', (req, res) => {
  // Check if the session is defined
  if(req.session.token === undefined) {
    res.render('../views/index', {
      link: 'https://github.com/login/oauth/authorize?scope=user:email&client_id=' + 
              process.env.GH_BASIC_CLIENT_ID
    });
    return;
  }

  // Get the token from the session
  const token = req.session.token;

  const github = new GitHubApi();

  // Try to connect with the token
  github.authenticate({
    type: 'oauth',
    token: token
  });

  github.users.get({
  }, (err, r) => {
    
    if(err && err.code === 401) {
      res.render('../views/index', {
        link: 'https://github.com/login/oauth/authorize?scope=user:email&client_id=' + 
                process.env.GH_BASIC_CLIENT_ID
      });
    }
    else {
      res.render('../views/index', {link: '/repos'}); 
    }
  });  
});

router.get('/callback', (req, res) => {
  // Get github code check
  const code = req.query.code;

  // Send back the code check
  request.post({
    headers: {'Accept':'application/json'},
    url: 'https://github.com/login/oauth/access_token',
    body: {
      client_id: process.env.GH_BASIC_CLIENT_ID,
      client_secret: process.env.GH_BASIC_SECRET_ID,
      code: code,
    },
    json: true
  }, (err, response, body) => {
    if(err) throw err;

    // Get the token and store in session
    req.session.token = body.access_token;

    // Redirect on the homepage
    res.redirect('/repos');
  });
});

router.get('/repos', (req, res) => {
  res.render('../views/repos');
});

router.get('/play', (req, res) => {
  res.render('../views/play');
});

module.exports = router;
