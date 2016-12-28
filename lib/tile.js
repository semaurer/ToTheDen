const caveAnimations = require("../animations/cave_animations.js");

class Tile {
  constructor(x, y, tileTypeBool, caveBool) {
    this.water = tileTypeBool;
    this.cave = caveBool;
    this.xPos = x;
    this.yPos = y;
    this.width = null;
    this.height = null;
    this.caveAnimation = caveAnimations();
  }

  draw(ctx) {
    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.xPos, this.yPos, 35, 35);
    this.width = 35;
    this.height = 35;

    if (this.cave) {
      ctx.drawImage(this.caveAnimation.image, this.caveAnimation.startX,
        this.caveAnimation.startY, this.caveAnimation.width,
        this.caveAnimation.height, this.xPos, this.yPos,
        this.caveAnimation.width, this.caveAnimation.height);
    }
  }

}

module.exports = Tile;
