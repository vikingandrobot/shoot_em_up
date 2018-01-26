class RocketEnemySpaceShip extends EnemySpaceShip {
  constructor(pos, w, h) {
    super(pos, w, h);
    this.leftCanon = undefined;
    this.rightCanon = undefined;
    this.img = EnemySpaceShipImage;
    this.life = 1;
    this.maxLife = 1;
  }
}
