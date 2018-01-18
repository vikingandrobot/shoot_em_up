const LaserEnnemySpaceShipImage = new Image();

LaserEnnemySpaceShipImage.onload = function(){
  // image  has been loaded
};

LaserEnnemySpaceShipImage.src = '/img/sphere_small.png';

/**
  File: LaserEnnemySpaceShip
  Date: 18.01.18
  Authors: Mathieu Monteverde & Sathiya Kirushnapillai

  The class LaserEnnemySpaceShip represents ennemies that shoot
  horizontal lasers on their right or on their left.
*/

class LaserEnnemySpaceShip extends SpaceShip {
  constructor(pos, w, h, direction) {
    super(pos, w, h);
    this.img = LaserEnnemySpaceShipImage;
    this.shooting = false;
    this.direction = direction;
  }

  /**
    Set shooting to true
  */
  shoot() {
    this.shooting = true;
  }

  /**
    Apply logic
  */
  logic(bounds, ennemies) {
    super.logic(bounds, ennemies);

    if (this.shooting) {
      // For all ennemies
      for (let i = ennemies.length - 1; i >= 0; --i) {
        // If the ennemies crosses the beam and is on the correct side
        if (
          ennemies[i].pos.y - ennemies[i].h/2 < this.pos.y
          &&
          ennemies[i].pos.y + ennemies[i].h/2 > this.pos.y
          &&
          ((this.direction < 0 && this.pos.x >= ennemies[i].pos.x)
            || (this.direction > 0 && this.pos.x <= ennemies[i].pos.x))
        ) {
            // Hit the ennemy
            ennemies[i].hit();
          }
      }
    }

  }

  /**
    Draw the space ship
  */
  draw(ctx) {
    // number of steps in the beams
    const N = 20;

    // Size of a step
    const delta = 600 * this.direction / N;

    // Draw ten beams
    for (let j = 1; j <= 10; ++j) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() / 2})`;
      ctx.lineWidth = parseInt(Math.random() * 10);
      ctx.moveTo(this.pos.x, this.pos.y);

      // Draw the N steps of each beam
      for (let i = 1; i <= N; ++i) {;
        ctx.lineTo(
          this.pos.x + i * delta * (Math.random() + 1),
          this.pos.y + Math.random() * 20 - 10
        );
      }
      ctx.stroke();
      ctx.closePath();
    }

    // Draw the image
    ctx.drawImage(
      this.img,
      this.pos.x - this.w / 2,
      this.pos.y - this.h / 2,
      this.w,
      this.h
    );
  }
}
