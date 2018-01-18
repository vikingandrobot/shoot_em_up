class Explosion {
  constructor(pos, speed) {
    this.pos = pos.copy();

    this.particles = [];
    for (let i = 0; i < 7; ++i) {
      this.particles.push(
        new LightParticle(
          new CartesianVector(
            this.pos.x + Math.random() * 30 - 15,
            this.pos.y + Math.random() * 30 - 15
          ),
          Math.random() * 20 + 5,
          speed.copy()
        )
      )
    }
  }

  logic() {
    for (let i = this.particles.length - 1; i >= 0; --i) {
      if (this.particles[i].intensity == 0) {
        this.particles.splice(i, 1);
      } else {
        this.particles[i].logic();
      }
    }
  }

  draw(ctx) {
    for (let i = this.particles.length - 1; i >= 0; --i) {
      this.particles[i].draw(ctx);
    }
  }

  isFinished() {
    return this.particles.length == 0;
  }
}
