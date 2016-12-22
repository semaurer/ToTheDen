const DEFAULTS = {
  COLOR: "#7CFC00",
};

const WATERATTRS = {
  COLOR: "#0000FF"
};

class Tile {
  constructor(x, y, tileTypeBool) {
    this.water = tileTypeBool;
    this.xPos = x;
    this.yPos = y;
    this.width = null;
    this.height = null;
    this.color = DEFAULTS.COLOR;
  }

  draw(ctx) {
    if (this.water) this.color = WATERATTRS.COLOR;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.xPos, this.yPos, 35, 35);
    this.width = 35;
    this.height = 35;
  }

}

module.exports = Tile;
