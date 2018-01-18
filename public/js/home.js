$(document).ready(() => {

  const cloud = new LightParticleCloud({
    canvasId: 'home-canvas',
    parentSelector: '#home',
    particleGenerator: (c) => {
      const x = Math.random()  * c.width * 2;
      const y = -10;
      const speed = (Math.random() * 7 + 7);

      // Get canvas context
      return new LightParticle(
        new CartesianVector(x, y),
        Math.random() * 2 + 1,
        new CartesianVector(-speed, speed)
      )
    },
    nbOfParticles: 50
  });

  cloud.start();
});
