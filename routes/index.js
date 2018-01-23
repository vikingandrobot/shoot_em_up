const GitHubApi = require('github');
const request = require('request');
const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;

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

router.get('/skills/:owner/:repo', (req, res) => {
  // Check if the session is defined
  if (req.session.token === undefined) {
    res.status(401).send("Sorry need to be authenticated!");
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

  const owner = req.params.owner;
  const repo = req.params.repo;

  // Get user data
  function getUser(result) {
    return new Promise((resolve, reject) => {
      github.users.get({
      }, (err, r) => {
        // TODO : 401 ?

        result.login = r.data.login;

        resolve(result);
      });
    });
  }

  // Get total commits for the specified repository and user
  function getTotalUserCommits(result) {
    return new Promise((resolve, reject) => {
      github.repos.getCommits({
        owner,
        repo,
        author: result.login,
        page: 1,
        per_page: 1,
      }, (err, r) => {
        if (err && err.code === 404) {
          return reject(new Error("Sorry can't find that owner/repo!"));
        }

        // Get response header
        let nbCommits = 0;

        if (r.meta && r.meta.link) {
          const lastPageLink = r.meta.link.match(/page=(\d+)&.{65}; rel="last"/);
          if (lastPageLink) {
            nbCommits = Number(lastPageLink[1]);
          }
        } else {
          if (r.data && r.data.length >= 1) {
            nbCommits = 1;
          }
        }

        result.nbTotalUserCommits = nbCommits;

        return resolve(result);
      });
    });
  }



  // Get total commits for the specified repository
  function getTotalCommits(result) {
    return new Promise((resolve, reject) => {
      github.repos.getCommits({
        owner,
        repo,
        page: 1,
        per_page: 1,
      }, (err, r) => {
        if (err && err.code === 404) {
          reject(new Error("Sorry can't find that owner/repo!"));
        }

        // Get response header
        let nbCommits = 0;

        if (r.meta && r.meta.link) {
          const lastPageLink = r.meta.link.match(/page=(\d+)&.{65}; rel="last"/);
          if (lastPageLink) {
            nbCommits = Number(lastPageLink[1]);
          }
        } else {
          if (r.data && r.data.length >= 1) {
            nbCommits = 1;
          }
        }

        result.nbTotalCommits = nbCommits;

        resolve(result);
      });
    });
  }

  // Get total contributors for the specified repository
  function getTotalContributors(result) {
    return new Promise((resolve, reject) => {
      github.repos.getContributors({
        owner,
        repo,
        page: 1,
        per_page: 1,
      }, (err, r) => {
        if (err && err.code === 404) {
          reject(new Error("Sorry can't find that owner/repo!"));
        }

        // Get response header
        let nbContributors = 0;

        if (r.meta && r.meta.link) {
          const lastPageLink = r.meta.link.match(/page=(\d+)&.{65}; rel="last"/);
          if (lastPageLink) {
            nbContributors = Number(lastPageLink[1]);
          }
        } else {
          if (r.data && r.data.length >= 1) {
            nbContributors = 1;
          }
        }

        result.nbTotalContributors = nbContributors;

        resolve(result);
      });
    });
  }

  let result = {};

  getUser(result)
    .then(getTotalUserCommits)
    .then(getTotalCommits)
    .then(getTotalContributors)
    .then((r) => {
      res.status(200).send("" + (r.nbTotalUserCommits / (r.nbTotalCommits / r.nbTotalContributors)));
      return;
    });
});

router.post('/score/:owner/:repo', (req, res) => {

  // Check if the session is defined
  if (req.session.token === undefined) {
    res.status(401).send("Sorry need to be authenticated!");
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
    // TODO : 401 ?

    const login = r.data.login;

    // Get the URI for mongodb
    const url = process.env.MONGO_URI;

    // Use connect method to connect to the server
    MongoClient.connect(url, (err, database) => {
      if(err) throw err;

      const db = database.db('shoot_em_hub');

      const owner = req.params.owner;
      const repo = req.params.repo;
      const score = req.body

      let json = {
        "owner": owner,
        "repo": repo,
        "user": login,
        "score": req.body.score,
      };

      let collection = db.collection("scores");
      collection.insertOne(json);

      database.close();
      
      res.sendStatus(200);
    });
  });
});

router.get('/score/:owner/:repo', (req, res) => {
  // Get the URI for mongodb
  const url = process.env.MONGO_URI;

  // Use connect method to connect to the server
  MongoClient.connect(url, (err, database) => {
    if(err) throw err;

    const db = database.db('shoot_em_hub');

    const owner = req.params.owner;
    const repo = req.params.repo;

    let collection = db.collection("scores");
    collection
      .find({'repo': repo, 'owner': owner, })
      .project({'repo': 0, 'owner': 0, '_id': 0})
      .sort( { score: -1 } )
      .toArray((err, scores) => {
        database.close();
        res.render('../views/score', {scores : scores});
        return;
      });
  });
});

module.exports = router;
