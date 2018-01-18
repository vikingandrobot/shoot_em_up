const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('../views/index');
});

router.get('/repos', (req, res) => {
  res.render('../views/repos');
});

router.get('/play', (req, res) => {
  res.render('../views/play');
});

module.exports = router;
