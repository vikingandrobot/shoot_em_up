class MiniBullet extends Bullet {
  constructor(pos, speed) {
    super(pos, speed, 4);
    this.power = 1;

    super.setColor(new Color(255, 232, 58, 1));
  }
}

class SmallBullet extends Bullet {
  constructor(pos, speed) {
    super(pos, speed, 6);
    this.power = 2;

    super.setColor(new Color(167, 232, 69, 1));
  }
}

class MediumBullet extends Bullet {
  constructor(pos, speed) {
    super(pos, speed, 10);
    this.power = 4;

    super.setColor(new Color(89, 194, 255, 1));
  }
}

class LargeBullet extends Bullet {
  constructor(pos, speed) {
    super(pos, speed, 16);
    this.power = 8;

    super.setColor(new Color(255, 79, 79, 1));
  }
}

class MegaBullet extends Bullet {
  constructor(pos, speed) {
    super(pos, speed, 22);
    this.power = 16;

    super.setColor(new Color(229, 99, 255, 1));
  }
}
