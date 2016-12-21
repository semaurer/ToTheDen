class Bear {
  constructor() {
    this.alive = true;
    this.pos = [200, 392];
    this.radius = 5;
  }

  moveUp() {
    this.pos[1] = this.pos[1] - 10;
  }

  moveDown() {
    this.pos[1] = this.pos[1] + 10;
  }

  moveRight() {
    this.pos[0] = this.pos[0] + 10;
  }

  moveLeft() {
    this.pos[0] = this.pos[0] - 10;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.stroke();
  }
}

module.exports = Bear;
