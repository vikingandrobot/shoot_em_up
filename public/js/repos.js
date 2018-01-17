$(document).ready(() => {
  const cloud = new LightParticleCloud({
    canvasId: 'repos-canvas',
    parentSelector: '.repos .title-section',
    particleGenerator: (c) => {
      const x = Math.random()  * c.width;
      const y = c.height;

      // Get canvas context
      return new LightParticle(
        new CartesianVector(x, y),
        Math.random() * 1 + 1,
        new CartesianVector(0,  - (Math.random() * 2 + 2))
      )
    },
    nbOfParticles: 100
  });

  cloud.start();
})
