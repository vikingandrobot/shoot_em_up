class MiniCanon extends Canon {
  /**
    Spawn a bullet
  */
  spawnBullet(x, y) {
    return new MiniBullet(
      new CartesianVector(x, y),
      new CartesianVector(this.spaceShip.speed.x * 0.3, this.direction.y),
    );
  }
}

class SmallCanon extends Canon {
  /**
    Spawn a bullet
  */
  spawnBullet(x, y) {
    return new SmallBullet(
      new CartesianVector(x, y),
      new CartesianVector(this.spaceShip.speed.x * 0.3, this.direction.y),
    );
  }
}

class MediumCanon extends Canon {
  /**
    Spawn a bullet
  */
  spawnBullet(x, y) {
    return new MediumBullet(
      new CartesianVector(x, y),
      new CartesianVector(this.spaceShip.speed.x * 0.3, this.direction.y),
    );
  }
}

class LargeCanon extends Canon {
  /**
    Spawn a bullet
  */
  spawnBullet(x, y) {
    return new LargeBullet(
      new CartesianVector(x, y),
      new CartesianVector(this.spaceShip.speed.x * 0.3, this.direction.y),
    );
  }
}

class MegaCanon extends Canon {
  /**
    Spawn a bullet
  */
  spawnBullet(x, y) {
    return new MegaBullet(
      new CartesianVector(x, y),
      new CartesianVector(this.spaceShip.speed.x * 0.3, this.direction.y),
    );
  }
}
