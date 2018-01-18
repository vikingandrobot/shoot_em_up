class ShootEmHub {

  constructor(canvasId) {
    this.canvasId = canvasId;

    // Retrieve the canvas
    this.c = document.getElementById(this.canvasId);
    if (this.c == undefined) {
      throw "Impossible to retrieve the canvas. canvasId returned undefined";
    }
    this.ctx = this.c.getContext("2d");

    this.player = new Player(this.c);

    this.ennemies = [];
    // for (let i = 0; i < 5; ++i) {
    //   this.ennemies.push(
    //     this.spawnEnnemy(
    //       Math.random() * this.c.width,
    //       Math.random() * -this.c.height * 0.5
    //     )
    //   );
    // }


    this.ennemyBounds = {
      x: 0,
      y: -this.c.height * 0.5,
      w: this.c.width,
      h: this.c.height * 2
    };
  }

  /**
    Start the game
  */
  start() {
    setInterval(() => {
      this.core();
    }, 1000/50);
  }

  core() {
    this.logic();
    this.draw();
  }

  logic() {
    this.player.logic(this.ennemies);

    for (let i = this.ennemies.length - 1; i >= 0; --i) {
      if (this.ennemies[i].pos.y -  this.ennemies[i].h > this.c.height) {
        this.ennemies.splice(i, 1);
      } else {
        this.ennemies[i].shoot();
        this.ennemies[i].logic(this.ennemyBounds);
      }
    }

    if (Math.random() < 0.03) {
      this.ennemies.push(
        this.spawnEnnemy(
          Math.random() * this.c.width,
          Math.random() * -this.c.height / 2
        )
      );
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    this.player.draw(this.ctx);

    for (let i = this.ennemies.length - 1; i >= 0; --i) {
      this.ennemies[i].draw(this.ctx);
    }
  }

  spawnEnnemy(x, y) {
    const ennemy = new TriangleSpaceShip(
      new CartesianVector(x, y),
      20,
      40
    );
    ennemy.speed = new CartesianVector(0, 3);
    ennemy.setColor(new Color(186, 53, 5, 1));
    return ennemy;
  }
}
