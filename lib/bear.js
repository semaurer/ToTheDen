class Bear {
  constructor() {
    this.alive = true;
    this.pos = [200, 386];
    this.radius = 10;
  }

  moveUp() {
    if (this.pos[1] > 26) {
      this.pos[1] = this.pos[1] - 30;
    }
  }

  moveDown() {
    if (this.pos[1] < 386) {
      this.pos[1] = this.pos[1] + 30;
    }
  }

  moveRight() {
    if (this.pos[0] < 380) {
      this.pos[0] = this.pos[0] + 30;
    }
  }


  moveLeft() {
    if (this.pos[0] > 20) {
      this.pos[0] = this.pos[0] - 30;
    }
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
