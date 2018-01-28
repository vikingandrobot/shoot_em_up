module.exports = {
  "extends": "airbnb-base",
  "env": {
    "jquery": true,
    "mocha": true,
  },
  "globals": {
    "document": false,
    "RepositorySelector": false,
    "window": false,
    "PlanetChart": false,
    "Image": false,
    "CartesianVector": false,
    "PolarVector": false,
    "Planet": false,
    "SpaceShip": false,
    "ShootEmHub": false,
    "RocketEnemySpaceShip": false,
    "Player": false,
    "LaserEnemySpaceShip": false,
  },
  "rules": {
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": true,
      }
    ]
  }
};
