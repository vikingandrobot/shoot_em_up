class Player {
  constructor(c) {
    this.spaceShip = new SpaceShip(
      new CartesianVector(c.width/2, c.height - 50),
      30,
      60
    );

    this.bounds = {
      x: 0,
      y: 0,
      w: c.width,
      h: c.height
    };

    this.left = this.up = this.right = this.down = this.space = false;

    this.registerKeyListeners();
  }

  registerKeyListeners() {
    document.addEventListener("keydown", (e) => {
      switch(e.keyCode) {
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
      }
        // use e.keyCode
    });

    document.addEventListener("keyup", (e) => {
      switch(e.keyCode) {
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
      }
        // use e.keyCode
    });
  }

  shoot() {
    this.spaceShip.shoot();
  }

  logic(ennemies) {
    const left = this.left;
    const up = this.up;
    const right = this.right;
    const down = this.down;
    const space = this.space;

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



    this.spaceShip.logic(this.bounds, ennemies);

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
