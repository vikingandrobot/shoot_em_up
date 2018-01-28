const laserEnemySpaceShipImage = new Image();
laserEnemySpaceShipImage.src = '/img/laser_enemy.png';
const bigLaserEnemySpaceShipImage = new Image();
bigLaserEnemySpaceShipImage.src = '/img/laser_enemy_x.png';

/**
  File: LaserEnemySpaceShip
  Date: 18.01.18
  Authors: Mathieu Monteverde & Sathiya Kirushnapillai

  The class LaserEnemySpaceShip represents enemies that shoot
  horizontal lasers on their right or on their left.
*/

class LaserEnemySpaceShip extends EnemySpaceShip {
  constructor(pos, SIZE_TYPE, direction) {
    super(pos, 50, 50);

    // Create a selection of colors for electirc beams
    this.colors = [];

    switch (SIZE_TYPE) {
      case 'BIG':
        this.w = 75;
        this.h = 75;
        this.img = bigLaserEnemySpaceShipImage;
        this.damage = 2;
        for (let i = 0; i < 10; i += 1) {
          this.colors.push(new Color(
            255,
            parseInt(30 + (Math.random() * 225), 10),
            239,
            1,
          ).asString());
        }
        break;

      case 'SMALL':
      default:
        this.img = laserEnemySpaceShipImage;
        this.damage = 1;
        for (let i = 0; i < 10; i += 1) {
          this.colors.push(new Color(
            parseInt(40 + (Math.random() * 215), 10),
            211,
            255,
            1,
          ).asString());
        }
        break;
    }

    this.shooting = false;
    this.direction = direction;
    this.life = 25;
    this.maxLife = 25;
    this.leftCanon = undefined;
    this.rightCanon = undefined;
    this.spriteRatios = { x: 1.3, y: 1 };
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
          enemies[i].hit(this.damage);
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
    const delta = 600 * (this.direction / N);

    // Draw ten beams
    for (let j = 1; j <= 10; j += 1) {
      ctx.beginPath();
      ctx.strokeStyle = this.colors[j - 1];
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

      super.draw(ctx);
    }
  }
}
