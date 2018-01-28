class Player {
  constructor(c, level) {
    this.spaceShip = new SpaceShip(
      new CartesianVector(c.width / 2, c.height - 50),
      30,
      60,
    );

    this.computePlayerLevel(level);

    this.bounds = {
      x: 0,
      y: 0,
      w: c.width,
      h: c.height,
    };

    // Player direction variable
    this.left = false;
    this.up = false;
    this.right = false;
    this.down = false;
    this.space = false;

    // Register the key listeners
    this.registerKeyListeners();
  }

  computePlayerLevel(level) {
    if (level < 0.5) {
      this.spaceShip.leftCanon = new MiniCanon(
        this.spaceShip,
        new CartesianVector(-this.spaceShip.w / 2, 0),
      );
      this.spaceShip.rightCanon = new MiniCanon(
        this.spaceShip,
        new CartesianVector(this.spaceShip.w / 2, 0),
      );
      this.spaceShip.leftCanon.maxFireRate = 25;
      this.spaceShip.rightCanon.maxFireRate = 25;
    } else if (level < 1) {
      this.spaceShip.leftCanon = new SmallCanon(
        this.spaceShip,
        new CartesianVector(-this.spaceShip.w / 2, 0),
      );
      this.spaceShip.rightCanon = new SmallCanon(
        this.spaceShip,
        new CartesianVector(this.spaceShip.w / 2, 0),
      );
      this.spaceShip.leftCanon.maxFireRate = 25;
      this.spaceShip.rightCanon.maxFireRate = 25;
    } else if (level < 1.5) {
      this.spaceShip.leftCanon = new MediumCanon(
        this.spaceShip,
        new CartesianVector(-this.spaceShip.w / 2, 0),
      );
      this.spaceShip.rightCanon = new MediumCanon(
        this.spaceShip,
        new CartesianVector(this.spaceShip.w / 2, 0),
      );
      this.spaceShip.leftCanon.maxFireRate = 20;
      this.spaceShip.rightCanon.maxFireRate = 20;
    } else if (level < 2) {
      this.spaceShip.leftCanon = new LargeCanon(
        this.spaceShip,
        new CartesianVector(-this.spaceShip.w, 0),
      );
      this.spaceShip.rightCanon = new LargeCanon(
        this.spaceShip,
        new CartesianVector(this.spaceShip.w, 0),
      );
      this.spaceShip.leftCanon.maxFireRate = 15;
      this.spaceShip.rightCanon.maxFireRate = 15;
    } else {
      this.spaceShip.leftCanon = new MegaCanon(
        this.spaceShip,
        new CartesianVector(-this.spaceShip.w, 0),
      );
      this.spaceShip.rightCanon = new MegaCanon(
        this.spaceShip,
        new CartesianVector(this.spaceShip.w, 0),
      );
      this.spaceShip.leftCanon.maxFireRate = 10;
      this.spaceShip.rightCanon.maxFireRate = 10;
    }
  }

  registerKeyListeners() {
    document.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 37:
          this.left = true;
          this.right = false;
          break;

        case 38:
          this.up = true;
          this.down = false;
          break;

        case 39:
          this.right = true;
          this.left = false;
          break;

        case 40:
          this.down = true;
          this.up = false;
          break;

        case 32:
          this.space = true;
          break;

        default:
          break;
      }
    });

    document.addEventListener('keyup', (e) => {
      switch (e.keyCode) {
        case 37:
          this.left = false;
          break;

        case 38:
          this.up = false;
          break;

        case 39:
          this.right = false;
          break;

        case 40:
          this.down = false;
          break;

        case 32:
          this.space = false;
          break;

        default:
          break;
      }
    });
  }

  shoot() {
    this.spaceShip.shoot();
  }

  logic(enemies) {
    const { left } = this;
    const { up } = this;
    const { right } = this;
    const { down } = this;
    const { space } = this;

    if (left) {
      this.spaceShip.addSpeed(new CartesianVector(-3, 0));
    }
    if (right) {
      this.spaceShip.addSpeed(new CartesianVector(3, 0));
    }
    if (up) {
      this.spaceShip.addSpeed(new CartesianVector(0, -3));
    }
    if (down) {
      this.spaceShip.addSpeed(new CartesianVector(0, 3));
    }

    if (!left && !right) {
      this.spaceShip.looseSpeed(0.65, 1);
    }
    if (!up && !down) {
      this.spaceShip.looseSpeed(1, 0.65);
    }

    if (space) {
      this.spaceShip.shoot();
    }

    this.spaceShip.logic(this.bounds, enemies);
  }

  draw(ctx) {
    this.spaceShip.draw(ctx);
  }

  getScore() {
    return this.spaceShip.score;
  }

  getLife() {
    return this.spaceShip.life;
  }
}
