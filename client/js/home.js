/**
  Script for the home page
*/

const LIGHT_PARTICLE_SPAN = 150;
const LIGHT_PARTICLE_RADIUS = 2;

$(document).ready(() => {
  // Get canvas context
  this.c = document.getElementById('home-canvas');
  this.ctx = this.c.getContext("2d");

  // Light particles
  lightParticles = [];

  // Resize the canvas on load
  resizeCanvas(c);

  // Interval to display light particles
  setInterval(() => {
    drawLightParticles(lightParticles, ctx, c);
  }, 1000/25);

  // Resize the canvas
  $(window).resize(() => {
    resizeCanvas(c);
  })
});

/**
  Move and draw the LightParticle instances.
*/
function drawLightParticles(lightParticles, ctx, c) {
  // Clear canvas
  ctx.clearRect(0, 0, c.width, c.height);

  // Move and draw
  for (let i = lightParticles.length - 1; i >= 0; i--) {
    if (lightParticles[i].intensity <= 0) {
      lightParticles.splice(i, 1);
    } else {
      lightParticles[i].logic();
      lightParticles[i].draw(ctx);
    }
  }

  // Spawn light particles
  if (lightParticles.length < 30 || Math.random() < 0.05) {
    const x = c.width / 2 + Math.random() * LIGHT_PARTICLE_SPAN - LIGHT_PARTICLE_SPAN / 2 ;
    const y = c.height / 2 + Math.random() * LIGHT_PARTICLE_SPAN - LIGHT_PARTICLE_SPAN / 2;

    lightParticles.push(new LightParticle(
        new CartesianVector(x, y),
        Math.random() * LIGHT_PARTICLE_RADIUS + 1,
        new CartesianVector(0, -3)
      )
    );
  }
}

/**
  Resize the canvas
*/
function resizeCanvas(c) {
  c.width = $(window).width();
  c.height = $(window).height();
}
