const Bear = require("./bear");
const Tile = require("./tile");

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.bear = new Bear();
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.waterLine = null;
  }

  draw(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (this.bear.alive)  {
      this.bear.draw(ctx);
    } else if (this.bear.alive === false) {
      // ctx.clearRect(this.bear.pos[1], this.bear.pos[0], 10, 10);
    }
    this.drawTiles(ctx);
  }

  drawTiles(ctx) {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        let tileType = false;
        if (y <= 4 && y > 0) tileType = true;
        let currentX = x * 40;
        let currentY = y * 40;
        let currentTile = new Tile(currentX, currentY, tileType);
        currentTile.draw(ctx);
        if (y === 5) this.waterLine = currentY;
      }
    }
  }

  handleKeyPress(e) {
    if (e.keyCode === 38) {
      this.bear.moveUp();
    } else if (e.keyCode === 37) {
      this.bear.moveLeft();
    } else if (e.keyCode === 40) {
      this.bear.moveDown();
    } else if (e.keyCode === 39) {
      this.bear.moveRight();
    } else if (e.keyCode === 13) {
      this.resetGame();
    }
    this.bearInWater();
  }

  bearInWater() {
    if (this.bear.pos[1] <= this.waterLine) this.bear.alive = false;
  }

  resetGame() {
    this.bear.alive = true;
    this.bear.pos = [217, 380];
  }
}

module.exports = Game;
