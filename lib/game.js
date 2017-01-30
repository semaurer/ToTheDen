const Bear = require("./bear");
const Util = require("./util");
const tileCreation = require("./tile_creation.js");
const movingObjectCreation = require("./moving_object_creation.js");
const Images = require("./images.js");
const Sounds = require("../sounds/sounds.js");

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.bear = new Bear();
    this.movingObjects = new movingObjectCreation().createMovingObjects();
    this.tileCreation = new tileCreation();
    this.tiles = this.tileCreation.createTiles();
    this.score = 0;
    this.speedMultiplier = 0;
    this.images = new Images();
    this.sounds = new Sounds();
  }

  draw(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.images.waterBGImage, 0, 40);
    ctx.drawImage(this.images.snowBGImage1, 0, 0);
    ctx.drawImage(this.images.snowBGImage2, 0, 200);
    this.drawTiles(ctx);
    this.drawMovingObjects(ctx);
    this.shiftObjects();
    this.bear.draw(ctx);
  }

  drawMovingObjects(ctx) {
    this.movingObjects.forEach(movingObject => {
      movingObject.draw(ctx);
      if (Util.prototype.colliding(this.bear, movingObject) &&
        movingObject.enemy === true) {
        this.bear.killBear();
        this.sounds.explosionSound.playSound();
      }
    });
    this.waterCollision();
  }

  createTiles() {
    this.tiles = this.tileCreation.createTiles();
  }

  drawTiles(ctx) {
    this.createTiles();
    this.tiles.forEach(tile => {
      tile.draw(ctx);
    });
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

    this.waterCollision();
    this.bearCollision();
  }

  bearCollision() {
    const util = new Util();
    let colliding = false;
    for (let i = 0; i < this.movingObjects.length; i++) {
      if (Util.prototype.colliding(this.bear, this.movingObjects[i]) &&
        this.movingObjects[i].enemy === true) {
        this.bear.killBear();
        this.sounds.explosionSound.playSound();
      }
    }
  }

  waterCollision() {
    let currentOnLog = this.checkLogCollision();
    let currentlyOnLand = this.landCollision();
      if (currentOnLog === false && currentlyOnLand === false) {
        if (this.bear.pos[1] < 200) {
          if (this.bear.alive) {
            this.sounds.explosionSound.playSound();
          }
          this.bear.killBear();
        }
      }
  }

  landCollision() {
    for (var i = 0; i < this.tiles.length; i++) {
      if (Util.prototype.colliding(this.bear, this.tiles[i]) === true) {
        if (this.tiles[i].tileType === 'c') {
          if (this.score < 100) {
            this.score += 10;
          } else {
            this.score += 100;
          }
          this.sounds.bearGrowl.playSound();
          this.updateScore();
          this.resetGame();
        }
        if (this.tiles[i].tileType === 's') {
          this.sounds.explosionSound.playSound();
          this.bear.killBear();
        }
        if (this.tiles[i].tileType !== 'w') {
          return true;
        }
      }
    }
    return false;
  }

  checkLogCollision() {
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

  updateScore() {
    let articleTags = document.getElementsByTagName("article");
    articleTags[0].innerHTML = `Current Score - ${this.score}`;
    this.updateSpeeds();
  }

  updateSpeeds() {
    let speedIncrease = 0.02;
    if (this.score > 4) speedIncrease = 0.01;
    if (this.score > 12) speedIncrease = 0.005;
    this.speedMultiplier += speedIncrease;
    this.movingObjects.forEach(movingObject => {
      movingObject.speed += speedIncrease;
    });
  }

  resetSpeeds() {
    this.movingObjects.forEach(movingObject => {
      movingObject.speed -= this.speedMultiplier;
    });
    this.speedMultiplier = 0;
  }

  resetGame(resetBool) {
    if (resetBool) {
      this.score = 0;
      this.resetSpeeds();
    }
    this.bear.resetBear();

    this.tileCreation.winningNumber = this.tileCreation.setWinningNumber();
    this.updateScore();
  }
}

module.exports = Game;
