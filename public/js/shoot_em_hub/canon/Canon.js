const canonImage = new Image();
canonImage.src = '/img/canon.png';

class Canon {
  constructor(spaceShip, pos) {
    this.spaceShip = spaceShip;
    this.pos = pos;

    this.w = 5;
    this.h = 20;

    this.direction = new CartesianVector(0, -10);

    this.bullets = [];
    this.fireRate = 0;
    this.maxFireRate = 10;
    this.BOUNDS_TOLERANCE = 30;

    this.color = new Color(255, 255, 255, 1);
    this.colorString = this.color.asString();

    this.img = canonImage;
  }

  logic(bounds, enemies) {
    if (this.fireRate !== 0) {
      this.fireRate = (this.fireRate + 1) % this.maxFireRate;
    }

    for (let i = this.bullets.length - 1; i >= 0; i -= 1) {
      if (this.inBounds(this.bullets[i], bounds)) {
        this.bullets[i].logic();

        if (enemies !== undefined) {
          for (let j = enemies.length - 1; j >= 0; j -= 1) {
            if (this.bullets[i].collision(enemies[j])) {
              enemies[j].hit(this.bullets[i].power);

              this.bullets.splice(i, 1);
              if (enemies[j].life > 0) {
                this.spaceShip.score += 5;
              }
              break;
            }
          }
        }
      } else {
        this.bullets.splice(i, 1);
      }
    }
  }

  inBounds(b, bounds) {
    return !(b.pos.x + this.BOUNDS_TOLERANCE < bounds.x ||
      b.pos.x - this.BOUNDS_TOLERANCE > bounds.x + bounds.w
      || b.pos.y + this.BOUNDS_TOLERANCE < bounds.y
      || b.pos.y - this.BOUNDS_TOLERANCE > bounds.y + bounds.h
    );
  }

  setColor(color) {
    this.color = color;
    this.colorString = this.color.asString();
  }

  shoot() {
    if (this.fireRate === 0) {
      const b = this.spawnBullet(
        this.spaceShip.pos.x + this.pos.x,
        (this.spaceShip.pos.y + this.pos.y) - (this.h / 2),
      );
      this.bullets.push(b);
      this.fireRate = this.fireRate + 1;
    }
  }

  /**
    Spawn a bullet
  */
  spawnBullet(x, y) {
    return new MiniBullet(
      new CartesianVector(x, y),
      this.direction,
    );
  }

  draw(ctx) {
    for (let i = this.bullets.length - 1; i >= 0; i -= 1) {
      this.bullets[i].draw(ctx);
    }

    const x = this.spaceShip.pos.x + this.pos.x;
    const y = this.spaceShip.pos.y + this.pos.y;

    ctx.beginPath();
    ctx.drawImage(
      this.img,
      x - (this.w / 2),
      y - (this.h / 2),
      this.w,
      this.h,
    );
    ctx.closePath();
  }
}
