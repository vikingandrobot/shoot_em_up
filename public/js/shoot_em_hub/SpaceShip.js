class SpaceShip {
  constructor(pos, w, h) {
    this.pos = pos.copy();
    this.speed = new CartesianVector(0, 0);
    this.w = w;
    this.h = h;

    this.maxSpeed = 10;
  }

  logic(bounds) {
    this.pos.add(this.speed);

    if (this.pos.x - this.w / 2 < bounds.x) {
      this.pos.x = bounds.x + this.w / 2;
      this.speed.x = 0;
    }
    if (this.pos.x + this.w / 2 > bounds.x + bounds.w) {
      this.pos.x = bounds.x + bounds.w - this.w / 2;
      this.speed.x = 0;
    }
    if (this.pos.y - this.h / 2 < bounds.y) {
      this.pos.y = bounds.y + this.h / 2;
      this.speed.y = 0;
    }
    if (this.pos.y + this.h / 2 > bounds.y + bounds.h) {
      this.pos.y = bounds.y + bounds.h - this.h / 2;
      this.speed.y = 0;
    }
  }

  /**
    Draw the space ship
  */
  draw(ctx) {
    ctx.beginPath();
    ctx.rect(
      this.pos.x - this.w / 2,
      this.pos.y - this.h / 2,
      this.w,
      this.h
    );
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  }

  addSpeed(s) {
    this.speed.add(s);
    if (this.speed.x < -this.maxSpeed) {
      this.speed.x  = -this.maxSpeed;
    }
    if (this.speed.x > this.maxSpeed) {
      this.speed.x = this.maxSpeed;
    }
    if (this.speed.y < -this.maxSpeed) {
      this.speed.y  = -this.maxSpeed;
    }
    if (this.speed.y > this.maxSpeed) {
      this.speed.y = this.maxSpeed;
    }
  }

  looseSpeed(factor) {
    if (this.speed.toPolar().radius > 0.5) {
      this.speed = this.speed.toPolar().scale(factor).toCartesian();
    } else {
      this.speed = new CartesianVector(0, 0);
    }
  }
}
