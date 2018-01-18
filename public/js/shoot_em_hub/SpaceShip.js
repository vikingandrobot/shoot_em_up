class SpaceShip {
  constructor(pos, w, h) {
    this.pos = pos.copy();
    this.speed = new CartesianVector(0, 0);
    this.w = w;
    this.h = h;
    this.CANON_SPACE = 30;

    this.leftCanon = new Canon();
    this.rightCanon = new Canon();

    this.maxSpeed = 10;

    this.color = new Color(255, 255, 255, 1);
    this.colorString = this.color.asString();
  }

  shoot() {
    this.leftCanon.shoot(
      this.pos.x + this.CANON_SPACE,
      this.pos.y
    );
    this.rightCanon.shoot(
      this.pos.x - this.CANON_SPACE,
      this.pos.y
    );
  }

  logic(bounds, ennemies) {
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

    this.leftCanon.logic(bounds, ennemies);
    this.rightCanon.logic(bounds, ennemies);
  }

  /**
    Draw the space ship
  */
  draw(ctx) {

    this.leftCanon.draw(
      ctx,
      this.pos.x + this.CANON_SPACE,
      this.pos.y
    );
    this.rightCanon.draw(
      ctx,
      this.pos.x - this.CANON_SPACE,
      this.pos.y
    );

    ctx.beginPath();
    ctx.rect(
      this.pos.x - this.w / 2,
      this.pos.y - this.h / 2,
      this.w,
      this.h
    );
    ctx.fillStyle = this.colorString;
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

  setColor(color) {
    this.color = color;
    this.colorString = this.color.asString();
  }
}
