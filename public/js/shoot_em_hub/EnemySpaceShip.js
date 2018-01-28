const enemySpaceShipImage = new Image();
enemySpaceShipImage.src = '/img/bullet_enemy.png';

const bigEnemySpaceShipImage = new Image();
bigEnemySpaceShipImage.src = '/img/bullet_enemy_x.png';

class EnemySpaceShip extends SpaceShip {
  constructor(pos, SIZE_TYPE) {
    super(pos, 50, 60);

    switch (SIZE_TYPE) {
      case 'BIG':
        this.w = 75;
        this.h = 90;
        this.img = bigEnemySpaceShipImage;
        this.life = 2;
        this.maxLife = 2;
        this.leftCanon = new SmallCanon(
          this,
          new CartesianVector(-this.w / 2, 0),
        );
        this.leftCanon.w = 12;
        this.leftCanon.h = 70;
        this.rightCanon = new SmallCanon(
          this,
          new CartesianVector(this.w / 2, 0),
        );
        this.rightCanon.w = 12;
        this.rightCanon.h = 70;
        this.leftCanon.maxFireRate = 80;
        this.rightCanon.maxFireRate = 80;
        break;

      case 'SMALL':
      default:
        this.img = enemySpaceShipImage;
        this.life = 1;
        this.maxLife = 1;
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
        break;
    }
    this.leftCanon.direction.y = 5;
    this.rightCanon.direction.y = 5;
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
