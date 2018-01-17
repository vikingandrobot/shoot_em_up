/**
  File: LightParticleCloud.js
  Date: 17.01.2018

  The Light LightParticleCloud class manages a group of
  LightParticle objects and displays them in a canvas. The user
  provides a function to generate the particle. The Canvas is maintained
  to the width and height of the parent.

  This class uses the LightParticle class.
*/

class LightParticleCloud {

  /**
    Constructor.
    Parameters
      - options : {
        canvasId: html ID of the canvas
        particleGenerator: a function that returns a LightParticle and receives
        the canvas object as paramter.
        parentSelector: a jquery selector of the html parent container.
        nbOfParticles: the number of particle to try to maintain
      }
  */
  constructor(options) {
    // Save options
    this.canvasId = options.canvasId;
    this.particleGenerator = options.particleGenerator;
    this.parentSelector = options.parentSelector;
    this.nbOfParticles = options.nbOfParticles;

    // Retrieve the canvas
    this.c = document.getElementById(this.canvasId);
    if (this.c == undefined) {
      throw "Impossible to retrieve the canvas. canvasId returned undefined";
    }
    this.ctx = this.c.getContext("2d");

    // Resize the canvas on load
    this.resizeCanvas(this.c);

    // Light particles
    this.lightParticles = [];

    // Resize the canvas
    $(window).resize(() => {
      this.resizeCanvas();
    });
  }

  /**
    Start the particle cloud
  */
  start() {
    // Interval to display light particles
    setInterval(() => {
      this.drawLightParticles();
    }, 1000/25);
  }

  /**
    Draw the particles
  */
  drawLightParticles() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);

    // Move and draw
    for (let i = this.lightParticles.length - 1; i >= 0; i--) {
      if (this.lightParticles[i].intensity <= 0) {
        this.lightParticles.splice(i, 1);
      } else {
        this.lightParticles[i].logic();
        this.lightParticles[i].draw(this.ctx);
      }
    }

    // Spawn light particles
    if (this.lightParticles.length < this.nbOfParticles || Math.random() < 0.05) {

      this.lightParticles.push(
        this.particleGenerator(this.c)
      );
    }
  }

  resizeCanvas() {
    this.c.width = $(this.parentSelector).outerWidth();
    this.c.height = $(this.parentSelector).outerHeight();
  }
}
