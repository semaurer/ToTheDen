class Bear {
  constructor() {
    this.alive = true;
    this.pos = [217, 380];
    this.radius = 10;
  }

  obstacleHit() {
    this.alive = false;
  }

  moveUp() {
    if (this.pos[1] > 26) {
      this.pos[1] = this.pos[1] - 40;
    }
  }

  moveDown() {
    if (this.pos[1] < 380) {
      this.pos[1] = this.pos[1] + 40;
    }
  }

  moveRight() {
    if (this.pos[0] < 376) {
      this.pos[0] = this.pos[0] + 40;
    }
  }


  moveLeft() {
    if (this.pos[0] > 20) {
      this.pos[0] = this.pos[0] - 40;
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
