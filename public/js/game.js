$(document).ready(() => {
  // Retrieve repository URL
  const repoUrl = new URL(window.location.href).searchParams.get('repo');

  if (repoUrl === undefined || repoUrl === null) {
    // Manage error
    console.log('Error');
  }

  function loadPlayerLevel(playerLevelLoaded, errorOccured) {
    $.ajax({
      url: `skills/${repoUrl}`,
    }).done((skill) => {
      const playerLevel = parseFloat(skill);
      playerLevelLoaded(playerLevel);
    }).fail((xhr, status, error) => {
      errorOccured(xhr, status, error);
    });
  }

  // load the player level from the server and start the game.
  loadPlayerLevel((playerLevel) => {
    const game = new ShootEmHub('game-canvas', playerLevel);
    game.start();
  }, (xhr, status, error) => {
    console.log('error occured');
  });


  $('.try-again').click((e) => {
    e.preventDefault();

    loadPlayerLevel((playerLevel) => {
      const game = new ShootEmHub('game-canvas', playerLevel);
      game.start();
      $('#game-over').removeClass('active');
    }, (xhr, status, error) => {
      console.log('error occured');
    });
  });
});
