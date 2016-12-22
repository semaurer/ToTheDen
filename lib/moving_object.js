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
      ctx.strokeRect(this.xPos, this.yPos, 15, 30);
      this.width = 15;
      this.height = 30;
    } else {
      ctx.strokeRect(this.xPos, this.yPos, 50, 30);
      this.width = 50;
      this.height = 30;
    }
  }

}

module.exports = MovingObject;
