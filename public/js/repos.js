$(document).ready(() => {

  /*
    Create a cloud of light particles for the header
  */
  const cloud = new LightParticleCloud({
    canvasId: 'repos-canvas',
    parentSelector: '.repos .title-section',
    particleGenerator: (c) => {
      const x = Math.random() * c.width;
      const y = c.height;

      // Get canvas context
      return new LightParticle(
        new CartesianVector(x, y),
        (Math.random() * 1) + 1,
        new CartesianVector(0, -((Math.random() * 2) + 2)),
      );
    },
    nbOfParticles: 100,
  });

  // Start the cloud
  cloud.start();

  // Action on click on repositories
  $('.repo-overview').click(function repoClickAction(e) {
    e.preventDefault();

    // Make the rocket picto fly
    $(this).find('.picto').addClass('flying');

    // move to the game page
    const repoUrl = $(this).find('h3').html();
    setTimeout(() => {
      window.location = `/play/?repo=${repoUrl}`;
    }, 800);
  });
});
