class Bullet {
  constructor(pos, speed, radius) {
    this.pos = pos.copy();
    this.speed = speed.copy();
    this.radius = radius;
  }

  logic() {
    this.pos.add(this.speed);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  }

  collision(ennemy) {
    if (
      this.pos.x > ennemy.pos.x - ennemy.w / 2
      && this.pos.x < ennemy.pos.x + ennemy.w / 2
      && this.pos.y > ennemy.pos.y - ennemy.h / 2
      && this.pos.y < ennemy.pos.y + ennemy.h / 2) {
        return true;
    }
  }
}
