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
  }

  logic(bounds) {
    super.logic(bounds, undefined);
  }
}
