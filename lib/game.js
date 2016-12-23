const Bear = require("./bear");
const Tile = require("./tile");
const MovingObject = require("./moving_object");
const Util = require("./util");

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.bear = new Bear();
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.waterLine = null;
    this.movingObjects = this.createMovingObjects();
    this.tiles = [];
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
      if (movingObject.direction === "right") {
        movingObject.xPos -= movingObject.speed;
        if (movingObject.xPos <= -120) {
          movingObject.xPos = 440;
        }
      } else {
        movingObject.xPos += movingObject.speed;
        if (movingObject.xPos >= 440) {
          movingObject.xPos = -120;
        }
      }
    });
  }


  createMovingObjects() {
    const movingObjects = [];
    let firstRowXPos = 20;
    let thirdRowXPos = -20;
    for (let i = 0; i < 4; i++) {
      movingObjects.push(new MovingObject(firstRowXPos, 322, 1, true, "right"));
      movingObjects.push(new MovingObject(firstRowXPos, 282, 1, true, "left"));
      movingObjects.push(new MovingObject(thirdRowXPos, 242, 0.8, true, "left"));
      firstRowXPos += 140;
      thirdRowXPos += 140;
    }

    let seventhRowXPos = 60;
    for (let i = 0; i < 3; i++) {
      movingObjects.push(new MovingObject(seventhRowXPos, 88, 0.8, false, "left"));
      movingObjects.push(new MovingObject(seventhRowXPos, 166, 1, false, "right"));
      seventhRowXPos += 160;
    }

    let fourthRowXPos = 280;
    let eigthRowXPos = 280;
    for (let i = 0; i < 2; i++) {
      movingObjects.push(new MovingObject(fourthRowXPos, 202, 1.3, true, "right"));
      movingObjects.push(new MovingObject(eigthRowXPos, 48, 1.3, false, "left"));
      movingObjects.push(new MovingObject(fourthRowXPos, 128, 2.2, false, "right"));
      eigthRowXPos -= 300;
      fourthRowXPos += 200;
    }
    return movingObjects;
  }

  drawMovingObjects(ctx) {
    this.movingObjects.forEach(movingObject => {
      movingObject.draw(ctx);
      if (Util.prototype.colliding(this.bear, movingObject) &&
        movingObject.enemy === true) {
        this.bear.alive = false;
        this.bear.width = 0;
        this.bear.height = 0;
      }
    });
    this.bearInWater();
  }

  drawTiles(ctx) {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        let tileType = false;
        if (y <= 4 && y > 0) tileType = true;
        let currentX = x * 40;
        let currentY = y * 40;
        let currentTile = new Tile(currentX, currentY, tileType);
        this.tiles.push(currentTile);
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
    this.bearCollision();
  }

  bearCollision() {
    const util = new Util();
    let colliding = false;
    for (let i = 0; i < this.movingObjects.length; i++) {
      if (Util.prototype.colliding(this.bear, this.movingObjects[i]) &&
        this.movingObjects[i].enemy === true) {
        this.bear.alive = false;
        this.bear.width = 0;
        this.bear.height = 0;
      }
    }
  }

  bearInWater() {
    let currentlyWaterCollision = this.checkWaterCollisions();
      if (currentlyWaterCollision === false) {
        if (this.bear.pos[1] < 200) {
          this.bear.alive = false;
          this.bear.width = 0;
          this.bear.height = 0;
        }
      }
  }

  checkWaterCollisions() {
    for (let i = 0; i < this.movingObjects.length; i++) {
      if (Util.prototype.colliding(this.bear, this.movingObjects[i]) === true) {
        const direction = this.movingObjects[i].direction;
        if (direction == "right") {
          this.bear.pos[0] -= this.movingObjects[i].speed;
        } else {
          this.bear.pos[0] += this.movingObjects[i].speed;
        }
        return true;
      }
    }
    return false;
  }



  resetGame() {
    this.bear.alive = true;
    this.bear.width = 30;
    this.bear.height = 30;
    this.bear.pos = [202, 362];
  }
}

module.exports = Game;
