const animalAnimations = require("../animations/obstacle_animal_animations.js");

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
