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
    "Explosion": false,
    "EnemySpaceShip": false,
    "ENEMY_GENERATOR": false,
    "MiniCanon": false,
    "SmallCanon": false,
    "MediumCanon": false,
    "MegaCanon": false,
    "LargeCanon": false,
    "Canon": false,
    "MiniBullet": false,
    "SmallBullet": false,
    "MediumBullet": false,
    "LargeBullet": false,
    "MegaBullet": false,
    "Bullet": false,
    "LightParticle": false,
    "LightParticleCloud": false,
    "Color": false,
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
