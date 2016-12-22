class Bear {
  constructor() {
    this.alive = true;
    this.pos = [202, 362];
    this.width = 30;
    this.height = 30;
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
    if (this.pos[1] < 362) {
      this.pos[1] = this.pos[1] + 40;
    }
  }

  moveRight() {
    if (this.pos[0] < 362) {
      this.pos[0] = this.pos[0] + 40;
    }
  }


  moveLeft() {
    if (this.pos[0] > 20) {
      this.pos[0] = this.pos[0] - 40;
    }
  }


  draw(ctx) {
    ctx.strokeRect(this.pos[0], this.pos[1], this.width, this.height);
  }
}

module.exports = Bear;
