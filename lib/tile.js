const caveAnimations = require("../animations/cave_animations.js");
const spikeAnimation = require("../animations/spike_animations.js");

class Tile {
  constructor(x, y, tileType) {
    this.tileType = tileType;
    this.xPos = x;
    this.yPos = y;
    this.width = 35;
    this.height = 35;
    this.caveAnimation = caveAnimations();
    this.spikeAnimation = spikeAnimation();
  }

  draw(ctx) {
    if (this.tileType === 'c') {
      ctx.drawImage(this.caveAnimation.image, this.caveAnimation.startX,
        this.caveAnimation.startY, this.caveAnimation.width,
        this.caveAnimation.height, this.xPos + 7, this.yPos,
        this.caveAnimation.width, this.caveAnimation.height);
    }

    if (this.tileType === 's') {
      ctx.drawImage(this.spikeAnimation.image, this.spikeAnimation.startX,
        this.spikeAnimation.startY, this.spikeAnimation.width,
        this.spikeAnimation.height, this.xPos, this.yPos + 10,
        this.spikeAnimation.width, this.spikeAnimation.height);
    }
  }

}

module.exports = Tile;
