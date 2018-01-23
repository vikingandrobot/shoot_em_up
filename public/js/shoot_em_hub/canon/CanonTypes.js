class MiniCanon extends Canon {
  /**
    Spawn a bullet
  */
  spawnBullet(x, y) {
    return new MiniBullet(
      new CartesianVector(x, y),
      this.direction,
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
      this.direction,
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
      this.direction,
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
      this.direction,
    );
  }
}

class MegaCanon extends Canon {
  constructor(spaceShip, pos) {
    super(spaceShip, pos);
  }

  /**
    Spawn a bullet
  */
  spawnBullet(x, y) {
    return new MegaBullet(
      new CartesianVector(x, y),
      this.direction,
    );
  }
}
