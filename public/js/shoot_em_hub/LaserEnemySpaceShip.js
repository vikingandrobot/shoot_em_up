const LaserEnemySpaceShipImage = new Image();

LaserEnemySpaceShipImage.onload = function(){
  // image  has been loaded
};

LaserEnemySpaceShipImage.src = '/img/sphere_small.png';

/**
  File: LaserEnemySpaceShip
  Date: 18.01.18
  Authors: Mathieu Monteverde & Sathiya Kirushnapillai

  The class LaserEnemySpaceShip represents enemies that shoot
  horizontal lasers on their right or on their left.
*/

class LaserEnemySpaceShip extends EnemySpaceShip {
  constructor(pos, w, h, direction) {
    super(pos, w, h);
    this.img = LaserEnemySpaceShipImage;
    this.shooting = false;
    this.direction = direction;
    this.life = 25;
    this.maxLife = 25;
    this.leftCanon = undefined;
    this.rightCanon = undefined;
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
  logic(bounds, enemies) {
    super.logic(bounds, enemies);

    if (this.shooting) {
      // For all enemies
      for (let i = enemies.length - 1; i >= 0; --i) {
        // If the enemies crosses the beam and is on the correct side
        if (
          enemies[i].pos.y - enemies[i].h/2 < this.pos.y
          &&
          enemies[i].pos.y + enemies[i].h/2 > this.pos.y
          &&
          ((this.direction < 0 && this.pos.x >= enemies[i].pos.x)
            || (this.direction > 0 && this.pos.x <= enemies[i].pos.x))
        ) {
            // Hit the enemy
            enemies[i].hit(1);
          }
      }
    }

  }

  /**
    Draw the space ship
  */
  draw(ctx) {
    super.draw(ctx);

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
  }
}
