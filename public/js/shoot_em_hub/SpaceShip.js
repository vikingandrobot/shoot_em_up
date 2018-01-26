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

    this.leftCanon = undefined;
    this.rightCanon = undefined;

    this.particles = [];
    this.nbOfParticles = 10;

    this.maxSpeed = 8;

    this.color = new Color(255, 255, 255, 1);
    this.colorString = this.color.asString();

    this.img = spaceShipImage;

    this.score = 0;
    this.DEFAULT_COMBO_VALUE = 10;
    this.comboCount = 1;
    this.comboTime = 0;
    this.comboDuration = 60;

    this.life = 3;
    this.maxLife = 3;

    this.hitCounter = 0;
    this.recuperationTime = 80;
  }

  countScore() {
    this.score += this.DEFAULT_COMBO_VALUE * this.comboCount;
    ++this.comboCount;
    this.comboTime = 0;
  }

  hit(power) {
    if (this.hitCounter == 0) {
      this.life -= power;
      this.hitCounter++;
    }
  }

  shoot() {
    if (this.leftCanon !== undefined) {
      this.leftCanon.shoot();
    }
    if (this.rightCanon !== undefined) {
      this.rightCanon.shoot();
    }
  }

  logic(bounds, enemies) {
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

    if (this.leftCanon !== undefined) {
      this.leftCanon.logic(bounds, enemies);
    }
    if (this.rightCanon !== undefined) {
      this.rightCanon.logic(bounds, enemies);
    }

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

    // Draw the particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].draw(ctx);
    }

    // Draw the canons
    this.drawCanons(ctx);

    // Draw the ship image
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

  /**
    Draw the canons if they are sets.
  */
  drawCanons(ctx) {
    if (this.leftCanon !== undefined) {
      this.leftCanon.draw(ctx);
    }
    if (this.rightCanon !== undefined) {
      this.rightCanon.draw(ctx);
    }

    // Draw the canon supports
    if (this.leftCanon !== undefined || this.rightCanon !== undefined) {
      ctx.beginPath();
      ctx.fillStyle = this.colorString;
      ctx.fillRect(
        this.pos.x - this.CANON_SPACE,
        this.pos.y - this.h / 24,
        this.CANON_SPACE * 2,
        this.h / 7
      );
      ctx.closePath();
    }
  }

  collision(enemy) {
    return (
      this.pos.x + this.w / 2 > enemy.pos.x - enemy.w / 2
      && this.pos.x - this.w / 2 < enemy.pos.x + enemy.w / 2
      && this.pos.y + this.h / 2 > enemy.pos.y - enemy.h / 2
      && this.pos.y - this.h / 2 < enemy.pos.y + enemy.h / 2);
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

  looseSpeed(factorX, factorY) {
    if (this.speed.x > 0.5 || this.speed.x < -0.5) {
      this.speed.x *= factorX;
    } else {
      this.speed.x = 0;
    }

    if (this.speed.y > 0.5 || this.speed.y < -0.5) {
      this.speed.y *= factorY;
    } else {
      this.speed.y = 0;
    }
  }

  setColor(color) {
    this.color = color;
    this.colorString = this.color.asString();
    if (this.leftCanon !== undefined) {
      this.leftCanon.setColor(color);
    }
    if (this.rightCanon !== undefined) {
      this.rightCanon.setColor(color);
    }
  }
}
