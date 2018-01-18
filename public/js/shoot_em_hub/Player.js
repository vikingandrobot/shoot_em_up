class Player {
  constructor(c) {
    this.spaceShip = new SpaceShip(
      new CartesianVector(c.width/2, c.height - 20),
      20,
      40
    );

    this.left = this.up = this.right;

    this.registerKeyListeners();
  }

  registerKeyListeners() {
    document.addEventListener("keydown", (e) => {
      switch(e.keyCode) {
        case 37:
          this.left = true;
          break;

        case 38:
          this.up = true;
          break;

        case 39:
          this.right = true;
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

  logic() {
    const left = this.left;
    const up = this.up;
    const right = this.right;

    if (left) {
      this.spaceShip.addSpeed(new CartesianVector(-1, 0));
    } else if (right) {
      this.spaceShip.addSpeed(new CartesianVector(1, 0));
    } else {
      this.spaceShip.looseSpeed(0.9);
    }

    if (up) {
      console.log('up')
    }

    this.spaceShip.logic();

  }

  draw(ctx) {
    this.spaceShip.draw(ctx);
  }
}
