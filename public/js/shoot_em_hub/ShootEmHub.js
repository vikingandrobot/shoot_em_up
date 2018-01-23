/**
  File: ShootEmHub.js
  Date: 18.01.2018
  Authors: Mathieu Monteverde & Sathiya Kirushnapillai

  The ShootEmHub class is the main class for the game. Instanciating a object of
  this class will allow the user to start a new game.
*/

const SpaceBg = new Image();

SpaceBg.onload = function(){
  // image  has been loaded
};

SpaceBg.src = '/img/space_bg.png';

const SpaceBg2 = new Image();

SpaceBg2.onload = function(){
  // image  has been loaded
};

SpaceBg2.src = '/img/space_bg_2.png';

class ShootEmHub {

  /**
    Constructor.
      canvasId: the ID of the canvas to use to display the game
  */
  constructor(canvasId, level) {
    // Canvas id
    this.canvasId = canvasId;

    // Retrieve the canvas
    this.c = document.getElementById(this.canvasId);
    if (this.c == undefined) {
      throw "Impossible to retrieve the canvas. canvasId returned undefined";
    }
    this.ctx = this.c.getContext("2d");

    // Create a player
    this.player = new Player(this.c, level);

    // Generator of enemies
    this.generator = ENEMY_GENERATOR;

    // Array of ennemies
    this.ennemies = [];

    // Wave count
    this.wave = 0;

    // Counting of the wave duration
    this.waveDuration = 0;

    // Array of explosions
    this.explosions = [];

    // Delta for drawing the bg
    this.deltaBg = 0;
    this.deltaBg2 = -this.c.height;

    this.audio = new Audio('/sound/music.wav');
    this.audio.addEventListener('ended', function loopMusic() {
      this.currentTime = 0;
      this.play();
    }, false);

    // Bounds in which the ennemies can move
    this.ennemyBounds = {
      x: 0,
      y: -this.c.height * 4,
      w: this.c.width,
      h: (this.c.height * 5) + 300,
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

    this.audio.play();

    // Display the UI a first time
    this.displayUI(this.player.getScore(), this.player.getLife());
  }

  /**
    Pause the game. Does nothing if the game is already paused.
  */
  pause() {
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    if (this.gameHeart !== undefined) {
      clearInterval(this.gameHeart);
    }
    this.audio.pause();
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
      // Collision with player
      if (this.ennemies[i].collision(this.player.spaceShip)) {
        // Do stuff
        if (this.player.spaceShip.hitCounter == 0 && this.ennemies[i].hitCounter == 0) {
          this.player.spaceShip.hit(1);
          this.ennemies[i].hit(1);
        }
      }

      // Delete dead ennemies
      if (this.ennemies[i].life <= 0) {
        this.explosions.push(
          new Explosion(
            this.ennemies[i].pos,
          ),
        );
        this.ennemies.splice(i, 1);
        this.player.spaceShip.countScore();
        break;
      }

      // If the ennemy is out of the game area
      if (this.ennemies[i].pos.y - this.ennemies[i].h > this.c.height + 200) {
        this.ennemies.splice(i, 1);
      } else {
        // Else, shoot and do the ennmy logic
        if (this.ennemies[i].pos.y > -200) {
          this.ennemies[i].shoot();
        }
        this.ennemies[i].logic(
          this.ennemyBounds,
          [this.player.spaceShip]
        );
      }
    }

    // Logic for explosions
    for (let i = this.explosions.length - 1; i >= 0; --i) {
      if (this.explosions[i].isFinished()) {
        this.explosions.splice(i, 1);
      } else {
        this.explosions[i].logic();
      }
    }

    // Randomly spawn an ennemy
    this.spawnEnemies();
  }

  /**
    Draw the game
  */
  draw() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);

    this.ctx.drawImage(SpaceBg, 0, this.deltaBg, this.c.width, this.c.height);
    this.ctx.drawImage(SpaceBg2, 0, this.deltaBg2, this.c.width, this.c.height);
    this.deltaBg += 10;
    this.deltaBg2 += 10;
    if (this.deltaBg > this.c.height) {
      this.deltaBg = -this.c.height;
    }
    if (this.deltaBg2 > this.c.height) {
      this.deltaBg2 = -this.c.height;
    }


    // Draw player
    this.player.draw(this.ctx);

    // Draw ennemies
    for (let i = this.ennemies.length - 1; i >= 0; --i) {
      this.ennemies[i].draw(this.ctx);
    }

    // Draw explosions
    for (let i = this.explosions.length - 1; i >= 0; --i) {
      this.explosions[i].draw(this.ctx);
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

      // Display Game Over screen
      $('.game-score').html(`${this.player.getScore()} pts`);
      $('#game-over').addClass('active');
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
    $('#game-ui .score .score-value').removeClass('score-animating');
    setTimeout(() => {
      $('#game-ui .score .score-value').addClass('score-animating');
    }, 100);

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
  spawnEnemies() {

    const index = this.wave % this.generator.length;

    if (this.waveDuration > 0 && this.waveDuration < this.generator[index].duration) {
      this.waveDuration += 1;
      return;
    } else if (this.waveDuration >= this.generator[index].duration) {
      this.wave = this.wave + 1;
      this.waveDuration = 0;
      return;
    }

    this.waveDuration += 1;

    for (let i = 0; i < this.generator[index].enemies.length; ++i) {
      const pos = new CartesianVector(
        this.generator[index].enemies[i].pos.x * this.c.width,
        this.generator[index].enemies[i].pos.y * this.c.height,
      );
      const speed = new CartesianVector(
        this.generator[index].enemies[i].speed.x,
        this.generator[index].enemies[i].speed.y,
      );

      let enemy;

      switch(this.generator[index].enemies[i].type) {
        case 'ELECTRIC':
          enemy = new LaserEnnemySpaceShip(
            pos,
            50,
            50,
            this.generator[index].enemies[i].direction,
          );
          break;

        case 'ROCKET':
          enemy = new RocketEnnemySpaceShip(pos, 30, 60);
          break;

        case 'BASIC':
        default:
          enemy = new EnnemySpaceShip(pos, 30, 60);
          break;
      }
      enemy.speed = speed.copy();

      // Add the enemy
      this.ennemies.push(enemy);
    }
    return;

    let enemy;

    let rand = Math.random();
    if (rand < 0.4) {


      // Ennemies go down
      ennemy.speed = new CartesianVector(0, 3);
    } else {

      // Ennemies go down
      ennemy.speed = new CartesianVector(0, 7);
    }

    // Ennemies are red
    ennemy.setColor(new Color(186, 53, 5, 1));
  }
}
