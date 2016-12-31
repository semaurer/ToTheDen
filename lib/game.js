const Bear = require("./bear");
const Tile = require("./tile");
const MovingObject = require("./moving_object");
const Util = require("./util");
const waterBGImage = new Image();
waterBGImage.src = "images/water_bg.png";
const snowBGImage1 = new Image();
snowBGImage1.src = "images/snowbg1.png";
const snowBGImage2 = new Image();
snowBGImage2.src = "images/snowbg2.png";

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.bear = new Bear();
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.waterLine = null;
    this.movingObjects = this.createMovingObjects();
    this.tiles = [];
    this.winningNumber = this.setWinningNumber();
    this.score = 0;
  }

  setWinningNumber() {
    const winningNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return winningNumbers[Math.floor(Math.random() * winningNumbers.length)];
  }

  draw(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(waterBGImage, 0, 40);
    ctx.drawImage(snowBGImage1, 0, 0);
    ctx.drawImage(snowBGImage2, 0, 200);
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
    let fourthRowXPos = 280;
    for (let i = 0; i < 4; i++) {
      movingObjects.push(new MovingObject(firstRowXPos, 322, 1, true, "right", "tanCat"));
      movingObjects.push(new MovingObject(firstRowXPos, 282, 1, true, "left", "blueCat"));
      movingObjects.push(new MovingObject(thirdRowXPos, 242, 0.8, true, "left", "chestnutDog"));
      movingObjects.push(new MovingObject(fourthRowXPos, 202, 1.3, true, "right", "greyCat"));
      firstRowXPos += 140;
      thirdRowXPos += 140;
      fourthRowXPos += 150;
    }

    let seventhRowXPos = 60;
    for (let i = 0; i < 3; i++) {
      movingObjects.push(new MovingObject(seventhRowXPos, 88, 0.8, false, "left", "log2"));
      movingObjects.push(new MovingObject(seventhRowXPos, 166, 1, false, "left", "log2"));
      seventhRowXPos += 160;
    }

    let sixthRowXPos = 280;
    let eigthRowXPos = 280;
    for (let i = 0; i < 2; i++) {
      movingObjects.push(new MovingObject(eigthRowXPos, 48, 1.3, false, "right", "log1"));
      movingObjects.push(new MovingObject(sixthRowXPos, 128, 2.2, false, "right", "log1"));
      sixthRowXPos += 200;
      eigthRowXPos -= 300;
    }
    return movingObjects;
  }

  drawMovingObjects(ctx) {
    this.movingObjects.forEach(movingObject => {
      movingObject.draw(ctx);
      if (Util.prototype.colliding(this.bear, movingObject) &&
        movingObject.enemy === true) {
        this.bear.killBear();
      }
    });
    this.bearInWater();
  }

  drawTiles(ctx) {
    this.tiles = [];
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        let tileType = false;
        let caveBool = false;
        if (this.winningNumber === x && y < 1) caveBool = true;
        if (y <= 4 && y > 0) tileType = true;
        let currentX = x * 40;
        let currentY = y * 40;
        let currentTile = new Tile(currentX, currentY, tileType, caveBool);
        this.tiles.push(currentTile);
        currentTile.draw(ctx);
        if (y === 5) this.waterLine = currentY;
      }
    }
  }

  handleKeyPress(e) {
    if (e.keyCode === 13) this.resetGame(true);
    if (this.bear.alive === false) return;

    if (e.keyCode === 38) {
      this.bear.moveUp();
    } else if (e.keyCode === 37) {
      this.bear.moveLeft();
    } else if (e.keyCode === 40) {
      this.bear.moveDown();
    } else if (e.keyCode === 39) {
      this.bear.moveRight();
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
        this.bear.killBear();
      }
    }
  }

  bearInWater() {
    let currentlyWaterCollision = this.checkWaterCollisions();
    let currentlyOnLand = this.checkOnLand();
      if (currentlyWaterCollision === false && currentlyOnLand === false) {
        if (this.bear.pos[1] < 200) {
          this.bear.killBear();
        }
      }
  }

  checkOnLand() {
    for (var i = 0; i < this.tiles.length; i++) {
      if (Util.prototype.colliding(this.bear, this.tiles[i]) === true) {
        if (this.tiles[i].cave) {
          this.score += 1;
          this.updateScore();
          this.resetGame();
        }
        if (this.tiles[i].water === false) {
          return true;
        }
      }
    }
    return false;
  }

  updateScore() {
    let scoreTag = document.getElementsByTagName("article");
    scoreTag[0].innerHTML = `Current Score - ${this.score}`;
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

  resetGame(resetBool) {
    if (resetBool) {
      this.score = 0;
    }
    this.bear.alive = true;
    this.bear.width = 30;
    this.bear.height = 30;
    this.bear.pos = [202, 362];
    this.bear.currentFrame = this.bear.bearAnimations.bearUp1;
    this.bear.explCounter = 1;
    this.winningNumber = this.setWinningNumber();
    this.updateScore();
  }
}

module.exports = Game;
