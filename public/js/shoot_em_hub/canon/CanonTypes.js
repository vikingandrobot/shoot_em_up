class MiniCanon extends Canon {
  constructor(spaceShip, pos) {
    super(spaceShip, pos);
  }

  /**
    Spawn a bullet
  */
  spawnBullet(x, y) {
    return new MiniBullet(
      new CartesianVector(x, y),
      this.direction
    );
  }
}

class SmallCanon extends Canon {
  constructor(spaceShip, pos) {
    super(spaceShip, pos);

    this.w = 7;
    this.h = 22;
  }

  /**
    Spawn a bullet
  */
  spawnBullet(x, y) {
    return new SmallBullet(
      new CartesianVector(x, y),
      this.direction
    );
  }
}

class MediumCanon extends Canon {
  constructor(spaceShip, pos) {
    super(spaceShip, pos);

    this.w = 12;
    this.h = 35;
  }

  /**
    Spawn a bullet
  */
  spawnBullet(x, y) {
    return new MediumBullet(
      new CartesianVector(x, y),
      this.direction,
      3
    );
  }
}

class LargeCanon extends Canon {
  constructor(spaceShip, pos) {
    super(spaceShip, pos);


    this.w = 18;
    this.h = 50;
  }

  /**
    Spawn a bullet
  */
  spawnBullet(x, y) {
    return new LargeBullet(
      new CartesianVector(x, y),
      this.direction,
      3
    );
  }
}

class MegaCanon extends Canon {
  constructor(spaceShip, pos) {
    super(spaceShip, pos);

    this.w = 25;
    this.h = 70;
  }

  /**
    Spawn a bullet
  */
  spawnBullet(x, y) {
    return new MegaBullet(
      new CartesianVector(x, y),
      this.direction,
      3
    );
  }
}
