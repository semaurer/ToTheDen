class Bear {
  constructor() {
    this.alive = true;
    this.pos = [10, 10];
    this.radius = 5;
  }

  moveUp() {
    this.pos[1] = this.pos[1] - 1;
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
