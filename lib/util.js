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
