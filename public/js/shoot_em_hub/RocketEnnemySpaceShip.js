class RocketEnnemySpaceShip extends EnnemySpaceShip {
  constructor(pos, w, h) {
    super(pos, w, h);
    this.leftCanon = undefined;
    this.rightCanon = undefined;
    this.img = EnnemySpaceShipImage;
    this.life = 1;
    this.maxLife = 1;
    this.speed = new CartesianVector(0, -20);
  }
}
