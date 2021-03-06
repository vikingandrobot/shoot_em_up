const GitHubApi = require('@octokit/rest');
const request = require('request');
const router = require('express').Router();
const { MongoClient } = require('mongodb');


// Link for github oauth
const GITHUB_AUTHORIZE_LINK = `https://github.com/login/oauth/authorize?scope=repo&client_id=${process.env.GH_BASIC_CLIENT_ID}`;

// Link for github token
const GITHUB_ACCESS_TOKEN = 'https://github.com/login/oauth/access_token';


/*
 * Middleware route function
 *
 * Allow to check if the user is autenticated. If the user is not autenticated,
 * the server redirects to the home page.
 */
function isAutenticated(req, res, next) {
  // Check if the session is defined
  if (req.session.token !== undefined) {
    return next();
  }

  return res.redirect('/');
}


/*
 * HOMEPAGE ENDPOINT
 */
router.get('/', (req, res) => {
  if (req.session.token === undefined) {
    res.render('../views/index', {
      link: GITHUB_AUTHORIZE_LINK,
    });
    return;
  }

  const github = new GitHubApi();

  // Try to connect with the token
  github.authenticate({
    type: 'oauth',
    token: req.session.token,
  });

  github.users.get({
    // eslint-disable-next-line
  }, (err, r) => {
    if (err && err.code === 401) {
      req.session.token = undefined;

      res.render('../views/index', {
        link: GITHUB_AUTHORIZE_LINK,
      });
    } else {
      res.render('../views/index', { link: '/repos' });
    }
  });
});


/*
 * CALLBACK ENDPOINT FOR GITHUB
 */
router.get('/callback', (req, res, next) => {
  // Get github code check
  const { code } = req.query;

  // Redirects if the code is not valid
  if (code === undefined) {
    res.redirect('/');
    return;
  }

  // Send back the code check
  request.post({
    headers: { Accept: 'application/json' },
    url: GITHUB_ACCESS_TOKEN,
    body: {
      client_id: process.env.GH_BASIC_CLIENT_ID,
      client_secret: process.env.GH_BASIC_SECRET_ID,
      code,
    },
    json: true,
  }, (err, response, body) => {
    if (err) {
      next(err);
      return;
    }

    const token = body.access_token;

    // Redirects if the token is not valid
    if (token === undefined) {
      next(new Error(`Failed to get a token. Please check github client
        id and client secret`));
      return;
    }

    // Get the token and store in session
    req.session.token = body.access_token;

    // Redirect on the homepage
    res.redirect('/repos');
  });
});


/*
 * REPOS ENDPOINT
 */
router.get('/repos/:page(\\d+)?', isAutenticated, (req, res, next) => {
  // Get the token from the session
  const { token } = req.session;

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
    if (err) {
      next(err);
      return;
    }

    // Get the all the repositories
    let repositories = r.data;
    const { meta } = r;

    // Get the last page
    let lastPage = 1;

    if (meta) {
      const lastPageLink = meta.link.match(/page=(\d+)&.{11}; rel="last"/);
      if (lastPageLink) {
        lastPage = Number(lastPageLink[1]);
      } else {
        const prevPageLink = meta.link.match(/page=(\d+)&.{11}; rel="prev"/);
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
        if (error) {
          next(error);
          return;
        }

        repositories = result.data;
        process(repositories, currentPage, lastPage);
      });
    } else {
      process(repositories, currentPage, lastPage);
    }
  });
});


/*
 * PLAY ENDPOINT
 */
router.get('/play', isAutenticated, (req, res) => {
  res.render('../views/play');
});


/*
 * SKILLS ENDPOINT
 */
router.get('/skills/:owner/:repo', isAutenticated, (req, res, next) => {
  // Get the token from the session
  const { token } = req.session;

  const github = new GitHubApi();

  // Try to connect with the token
  github.authenticate({
    type: 'oauth',
    token,
  });

  const { owner } = req.params;
  const { repo } = req.params;

  // Get user data
  function getUser(object) {
    const result = object;

    return new Promise((resolve, reject) => {
      github.users.get({
      }, (err, r) => {
        if (err) {
          reject(err);
          return;
        }

        result.login = r.data.login;

        resolve(result);
      });
    });
  }

  // Get total commits for the specified repository and user
  function getTotalUserCommits(object) {
    const result = object;

    return new Promise((resolve, reject) => {
      github.repos.getCommits({
        owner,
        repo,
        author: result.login,
        page: 1,
        per_page: 1,
      }, (err, r) => {
        if (err) {
          return reject(err);
        }

        // Get response header
        let nbCommits = 0;

        if (r.meta && r.meta.link) {
          const lastPageLink = r.meta.link.match(/page=(\d+)&.{11}; rel="last"/);
          if (lastPageLink) {
            nbCommits = Number(lastPageLink[1]);
          }
        } else if (r.data && r.data.length >= 1) {
          nbCommits = 1;
        }

        result.nbTotalUserCommits = nbCommits;

        return resolve(result);
      });
    });
  }

  // Get total commits for the specified repository
  function getTotalCommits(object) {
    const result = object;

    return new Promise((resolve, reject) => {
      github.repos.getCommits({
        owner,
        repo,
        page: 1,
        per_page: 1,
      }, (err, r) => {
        if (err) {
          reject(err);
          return;
        }

        // Get response header
        let nbCommits = 0;

        if (r.meta && r.meta.link) {
          const lastPageLink = r.meta.link.match(/page=(\d+)&.{11}; rel="last"/);
          if (lastPageLink) {
            nbCommits = Number(lastPageLink[1]);
          }
        } else if (r.data && r.data.length >= 1) {
          nbCommits = 1;
        }

        result.nbTotalCommits = nbCommits;

        resolve(result);
      });
    });
  }

  // Get total contributors for the specified repository
  function getTotalContributors(object) {
    const result = object;

    return new Promise((resolve, reject) => {
      github.repos.getContributors({
        owner,
        repo,
        page: 1,
        per_page: 1,
      }, (err, r) => {
        if (err) {
          reject(err);
          return;
        }

        // Get response header
        let nbContributors = 0;

        if (r.meta && r.meta.link) {
          const lastPageLink = r.meta.link.match(/page=(\d+)&.{11}; rel="last"/);
          if (lastPageLink) {
            nbContributors = Number(lastPageLink[1]);
          }
        } else if (r.data && r.data.length >= 1) {
          nbContributors = 1;
        }

        result.nbTotalContributors = nbContributors;

        resolve(result);
      });
    });
  }

  const result = {};

  getUser(result)
    .then(getTotalUserCommits)
    .then(getTotalCommits)
    .then(getTotalContributors)
    .then((r) => {
      const data = {
        commitMean: r.nbTotalCommits / r.nbTotalContributors,
        level: `${r.nbTotalUserCommits / (r.nbTotalCommits / r.nbTotalContributors)}`,
      };
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
});


/*
 * SCORE ENDPOINT
 */
router.post('/score/:owner/:repo', isAutenticated, (req, res, next) => {
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
    if (err) {
      next(err);
      return;
    }

    const { login } = r.data;

    // Get the URI for mongodb
    const url = process.env.MONGO_URI;

    // Use connect method to connect to the server
    MongoClient.connect(url, (errDB, database) => {
      if (errDB) {
        next(errDB);
        return;
      }

      const db = database.db('shoot_em_hub');

      const { owner } = req.params;
      const { repo } = req.params;
      const { score } = req.body;

      const json = {
        owner,
        repo,
        user: login,
        score: Number(score),
      };

      const collection = db.collection('scores');
      collection.insertOne(json);

      database.close();

      res.sendStatus(200);
    });
  });
});


/*
 * SCORE ENDPOINT
 */
router.get('/score/:owner/:repo', isAutenticated, (req, res, next) => {
  // Get the URI for mongodb
  const url = process.env.MONGO_URI;

  // Use connect method to connect to the server
  MongoClient.connect(url, (err, database) => {
    if (err) {
      next(err);
      return;
    }

    const db = database.db('shoot_em_hub');

    const { owner } = req.params;
    const { repo } = req.params;

    const collection = db.collection('scores');
    collection
      .find({ repo, owner })
      .project({ repo: 0, owner: 0, _id: 0 })
      .sort({ score: -1 })
      .limit(15)
      .toArray((e, scores) => {
        database.close();
        res.render('../views/score', { repo: `${owner}/${repo}`, scores });
      });
  });
});

module.exports = router;
