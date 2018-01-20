const GitHubApi = require('github');
const request = require('request');
const router = require('express').Router();

router.get('/', (req, res) => {
  // Check if the session is defined
  if (req.session.token === undefined) {
    res.render('../views/index', {
      link: `https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.GH_BASIC_CLIENT_ID}`,
    });
    return;
  }

  // Get the token from the session
  const { token } = req.session;

  const github = new GitHubApi();

  // Try to connect with the token
  github.authenticate({
    type: 'oauth',
    token,
  });

  github.users.get({
  }, (err, r) => {
    if (err && err.code === 401) {
      res.render('../views/index', {
        link: `https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.GH_BASIC_CLIENT_ID}`,
      });
    } else {
      res.render('../views/index', { link: '/repos' });
    }
  });
});

router.get('/callback', (req, res) => {
  // Get github code check
  const { code } = req.query;

  // Send back the code check
  request.post({
    headers: { Accept: 'application/json' },
    url: 'https://github.com/login/oauth/access_token',
    body: {
      client_id: process.env.GH_BASIC_CLIENT_ID,
      client_secret: process.env.GH_BASIC_SECRET_ID,
      code,
    },
    json: true,
  }, (err, response, body) => {
    if (err) throw err;

    // Get the token and store in session
    req.session.token = body.access_token;

    // Redirect on the homepage
    res.redirect('/repos');
  });
});

router.get('/repos/:page(\\d+)?', (req, res) => {
  // Get the token from the session
  const { token } = req.session;

  // Check if the session is defined
  if (token === undefined) {
    res.redirect('/');
    return;
  }

  const github = new GitHubApi();

  // Try to connect with the token
  github.authenticate({
    type: 'oauth',
    token,
  });

  // Get the current page
  let currentPage = Number(req.params.page) || 1;

  // Request all the repositories of the user
  github.repos.getAll({
    page: currentPage,
    per_page: 5,
  }, (err, r) => {
    if (err) throw err;

    // Get the all the repositories
    let repositories = r.data;
    const { meta } = r;

    // Get the last page
    let lastPage = 1;

    if (meta) {
      const lastPageLink = meta.link.match(/page=(\d+)&.{65}; rel="last"/);
      if (lastPageLink) {
        lastPage = Number(lastPageLink[1]);
      } else {
        const prevPageLink = meta.link.match(/page=(\d+)&.{65}; rel="prev"/);
        if (prevPageLink) {
          lastPage = Number(prevPageLink[1]) + 1;
        }
      }
    }

    // Output necessary data
    const process = (repos, page, last) => {
      // For each repo get the id and name
      const result = [];

      for (let i = 0; i < repos.length; i += 1) {
        result[i] = {
          id: repos[i].id,
          name: repos[i].name,
          full_name: repos[i].full_name,
        };
      }

      res.render('../views/repos', {
        repos: result,
        current: page,
        pages: last,
      });
    };

    // If the current page is greater than the last page
    if (currentPage > lastPage) {
      currentPage = lastPage;

      github.repos.getAll({
        page: currentPage,
        per_page: 5,
      }, (error, result) => {
        repositories = result.data;
        process(repositories, currentPage, lastPage);
      });
    } else {
      process(repositories, currentPage, lastPage);
    }
  });
});

router.get('/play', (req, res) => {
  res.render('../views/play');
});

module.exports = router;
