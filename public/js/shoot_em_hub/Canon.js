class Canon {
  constructor() {
    this.w = 5;
    this.h = 20;

    this.bullets = [];
    this.fireRate = 0;
    this.BOUNDS_TOLERANCE = 30;
  }

  logic(bounds) {
    if (this.fireRate != 0) {
      this.fireRate = (this.fireRate + 1) % 10;
    }

    for (let i = this.bullets.length - 1; i >= 0; --i) {
      if (this.inBounds(this.bullets[i], bounds)) {
        this.bullets[i].logic();
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

  shoot(x, y) {
    if (this.fireRate == 0) {
      this.bullets.push(
          new Bullet(
            new CartesianVector(x, y),
            new CartesianVector(0, -10),
            10
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
    ctx.fillStyle = "white";
    ctx.rect(x - this.w / 2, y - this.h / 2, this.w, this.h);
    ctx.fill();
    ctx.closePath();


  }
}
