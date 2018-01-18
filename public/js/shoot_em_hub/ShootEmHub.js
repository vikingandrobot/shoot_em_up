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
    this.player.logic();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    this.player.draw(this.ctx);
  }
}
