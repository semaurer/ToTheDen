const Sprite = require("../sprites/sprite.js");
const bearImage = new Image();
bearImage.src = "images/bear_sprites.png";

class Bear {
  constructor() {
    this.alive = true;
    this.pos = [202, 362];
    this.width = 30;
    this.height = 30;
    this.sprite = Sprite;
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
  }

  moveDown() {
    if (this.pos[1] + 40 < 400) {
      this.pos[1] = this.pos[1] + 40;
    }
  }

  moveRight() {
    if (this.pos[0] + 40 < 400) {
      this.pos[0] = this.pos[0] + 40;
    }
  }


  moveLeft() {
    if (this.pos[0] - 40 > 0) {
      this.pos[0] = this.pos[0] - 40;
    }
  }

  draw(ctx) {
    const bear = Sprite({
      context: ctx,
      width: 40,
      height: 40,
      image: bearImage
    });
    this.offScreen();
    ctx.drawImage(bear.image, 5, 125, bear.width, bear.height,
      this.pos[0], this.pos[1] - 5, bear.width, bear.height);
    ctx.strokeRect(this.pos[0], this.pos[1], this.width, this.height);
  }
}

module.exports = Bear;
