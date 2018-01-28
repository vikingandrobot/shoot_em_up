const rocketSpaceShipImage = new Image();
rocketSpaceShipImage.src = '/img/rocket_enemy.png';
const bigRocketSpaceShipImage = new Image();
bigRocketSpaceShipImage.src = '/img/rocket_enemy_x.png';

class RocketEnemySpaceShip extends EnemySpaceShip {
  constructor(pos, SIZE_TYPE) {
    super(pos, 30, 60);
    switch (SIZE_TYPE) {
      case 'BIG':
        this.w = 45;
        this.h = 90;
        this.img = bigRocketSpaceShipImage;
        this.life = 1;
        this.maxLife = 1;
        break;

      case 'SMALL':
      default:
        this.img = rocketSpaceShipImage;
        this.life = 1;
        this.maxLife = 1;
        this.w = 30;
        this.h = 60;
        break;
    }
    this.leftCanon = undefined;
    this.rightCanon = undefined;
    this.spriteRatios = { x: 1, y: 1 };
  }
}
