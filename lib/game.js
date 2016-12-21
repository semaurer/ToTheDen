const Bear = require("./bear");

class Game {
  constructor() {
    this.bear = new Bear();
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.bear.draw(ctx);
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
    }
  }
}

module.exports = Game;
