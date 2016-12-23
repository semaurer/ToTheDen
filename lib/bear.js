const bearAnimations = require("../animations/bear_animations.js");

class Bear {
  constructor() {
    this.alive = true;
    this.pos = [202, 362];
    this.width = 30;
    this.height = 30;
    this.bearAnimations = bearAnimations();
    this.currentFrame = bearAnimations().bearUp1;
  }

  killBear() {
    this.alive = false;
    this.width = 0;
    this.height = 0;
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
    this.offScreen();
    ctx.drawImage(this.currentFrame.image, this.currentFrame.startX,
      this.currentFrame.startY, this.currentFrame.width,
      this.currentFrame.height, this.pos[0], this.pos[1] - 5,
      this.currentFrame.width, this.currentFrame.height);
    ctx.strokeRect(this.pos[0], this.pos[1], this.width, this.height);
  }
}

module.exports = Bear;
