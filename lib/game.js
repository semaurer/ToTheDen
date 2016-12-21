const Bear = require("./bear");

class Game {
  constructor() {
    this.bear = new Bear();
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  draw(ctx) {
    this.bear.draw(ctx);
  }

  handleKeyPress(e) {
    if (e.keyCode === 38) {
      this.bear.moveUp();
    }
  }
}

module.exports = Game;
