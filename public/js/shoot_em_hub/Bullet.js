/**
  File: Bullet.js
  Authors: Mathieu Monteverde & Sathiya Kirsuhnapillai

  The Bullet class represents a bullet. It has a position, a speed and a radius.
*/

class Bullet {

  /**
    Construct the bullet with initial position, speed and radius
    pos: position (CartesianVector)
    speed: speed (CartesianVector)
    radius: radius of the bullet (integer or float)
  */
  constructor(pos, speed, radius) {
    this.pos = pos.copy();
    this.speed = speed.copy();
    this.radius = radius;
  }

  /**
    Logic to move the bullet
  */
  logic() {
    this.pos.add(this.speed);
  }

  /*
    Draw the bullet
  */
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  }

  /*
    Check whether the bullet is in collision with the given ennemy.
    The ennemy object must have a pos {x, y} property, a w for width property
    and a h for h property.
  */
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
