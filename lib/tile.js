const caveAnimations = require("../animations/cave_animations.js");
const spikeAnimation = require("../animations/spike_animations.js");

class Tile {
  constructor(x, y, tileTypeBool, caveBool, spikeBool) {
    this.water = tileTypeBool;
    this.cave = caveBool;
    this.spike = spikeBool;
    this.xPos = x;
    this.yPos = y;
    this.width = null;
    this.height = null;
    this.caveAnimation = caveAnimations();
    this.spikeAnimation = spikeAnimation();
  }

  draw(ctx) {
    this.width = 35;
    this.height = 35;

    if (this.cave) {
      ctx.drawImage(this.caveAnimation.image, this.caveAnimation.startX,
        this.caveAnimation.startY, this.caveAnimation.width,
        this.caveAnimation.height, this.xPos + 7, this.yPos,
        this.caveAnimation.width, this.caveAnimation.height);
    }

    if (this.spike) {
      ctx.drawImage(this.spikeAnimation.image, this.spikeAnimation.startX,
        this.spikeAnimation.startY, this.spikeAnimation.width,
        this.spikeAnimation.height, this.xPos, this.yPos + 10,
        this.spikeAnimation.width, this.spikeAnimation.height);
    }
  }

}

module.exports = Tile;
