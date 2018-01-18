const spaceShipImage = new Image();

spaceShipImage.onload = function(){
  // image  has been loaded
};

spaceShipImage.src = '/img/rocket_white_small.png';

class SpaceShip {
  constructor(pos, w, h) {
    this.pos = pos.copy();
    this.speed = new CartesianVector(0, 0);
    this.w = w;
    this.h = h;
    this.CANON_SPACE = 20;

    this.leftCanon = new Canon(this);
    this.rightCanon = new Canon(this);

    this.particles = [];
    this.nbOfParticles = 10;

    this.maxSpeed = 10;

    this.color = new Color(255, 255, 255, 1);
    this.colorString = this.color.asString();

    this.img = spaceShipImage;

    this.score = 0;
    this.DEFAULT_COMBO_VALUE = 10;
    this.comboCount = 1;
    this.comboTime = 0;
    this.comboDuration = 60;

    this.life = 3;

    this.hitCounter = 0;
    this.recuperationTime = 80;
  }

  countScore() {
    this.score += this.DEFAULT_COMBO_VALUE * this.comboCount;
    ++this.comboCount;
    this.comboTime = 0;
  }

  hit() {
    if (this.hitCounter == 0) {
      this.life -= 1;
      this.hitCounter++;
    }
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

    for (let i = this.particles.length - 1; i >= 0; i--) {
      if (this.particles[i].intensity <= 0) {
        this.particles.splice(i, 1);
      } else {
        this.particles[i].logic();
      }
    }

    if (this.particles.length < this.nbOfParticles) {
      const x = Math.random() * this.w - this.w / 2 + this.pos.x;
      let y = Math.random() * this.h - this.h / 2 + this.pos.y;

      let speed;
      if (this.speed.x === 0 && this.speed.y === 0) {
        speed = new CartesianVector(0, 1);
        y += this.h;
      } else {
        speed = this.speed.toPolar().scale(-0.05).toCartesian();
      }

      this.particles.push(
        new LightParticle(
          new CartesianVector(x, y),
          Math.random() * 2 + 1,
          speed
        )
      )
    }

    // Reset combo
    ++this.comboTime;

    if (this.comboTime >= this.comboDuration) {
      this.comboCount = Math.max(this.comboCount - 1, 1);
      this.comboTime = 0;
    }

    if (this.hitCounter != 0) {
      ++this.hitCounter;
    }
    if (this.hitCounter >= this.recuperationTime) {
      this.hitCounter = 0;
    }
  }

  /**
    Draw the space ship
  */
  draw(ctx) {

    if (this.hitCounter != 0) {
      ctx.globalAlpha = 0.5
    }

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

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].draw(ctx);
    }

    ctx.beginPath();
    ctx.rect(
      this.pos.x - this.CANON_SPACE,
      this.pos.y - this.h / 24,
      this.CANON_SPACE * 2,
      this.h / 7
    );
    ctx.fillStyle = this.colorString;
    ctx.fill();
    ctx.closePath();

    ctx.drawImage(
      this.img,
      this.pos.x - this.w / 2,
      this.pos.y - this.h / 2,
      this.w,
      this.h
    );

    if (this.hitCounter != 0) {
      ctx.globalAlpha = 1;
    }
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
    this.leftCanon.setColor(color);
    this.rightCanon.setColor(color);
  }
}
