class Util {
  constructor() {

  }

  colliding(bear, movingObject) {
    let colliding = false;
    if (bear.pos[0] < movingObject.xPos + movingObject.width &&
     bear.pos[0] + bear.width > movingObject.xPos &&
     bear.pos[1] < movingObject.yPos + movingObject.height &&
     bear.height + bear.pos[1] > movingObject.yPos) {
     colliding = true;
    }
    return colliding;
  }
}

module.exports = Util;
