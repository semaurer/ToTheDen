/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const GameView = __webpack_require__(14);
	
	document.addEventListener("DOMContentLoaded", function(){
	  const canvas = document.getElementById("canvas");
	  const ctx = canvas.getContext("2d");
	
	  const game = new Game();
	  document.addEventListener("keydown", game.handleKeyPress);
	  new GameView(game, ctx).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Bear = __webpack_require__(2);
	const Util = __webpack_require__(5);
	const tileCreation = __webpack_require__(6);
	const movingObjectCreation = __webpack_require__(10);
	
	const waterBGImage = new Image();
	waterBGImage.src = "images/water_bg.png";
	const snowBGImage1 = new Image();
	snowBGImage1.src = "images/snowbg1.png";
	const snowBGImage2 = new Image();
	snowBGImage2.src = "images/snowbg2.png";
	const Sound = __webpack_require__(13);
	
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
	
	    this.bearGrowl = new Sound();
	    this.bearGrowl.createSound("victory_growl");
	    this.explosionSound = new Sound();
	    this.explosionSound.createSound("death_explosion");
	    this.BGAudio = this.createBGAudio();
	    this.setupAudioToggle();
	    this.muted = false;
	  }
	
	  setWinningNumber() {
	    const winningNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
	    return winningNumbers[Math.floor(Math.random() * winningNumbers.length)];
	  }
	
	  createBGAudio() {
	    let BGAudio = new Audio("media/background_audio.wav");
	    BGAudio.loop = true;
	    BGAudio.volume = 0.2;
	    BGAudio.load();
	    BGAudio.play();
	    return BGAudio;
	  }
	
	  setupAudioToggle() {
	    document.getElementsByClassName('audio-toggle')[0]
	      .addEventListener("click", this.toggleAudio.bind(this));
	  }
	
	  toggleAudio() {
	    let audioButton = document.getElementsByClassName('audio-toggle')[0];
	    if (this.muted) {
	      this.BGAudio.volume = 0.2;
	      this.bearGrowl.volume = 0.1;
	      this.explosionSound.volume = 0.1;
	      this.muted = false;
	      audioButton.innerHTML = "Mute Audio";
	    } else {
	      this.BGAudio.volume = 0;
	      this.bearGrowl.sound.volume = 0;
	      this.explosionSound.sound.volume = 0;
	      this.muted = true;
	      audioButton.innerHTML = "Play Audio";
	    }
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
	
	  drawMovingObjects(ctx) {
	    this.movingObjects.forEach(movingObject => {
	      movingObject.draw(ctx);
	      if (Util.prototype.colliding(this.bear, movingObject) &&
	        movingObject.enemy === true) {
	        this.bear.killBear();
	        this.explosionSound.playSound();
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
	        this.explosionSound.playSound();
	      }
	    }
	  }
	
	  waterCollision() {
	    let currentOnLog = this.checkLogCollision();
	    let currentlyOnLand = this.landCollision();
	      if (currentOnLog === false && currentlyOnLand === false) {
	        if (this.bear.pos[1] < 200) {
	          if (this.bear.alive) {
	            this.explosionSound.playSound();
	          }
	          this.bear.killBear();
	        }
	      }
	  }
	
	  landCollision() {
	    for (var i = 0; i < this.tiles.length; i++) {
	      if (Util.prototype.colliding(this.bear, this.tiles[i]) === true) {
	        if (this.tiles[i].cave) {
	          if (this.score < 100) {
	            this.score += 10;
	          } else {
	            this.score += 100;
	          }
	          this.bearGrowl.playSound();
	          this.updateScore();
	          this.resetGame();
	        }
	        if (this.tiles[i].spike) {
	          this.bear.killBear();
	        }
	        if (this.tiles[i].water === false) {
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const bearAnimations = __webpack_require__(3);
	const explosionAnimations = __webpack_require__(4);
	
	class Bear {
	  constructor() {
	    this.alive = true;
	    this.pos = [202, 362];
	    this.width = 30;
	    this.height = 30;
	    this.bearAnimations = bearAnimations();
	    this.explosionAnimations = explosionAnimations();
	    this.explCounter = 1;
	    this.offSetCounter = 1;
	    this.currentFrame = bearAnimations().bearUp1;
	  }
	
	  killBear() {
	    this.alive = false;
	    this.width = 0;
	    this.height = 0;
	  }
	
	  resetBear() {
	    this.alive = true;
	    this.width = 30;
	    this.height = 30;
	    this.pos = [202, 362];
	    this.currentFrame = this.bearAnimations.bearUp1;
	    this.explCounter = 1;
	  }
	
	  setExplosionFrame() {
	    if (this.offSetCounter === 3) {
	      this.offSetCounter = 1;
	      let formattedExplCounter = String(this.explCounter);
	      this.currentFrame = this.explosionAnimations["expl" + formattedExplCounter];
	      if (this.explCounter !== 14) this.explCounter += 1;
	    } else {
	      this.offSetCounter += 1;
	    }
	  }
	
	  offScreen() {
	    if (this.pos[0] < 0 || this.pos[0] > 370 || this.pos[1] < 0 || this.pos[1] > 400) {
	      this.killBear();
	    }
	  }
	
	  moveUp() {
	    if (this.pos[1] - 40 > 0) {
	      this.pos[1] = this.pos[1] - 40;
	    }
	    this.handleAnimations("bearUp1");
	  }
	
	  moveDown() {
	    if (this.pos[1] + 40 < 400) {
	      this.pos[1] = this.pos[1] + 40;
	    }
	    this.handleAnimations("bearDown1");
	  }
	
	  moveRight() {
	    if (this.pos[0] + 40 < 400) {
	      this.pos[0] = this.pos[0] + 40;
	    }
	    this.handleAnimations("bearRight1");
	  }
	
	
	  moveLeft() {
	    if (this.pos[0] - 40 > 0) {
	      this.pos[0] = this.pos[0] - 40;
	    }
	    this.handleAnimations("bearLeft1");
	  }
	
	  handleAnimations(frame) {
	    this.currentFrame = this.bearAnimations[frame];
	  }
	
	  draw(ctx) {
	    let padder = 0;
	    if (this.alive === false) {
	      this.setExplosionFrame();
	      padder = -50;
	    }
	
	    this.offScreen();
	    ctx.drawImage(this.currentFrame.image, this.currentFrame.startX,
	      this.currentFrame.startY, this.currentFrame.width,
	      this.currentFrame.height, this.pos[0] + padder, this.pos[1] - 5 + padder,
	      this.currentFrame.width, this.currentFrame.height);
	  }
	}
	
	module.exports = Bear;


/***/ },
/* 3 */
/***/ function(module, exports) {

	const bearImage = new Image();
	bearImage.src = "images/bear_sprites.png";
	
	function BearAnimations() {
	  return {
	    bearUp1: {
	      width: 40,
	      height: 40,
	      image: bearImage,
	      startX: 5,
	      startY: 125
	    },
	    bearUp2: {
	      width: 40,
	      height: 40,
	      image: bearImage,
	      startX: 47,
	      startY: 125
	    },
	    bearLeft1: {
	      width: 42,
	      height: 40,
	      image: bearImage,
	      startX: 0,
	      startY: 51
	    },
	    bearRight1: {
	      width: 42,
	      height: 34,
	      image: bearImage,
	      startX: 0,
	      startY: 93
	    },
	    bearDown1: {
	      width: 42,
	      height: 42,
	      image: bearImage,
	      startX: 6,
	      startY: 0
	    }
	  };
	}
	
	module.exports = BearAnimations;


/***/ },
/* 4 */
/***/ function(module, exports) {

	const explosionImage = new Image();
	explosionImage.src = 'images/explosion_sprites.png';
	
	function explosionAnimations() {
	  return {
	    expl1: {
	      width: 107,
	      height: 82,
	      image: explosionImage,
	      startX: 76,
	      startY: 19
	    },
	    expl2: {
	      width: 132,
	      height: 95,
	      image: explosionImage,
	      startX: 320,
	      startY: 12
	    },
	    expl3: {
	      width: 154,
	      height: 108,
	      image: explosionImage,
	      startX: 565,
	      startY: 6
	    },
	    expl4: {
	      width: 174,
	      height: 118,
	      image: explosionImage,
	      startX: 43,
	      startY: 129
	    },
	    expl5: {
	      width: 189,
	      height: 123,
	      image: explosionImage,
	      startX: 292,
	      startY: 128
	    },
	    expl6: {
	      width: 202,
	      height: 127,
	      image: explosionImage,
	      startX: 541,
	      startY: 128
	    },
	    expl7: {
	      width: 232,
	      height: 130,
	      image: explosionImage,
	      startX: 13,
	      startY: 256
	    },
	    expl8: {
	      width: 202,
	      height: 127,
	      image: explosionImage,
	      startX: 541,
	      startY: 128
	    },
	    expl9: {
	      width: 189,
	      height: 123,
	      image: explosionImage,
	      startX: 292,
	      startY: 128
	    },
	    expl10: {
	      width: 174,
	      height: 118,
	      image: explosionImage,
	      startX: 43,
	      startY: 129
	    },
	    expl11: {
	      width: 154,
	      height: 108,
	      image: explosionImage,
	      startX: 565,
	      startY: 6
	    },
	    expl12: {
	      width: 132,
	      height: 95,
	      image: explosionImage,
	      startX: 320,
	      startY: 12
	    },
	    expl13: {
	      width: 107,
	      height: 82,
	      image: explosionImage,
	      startX: 76,
	      startY: 19
	    },
	    expl14: {
	      width: 0,
	      height: 0,
	      image: explosionImage,
	      startX: 0,
	      startY: 0
	    }
	  };
	}
	
	module.exports = explosionAnimations;


/***/ },
/* 5 */
/***/ function(module, exports) {

	class Util {
	
	  colliding(bear, movingObject) {
	    if (bear.pos[0] < movingObject.xPos + movingObject.width &&
	     bear.pos[0] + bear.width > movingObject.xPos &&
	     bear.pos[1] < movingObject.yPos + movingObject.height &&
	     bear.height + bear.pos[1] > movingObject.yPos) {
	     return true;
	    }
	    return false;
	  }
	}
	
	module.exports = Util;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Tile = __webpack_require__(7);
	
	class TileCreation {
	  constructor() {
	    this.winningNumber = this.setWinningNumber();
	  }
	
	  setWinningNumber() {
	    const winningNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
	    return winningNumbers[Math.floor(Math.random() * winningNumbers.length)];
	  }
	
	  createTiles() {
	    const tiles = [];
	    for (let x = 0; x < 10; x++) {
	      for (let y = 0; y < 10; y++) {
	        let tileType = false;
	        let caveBool = false;
	        let spikeBool = false;
	
	        if (this.winningNumber === x && y < 1) caveBool = true;
	        if (x !== this.winningNumber && y < 1) {
	          if (x !== this.winningNumber + 1) {
	            spikeBool = true;
	          }
	        }
	
	        if (y <= 4 && y > 0) tileType = true;
	
	        let currentX = x * 40;
	        let currentY = y * 40;
	        let currentTile = new Tile(currentX, currentY, tileType, caveBool,spikeBool);
	        tiles.push(currentTile);
	      }
	    }
	    return tiles;
	  }
	}
	
	module.exports = TileCreation;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const caveAnimations = __webpack_require__(8);
	const spikeAnimation = __webpack_require__(9);
	
	class Tile {
	  constructor(x, y, tileTypeBool, caveBool, spikeBool) {
	    this.water = tileTypeBool;
	    this.cave = caveBool;
	    this.spike = spikeBool;
	    this.xPos = x;
	    this.yPos = y;
	    this.width = 35;
	    this.height = 35;
	    this.caveAnimation = caveAnimations();
	    this.spikeAnimation = spikeAnimation();
	  }
	
	  draw(ctx) {
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


/***/ },
/* 8 */
/***/ function(module, exports) {

	const caveImage = new Image();
	caveImage.src = "images/cave_sprites.png";
	
	function caveAnimations() {
	  return {
	    width: 60,
	    height: 40,
	    image: caveImage,
	    startX: 113,
	    startY: 193
	  };
	}
	
	module.exports = caveAnimations;


/***/ },
/* 9 */
/***/ function(module, exports) {

	const spikeImage = new Image();
	spikeImage.src = "images/spike_sprites.png";
	
	function spikeAnimation() {
	  return {
	    width: 28,
	    height: 27,
	    image: spikeImage,
	    startX: 175,
	    startY: 33
	  };
	}
	
	module.exports = spikeAnimation;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(11);
	
	class CreateMovingObjects {
	  createLogs() {
	    const logs = [];
	
	    let fifthRowXPos = -20;
	    let seventhRowXPos = 60;
	    for (let i = 0; i < 3; i++) {
	      logs.push(new MovingObject(fifthRowXPos, 88, 0.6, false, "left", "log2"));
	      logs.push(new MovingObject(seventhRowXPos, 166, 0.7, false, "left", "log2"));
	      fifthRowXPos += 160;
	      seventhRowXPos += 160;
	    }
	
	    let sixthRowXPos = 280;
	    let eigthRowXPos = 280;
	    for (let i = 0; i < 2; i++) {
	      logs.push(new MovingObject(eigthRowXPos, 48, 1, false, "right", "log1"));
	      logs.push(new MovingObject(sixthRowXPos, 128, 1.9, false, "right", "log1"));
	      sixthRowXPos += 200;
	      eigthRowXPos -= 300;
	    }
	
	    return logs;
	  }
	
	  createEnemies() {
	    const enemies = [];
	
	    let firstRowXPos = 20;
	    let secondRowXPos = 40;
	    let thirdRowXPos = -20;
	    let fourthRowXPos = 280;
	    for (let i = 0; i < 4; i++) {
	      enemies.push(new MovingObject(firstRowXPos, 322, 0.7, true, "right", "tanCat"));
	      enemies.push(new MovingObject(secondRowXPos, 282, 0.7, true, "left", "blueCat"));
	      enemies.push(new MovingObject(thirdRowXPos, 242, 0.5, true, "left", "chestnutDog"));
	      enemies.push(new MovingObject(fourthRowXPos, 202, 1, true, "right", "greyCat"));
	      firstRowXPos += 140;
	      secondRowXPos += 200;
	      thirdRowXPos += 140;
	      fourthRowXPos += 200;
	    }
	
	    return enemies;
	  }
	
	  createMovingObjects() {
	    let movingObjects = [];
	
	    movingObjects = movingObjects.concat(this.createEnemies());
	    movingObjects = movingObjects.concat(this.createLogs());
	    return movingObjects;
	  }
	}
	
	module.exports = CreateMovingObjects;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	const animalAnimations = __webpack_require__(12);
	
	class MovingObject {
	  constructor(x, y, speed, objectTypeBool, direction, animal) {
	    this.enemy = objectTypeBool;
	    this.xPos = x;
	    this.yPos = y;
	    this.speed = speed;
	    this.direction = direction;
	    this.width = null;
	    this.height = null;
	    this.animal = animal;
	    this.animalAnimations = this.setAnimalAnimations();
	    this.animationCounter = 1;
	    this.offSetCounter = 1;
	    this.currentFrame = this.startingFrame();
	  }
	
	  setAnimalAnimations() {
	    let animalType = this.animal.slice(0, 3);
	    if (animalType === "log") {
	      return animalAnimations();
	    } else {
	      return animalAnimations()[this.animal];
	    }
	  }
	
	  startingFrame() {
	    let animalType = this.animal.slice(0, 3);
	    if (animalType === "log") {
	      return this.animalAnimations[this.animal];
	    } else {
	      return this.animalAnimations[this.animal + "1"];
	    }
	  }
	
	  changeAnimalFrame() {
	    if (this.offSetCounter === 9) {
	      this.offSetCounter = 1;
	      if (this.animationCounter === 3) {
	        this.animationCounter = 1;
	      } else {
	        this.animationCounter += 1;
	      }
	      this.currentFrame = this.animalAnimations[this.animal + String(this.animationCounter)];
	    } else {
	      this.offSetCounter += 1;
	    }
	  }
	
	  setHeightWidth() {
	    if (this.enemy === true) {
	      this.width = 23;
	      this.height = 30;
	    }
	    if (this.animal === "log2") {
	      this.width = 80;
	      this.height = 20;
	    } else if (this.animal === "log1") {
	      this.width = 112;
	      this.height = 20;
	    }
	  }
	
	  draw(ctx) {
	    if (this.animal !== "log2" && this.animal !== "log1") {
	      this.changeAnimalFrame();
	    }
	    this.setHeightWidth();
	
	    ctx.drawImage(this.currentFrame.image, this.currentFrame.startX,
	      this.currentFrame.startY, this.currentFrame.width,
	      this.currentFrame.height, this.xPos - 5, this.yPos,
	      this.currentFrame.width, this.currentFrame.height);
	  }
	
	}
	
	module.exports = MovingObject;


/***/ },
/* 12 */
/***/ function(module, exports) {

	const animalImage = new Image();
	animalImage.src = "images/obstacle_animal_sprites.png";
	const logImage = new Image();
	logImage.src = "images/logs_sprites.png";
	
	function obstacleAnimalAnimations() {
	  return {
	    tanCat: {
	      tanCat1: {
	        width: 28,
	        height: 23,
	        image: animalImage,
	        startX: 2,
	        startY: 41
	      },
	      tanCat2: {
	        width: 28,
	        height: 24,
	        image: animalImage,
	        startX: 34,
	        startY: 40
	      },
	      tanCat3: {
	        width: 29,
	        height: 22,
	        image: animalImage,
	        startX: 66,
	        startY: 42
	      }
	    },
	    blueCat: {
	      blueCat1: {
	        width: 25,
	        height: 22,
	        image: animalImage,
	        startX: 197,
	        startY: 74
	      },
	      blueCat2: {
	        width: 25,
	        height: 23,
	        image: animalImage,
	        startX: 229,
	        startY: 73
	      },
	      blueCat3: {
	        width: 28,
	        height: 21,
	        image: animalImage,
	        startX: 258,
	        startY: 75
	      }
	    },
	    chestnutDog: {
	      chestnutDog1: {
	        width: 28,
	        height: 21,
	        image: animalImage,
	        startX: 2,
	        startY: 203
	      },
	      chestnutDog2: {
	        width: 28,
	        height: 22,
	        image: animalImage,
	        startX: 34,
	        startY: 202
	      },
	      chestnutDog3: {
	        width: 29,
	        height: 21,
	        image: animalImage,
	        startX: 65,
	        startY: 203
	      }
	    },
	    greyCat: {
	      greyCat1: {
	        width: 28,
	        height: 23,
	        image: animalImage,
	        startX: 290,
	        startY: 169
	      },
	      greyCat2: {
	        width: 28,
	        height: 24,
	        image: animalImage,
	        startX: 322,
	        startY: 168
	      },
	      greyCat3: {
	        width: 29,
	        height: 22,
	        image: animalImage,
	        startX: 354,
	        startY: 170
	      }
	    },
	    log1: {
	      width: 117,
	      height: 22,
	      image: logImage,
	      startX: 7,
	      startY: 197
	    },
	    log2: {
	      width: 85,
	      height: 21,
	      image: logImage,
	      startX: 7,
	      startY: 230
	    }
	  };
	}
	
	module.exports = obstacleAnimalAnimations;


/***/ },
/* 13 */
/***/ function(module, exports) {

	class Sound {
	  constructor() {
	    this.sound = null;
	  }
	
	  createSound(reqSound) {
	    let newSound = new Audio(`media/${reqSound}.wav`);
	    newSound.volume = 0.1;
	    newSound.load();
	    this.sound = newSound;
	  }
	
	  playSound() {
	    this.sound.play();
	  }
	
	}
	
	module.exports = Sound;


/***/ },
/* 14 */
/***/ function(module, exports) {

	class GameView {
	  constructor(game, ctx) {
	    this.game = game;
	    this.ctx = ctx;
	  }
	
	  start() {
	    requestAnimationFrame(this.animate.bind(this));
	  }
	
	  animate() {
	    this.game.draw(this.ctx);
	    requestAnimationFrame(this.animate.bind(this));
	  }
	}
	
	module.exports = GameView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map