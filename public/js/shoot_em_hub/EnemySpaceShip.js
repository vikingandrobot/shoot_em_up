const EnemySpaceShipImage = new Image();
EnemySpaceShipImage.src = '/img/enemy_rocket.png';

class EnemySpaceShip extends SpaceShip {
  constructor(pos, w, h) {
    super(pos, w, h);
    this.leftCanon = new MiniCanon(
      this,
      new CartesianVector(-this.w / 2, 0),
    );
    this.rightCanon = new MiniCanon(
      this,
      new CartesianVector(this.w / 2, 0),
    );
    this.leftCanon.maxFireRate = 100;
    this.rightCanon.maxFireRate = 100;
    this.leftCanon.direction.y = 5;
    this.rightCanon.direction.y = 5;
    this.img = EnemySpaceShipImage;
    this.life = 1;
    this.maxLife = 1;
    this.recuperationTime = 5;
    this.spriteRatios = { x: 1, y: 1 };
  }

  draw(ctx) {
    // Draw the spaceship
    super.draw(ctx);

    // draw the life of the spaceship
    if (this.life !== this.maxLife) {
      this.drawLife(ctx);
    }
  }

  /**
    Draw life of the space ship.
  */
  drawLife(ctx) {

    // Draw full life bar
    ctx.beginPath();
    ctx.fillStyle = '#cdcdcd';
    ctx.fillRect(
      this.pos.x - this.w * 0.75,
      this.pos.y - this.h / 2 - 20,
      this.w * 1.5,
      5
    );
    ctx.fill();

    // Draw life value
    ctx.fillStyle = 'white';
    ctx.fillRect(
      this.pos.x - this.w * 0.75,
      this.pos.y - this.h / 2 - 20,
      this.w * 1.5 / this.maxLife * this.life,
      5
    );
    ctx.fill();
    ctx.closePath();
  }
}
