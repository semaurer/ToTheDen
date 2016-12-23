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
	const GameView = __webpack_require__(6);
	
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
	const Tile = __webpack_require__(3);
	const MovingObject = __webpack_require__(4);
	const Util = __webpack_require__(5);
	
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
	      movingObjects.push(new MovingObject(seventhRowXPos, 166, 1, false, "left"));
	      seventhRowXPos += 160;
	    }
	
	    let fourthRowXPos = 280;
	    let eigthRowXPos = 280;
	    for (let i = 0; i < 2; i++) {
	      movingObjects.push(new MovingObject(fourthRowXPos, 202, 1.3, true, "right"));
	      movingObjects.push(new MovingObject(eigthRowXPos, 48, 1.3, false, "right"));
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
	    let currentlyOnLand = this.checkOnLand();
	      if (currentlyWaterCollision === false && currentlyOnLand === false) {
	        if (this.bear.pos[1] < 200) {
	          this.bear.alive = false;
	          this.bear.width = 0;
	          this.bear.height = 0;
	        }
	      }
	  }
	
	  checkOnLand() {
	    for (var i = 0; i < this.tiles.length; i++) {
	      if (Util.prototype.colliding(this.bear, this.tiles[i]) === true) {
	        if (this.tiles[i].water === false) {
	          return true;
	        }
	      }
	    }
	    return false;
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const bearAnimations = __webpack_require__(8);
	
	class Bear {
	  constructor() {
	    this.alive = true;
	    this.pos = [202, 362];
	    this.width = 30;
	    this.height = 30;
	    this.bearAnimations = bearAnimations();
	    this.currentFrame = bearAnimations().bearUp1;
	  }
	
	  killBear() {
	    this.alive = false;
	    this.width = 0;
	    this.height = 0;
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
	    this.offScreen();
	    ctx.drawImage(this.currentFrame.image, this.currentFrame.startX,
	      this.currentFrame.startY, this.currentFrame.width,
	      this.currentFrame.height, this.pos[0], this.pos[1] - 5,
	      this.currentFrame.width, this.currentFrame.height);
	    ctx.strokeRect(this.pos[0], this.pos[1], this.width, this.height);
	  }
	}
	
	module.exports = Bear;


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ },
/* 4 */
/***/ function(module, exports) {

	class MovingObject {
	  constructor(x, y, speed, objectTypeBool, direction) {
	    this.enemy = objectTypeBool;
	    this.xPos = x;
	    this.yPos = y;
	    this.speed = speed;
	    this.direction = direction;
	    this.width = null;
	    this.height = null;
	  }
	
	  draw(ctx) {
	    if (this.speed <= 1) {
	      if (this.enemy === true) {
	        ctx.strokeRect(this.xPos, this.yPos, 15, 30);
	        this.width = 15;
	        this.height = 30;
	      } else {
	        ctx.strokeRect(this.xPos, this.yPos, 60, 20);
	        this.width = 60;
	        this.height = 20;
	      }
	    } else {
	      if (this.enemy === true) {
	        ctx.strokeRect(this.xPos, this.yPos, 50, 30);
	        this.width = 50;
	        this.height = 30;
	      } else {
	        ctx.strokeRect(this.xPos, this.yPos, 120, 20);
	        this.width = 120;
	        this.height = 20;
	      }
	    }
	  }
	
	}
	
	module.exports = MovingObject;


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


/***/ },
/* 7 */,
/* 8 */
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map