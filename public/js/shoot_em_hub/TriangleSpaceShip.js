class TriangleSpaceShip extends SpaceShip {
  constructor(pos, w, h) {
    super(pos, w, h);
    this.leftCanon.maxFireRate = 30;
    this.rightCanon.maxFireRate = 30;
    this.leftCanon.direction.y = 5;
    this.rightCanon.direction.y = 5;
  }
}
