/**
  File: ShootEmHub.js
  Date: 18.01.2018
  Authors: Mathieu Monteverde & Sathiya Kirushnapillai

  The ShootEmHub class is the main class for the game. Instanciating a object of
  this class will allow the user to start a new game.
*/

class ShootEmHub {

  /**
    Constructor.
      canvasId: the ID of the canvas to use to display the game
  */
  constructor(canvasId) {
    // Canvas id
    this.canvasId = canvasId;

    // Retrieve the canvas
    this.c = document.getElementById(this.canvasId);
    if (this.c == undefined) {
      throw "Impossible to retrieve the canvas. canvasId returned undefined";
    }
    this.ctx = this.c.getContext("2d");

    // Create a player
    this.player = new Player(this.c);

    // Array of ennemies
    this.ennemies = [];

    // Bounds in which the ennemies can move
    this.ennemyBounds = {
      x: 0,
      y: -200,
      w: this.c.width,
      h: this.c.height + 400
    };

    // Last score
    this.lastScore = this.player.getScore();
    this.lastLife = this.player.getLife();

    // The interval id to start/pause the game
    this.gameHeart = undefined;
  }

  /**
    Start the game
  */
  start() {
    this.gameHeart = setInterval(() => {
      this.core();
    }, 1000/50);

    // Display the UI a first time
    this.displayUI(this.player.getScore(), this.player.getLife());
  }

  /**
    Pause the game. Does nothing if the game is already paused.
  */
  pause() {
    if (this.gameHeart !== undefined) {
      clearInterval(this.gameHeart);
    }
  }

  /**
    Core method, called in loop.
  */
  core() {
    this.logic();
    this.draw();
  }

  /**
    Game logic.
  */
  logic() {
    // Check the condition for ending the game.
    this.checkEnd();

    // Do the player logic
    this.player.logic(this.ennemies);

    /**
      Do the logic of ennemies
    */
    for (let i = this.ennemies.length - 1; i >= 0; --i) {
      // If the ennemy is out of the game area
      if (this.ennemies[i].pos.y -  this.ennemies[i].h > this.c.height) {
        this.ennemies.splice(i, 1);
      } else {
        // Else, shoot and do the ennmy logic
        this.ennemies[i].shoot();
        this.ennemies[i].logic(
          this.ennemyBounds,
          [this.player.spaceShip]
        );
      }
    }

    // Randomly spawn an ennemy
    if (Math.random() < 0.03) {
      this.ennemies.push(
        this.spawnEnnemy(
          Math.random() * this.c.width,
          Math.random() * -100
        )
      );
    }
  }

  /**
    Draw the game
  */
  draw() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);

    // Draw player
    this.player.draw(this.ctx);

    // Draw ennemies
    for (let i = this.ennemies.length - 1; i >= 0; --i) {
      this.ennemies[i].draw(this.ctx);
    }

    // Check and display UI information
    this.checkUI();

  }

  /**
    Check if the conditions to end the game are here, and end the game if
    it is the case
  */
  checkEnd() {
    if (this.player.getLife() <= 0) {
      this.pause();

      // Display Game Over screen.
    }
  }

  /**
    Check if some UI information has changed and should be
    displayed.
  */
  checkUI() {
    const playerScore = this.player.getScore();
    const playerLife = this.player.getLife();

    if (this.lastLife != playerLife || this.lastScore != playerScore) {
      this.displayUI(playerScore, playerLife);

      this.lastScore = playerScore;
      this.lastLife = playerLife;
    }
  }

  /**
    Display the UI information
  */
  displayUI(playerScore, playerLife) {
    $('#game-ui .score .score-value').html(playerScore);
    let i = 0;
    $('#game-ui .life div').removeClass('point');
    $('#game-ui .life div').each(function() {
      if (i < playerLife) {
        $(this).addClass('point');
        i++;
      }
    })
  }

  /**
    Spawn an ennemy at the (x, y) position
  */
  spawnEnnemy(x, y) {
    const ennemy = new EnnemySpaceShip(
      new CartesianVector(x, y),
      30,
      60
    );

    // Ennemies go down
    ennemy.speed = new CartesianVector(0, 3);

    // Ennemies are red
    ennemy.setColor(new Color(186, 53, 5, 1));

    return ennemy;
  }
}
