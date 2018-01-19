const EnnemySpaceShipImage = new Image();

EnnemySpaceShipImage.onload = function(){
  // image  has been loaded
};

EnnemySpaceShipImage.src = '/img/ennemy_rocket.png';

class EnnemySpaceShip extends SpaceShip {
  constructor(pos, w, h) {
    super(pos, w, h);
    this.leftCanon.maxFireRate = 100;
    this.rightCanon.maxFireRate = 100;
    this.leftCanon.direction.y = 5;
    this.rightCanon.direction.y = 5;
    this.img = EnnemySpaceShipImage;
    this.life = 1;
    this.maxLife = 1;
  }

  draw(ctx) {
    // Draw the spaceship
    super.draw(ctx);

    // draw the life of the spaceship
    if (this.life != this.maxLife) {
      this.drawLife(ctx);
    }
  }

  /**
    Draw life of the space ship.
  */
  drawLife(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.colorString;
    ctx.fillRect(
      this.pos.x - this.w,
      this.pos.y - this.h / 2 - 20,
      this.w * 2,
      10
    );
    ctx.fill();


    ctx.fillStyle = '#57d646';
    ctx.fillRect(
      this.pos.x - this.w,
      this.pos.y - this.h / 2 - 20,
      this.w * 2 / this.maxLife * this.life,
      10
    );
    ctx.fill();
    ctx.closePath();
  }
}
