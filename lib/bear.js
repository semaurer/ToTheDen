const bearAnimations = require("../animations/bear_animations.js");
const explosionAnimations = require("../animations/explosion_animations.js");

class Bear {
  constructor() {
    this.alive = true;
    this.pos = [202, 362];
    this.width = 30;
    this.height = 30;
    this.bearAnimations = bearAnimations();
    this.explosionAnimations = explosionAnimations();
    this.explCounter = 1;
    this.offSetCounter = 1;
    this.currentFrame = bearAnimations().bearUp1;
  }

  killBear() {
    this.alive = false;
    this.width = 0;
    this.height = 0;
  }

  setExplosionFrame() {
    if (this.offSetCounter === 3) {
      this.offSetCounter = 1;
      let formattedExplCounter = String(this.explCounter);
      this.currentFrame = this.explosionAnimations["expl" + formattedExplCounter];
      if (this.explCounter !== 14) this.explCounter += 1;
    } else {
      this.offSetCounter += 1;
    }
  }

  offScreen() {
    if (this.pos[0] < 0 || this.pos[0] > 370 || this.pos[1] < 0 || this.pos[1] > 400) {
      this.killBear();
    }
  }

  moveUp() {
    if (this.pos[1] - 40 > 0) {
      this.pos[1] = this.pos[1] - 40;
    }
    this.handleAnimations("bearUp1");
  }

  moveDown() {
    if (this.pos[1] + 40 < 400) {
      this.pos[1] = this.pos[1] + 40;
    }
    this.handleAnimations("bearDown1");
  }

  moveRight() {
    if (this.pos[0] + 40 < 400) {
      this.pos[0] = this.pos[0] + 40;
    }
    this.handleAnimations("bearRight1");
  }


  moveLeft() {
    if (this.pos[0] - 40 > 0) {
      this.pos[0] = this.pos[0] - 40;
    }
    this.handleAnimations("bearLeft1");
  }

  handleAnimations(frame) {
    this.currentFrame = this.bearAnimations[frame];
  }

  draw(ctx) {
    let padder = 0;
    if (this.alive === false) {
      this.setExplosionFrame();
      padder = -50;
    }

    this.offScreen();
    ctx.drawImage(this.currentFrame.image, this.currentFrame.startX,
      this.currentFrame.startY, this.currentFrame.width,
      this.currentFrame.height, this.pos[0] + padder, this.pos[1] - 5 + padder,
      this.currentFrame.width, this.currentFrame.height);
    // ctx.strokeRect(this.pos[0], this.pos[1], this.width, this.height);
  }
}

module.exports = Bear;
