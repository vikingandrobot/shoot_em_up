class Canon {
  constructor() {
    this.w = 5;
    this.h = 20;

    this.direction = new CartesianVector(0, -10);

    this.bullets = [];
    this.fireRate = 0;
    this.maxFireRate = 10;
    this.BOUNDS_TOLERANCE = 30;

    this.color = new Color(255, 255, 255, 1);
    this.colorString = this.color.asString();
  }

  logic(bounds, ennemies) {
    if (this.fireRate != 0) {
      this.fireRate = (this.fireRate + 1) % this.maxFireRate;
    }

    for (let i = this.bullets.length - 1; i >= 0; --i) {
      if (this.inBounds(this.bullets[i], bounds)) {
        this.bullets[i].logic();

        if (ennemies !== undefined) {
          for (let j = ennemies.length - 1; j >= 0; --j) {
            if (this.bullets[i].collision(ennemies[j])) {
              ennemies.splice(j, 1);
              this.bullets.splice(i, 1);
              break;
            };
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

  shoot(x, y) {
    if (this.fireRate == 0) {
      this.bullets.push(
          new Bullet(
            new CartesianVector(x, y),
            this.direction,
            3
          )
        );
        this.fireRate = this.fireRate + 1;
      }
    }

  draw(ctx, x, y) {
    for (let i = this.bullets.length - 1; i >= 0; --i) {
      this.bullets[i].draw(ctx);
    }

    ctx.beginPath();
    ctx.fillStyle = this.colorString;
    ctx.rect(x - this.w / 2, y - this.h / 2, this.w, this.h);
    ctx.fill();
    ctx.closePath();


  }
}
