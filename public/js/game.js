$(document).ready(() => {
  let game = new ShootEmHub('game-canvas');
  game.start();

  $('.try-again').click((e) => {
    e.preventDefault();

    game = new ShootEmHub('game-canvas');
    game.start();
    $('#game-over').removeClass('active');
  })
});
