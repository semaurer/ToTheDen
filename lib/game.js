const Bear = require("./bear");
const Tile = require("./tile");
const MovingObject = require("./moving_object");

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.bear = new Bear();
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.waterLine = null;
    this.movingObjects = this.createMovingObjects();
  }

  draw(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawTiles(ctx);
    this.drawMovingObjects(ctx);
    this.shiftObjects();
    this.bear.draw(ctx);
  }

  shiftObjects() {
    this.movingObjects.forEach(movingObject => {
      if (movingObject.xPos <= -20) {
        movingObject.xPos = 440;
      } else {
        movingObject.xPos -= movingObject.speed;
      }
    });
  }


  createMovingObjects() {
    const movingObjects = [];
    let firstRowXPos = 0;
    for (let i = 0; i < 3; i++) {
      movingObjects.push(new MovingObject(firstRowXPos, 322, 1, true));
      firstRowXPos += 140;
    }
    let fourthRowXPos = 280;
    for (var i = 0; i < 2; i++) {
      movingObjects.push(new MovingObject(fourthRowXPos, 202, 1.3, true));
      fourthRowXPos += 200;
    }
    return movingObjects;
  }

  drawMovingObjects(ctx) {
    this.movingObjects.forEach(movingObject => {
      movingObject.draw(ctx);
    });
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
    if (this.bear.pos[1] <= this.waterLine) {
      this.bear.alive = false;
      this.bear.radius = 0;
    }
  }

  resetGame() {
    this.bear.alive = true;
    this.bear.radius = 10;
    this.bear.pos = [217, 380];
  }
}

module.exports = Game;
