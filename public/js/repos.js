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
  $('.repo-overview a.play-link').click(function repoClickAction(e) {
    e.preventDefault();

    // Make the rocket picto fly
    $(this).closest('.repo-overview').find('.picto').addClass('flying');

    // move to the game page
    setTimeout(() => {
      window.location = $(this).attr('href');
    }, 800);
  });
});
