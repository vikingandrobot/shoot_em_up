let game;

$(document).ready(() => {
  // Retrieve repository URL from the current page url
  const repoUrl = new URL(window.location.href).searchParams.get('repo');

  // Dislay an error if we the repo url is not specified
  if (repoUrl === undefined || repoUrl === null) {
    // Manage error
    console.log('Error');
  }

  // Set the Back to work link
  $('.back-to-work').attr('href', `https://github.com/${repoUrl}`);

  // Set the scoreboard link
  const h = $('.scoreboard-link').attr('href');
  $('.scoreboard-link').attr('href', `${h}/${repoUrl}`);

  /**
    Loads the player level drom the server.
    - playerLevelLoaded: callback on success,
    - errorOccured: callback if an error occured
  */
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

  /**
    Listener to send the score at the end of the game
  */
  function gameEndListener(playerScore) {
    console.log('received score');
    const data = {
      score: playerScore,
    };

    $.ajax({
      type: 'POST',
      url: `/score/${repoUrl}`,
      data,
      success: () => {
        console.log('success');
      },
    });
  }

  // load the player level from the server and start the game.
  loadPlayerLevel((playerLevel) => {
    // Create the game...
    game = new ShootEmHub('game-canvas', playerLevel);
    game.gameEndListener = gameEndListener;

    // Hide the loading screen
    $('#loader').removeClass('active');

    // Compute the player level percentage
    let deltaPercent = (playerLevel - 1) * 100;
    deltaPercent = deltaPercent.toFixed(2);

    // Progress bar display variables
    let progressBarSelector = '.plus';
    let sign = '+';
    let progressbarWidth = (deltaPercent / 5) * 2;

    // Case if the percent is < 0
    if (deltaPercent < 0) {
      progressBarSelector = '.minus';
      sign = '';
      progressbarWidth *= -1;
    }

    // Event on the play button
    $('.play-button').click((e) => {
      e.preventDefault();
      $('#game-level').removeClass('active');
      game.start();
    });

    // Show the player level screen
    $('#game-level').addClass('active');

    // Move progress bars
    $(`#game-level ${progressBarSelector}`).addClass('active');
    $(`#game-level ${progressBarSelector}`).width(`${progressbarWidth}%`);
    $(`#game-level ${progressBarSelector} .text`).html(`${sign}${deltaPercent}%`);
  }, (xhr, status, error) => {
    alert(`Error fetching player level: ${xhr.status} : ${error}`);
  });

  /**
    Action on the try again button. We load the player level from the server
    again.
  */
  $('.try-again').click((e) => {
    e.preventDefault();

    // Hide game over screen and show the loading screen
    $('#game-over').removeClass('active');
    $('#loader').addClass('active');

    // Get the player level
    loadPlayerLevel((playerLevel) => {
      // Create the game and start
      game = new ShootEmHub('game-canvas', playerLevel);
      game.gameEndListener = gameEndListener;

      $('#loader').removeClass('active');
      game.start();
    }, (xhr, status, error) => {
      alert(`Error fetching player level: ${xhr.status} : ${error}`);
    });
  });
});
