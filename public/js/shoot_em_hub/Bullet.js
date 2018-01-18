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
}
