class Player {
  constructor(c) {
    this.spaceShip = new SpaceShip(
      new CartesianVector(c.width/2, c.height - 20),
      20,
      40
    );

    this.bounds = {
      x: 0,
      y: 0,
      w: c.width,
      h: c.height
    };

    this.left = this.up = this.right;

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
          break;

        case 39:
          this.right = true;
          this.left = false;
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
      }
        // use e.keyCode
    });
  }

  shoot() {
    this.spaceShip.shoot();
  }

  logic() {
    const left = this.left;
    const up = this.up;
    const right = this.right;

    if (left) {
      this.spaceShip.addSpeed(new CartesianVector(-1, 0));
    }
    if (right) {
      this.spaceShip.addSpeed(new CartesianVector(1, 0));
    }
    if (!left && !right) {
      this.spaceShip.looseSpeed(0.75);
    }

    if (up) {
      this.spaceShip.shoot();
    }

    this.spaceShip.logic(this.bounds);

  }

  draw(ctx) {
    this.spaceShip.draw(ctx);
  }
}
