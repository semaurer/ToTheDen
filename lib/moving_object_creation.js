const MovingObject = require("./moving_object");

class CreateMovingObjects {
  createLogs() {
    const logs = [];

    let fifthRowXPos = -20;
    let seventhRowXPos = 60;
    for (let i = 0; i < 3; i++) {
      logs.push(new MovingObject(fifthRowXPos, 88, 0.6, false, "left", "log2"));
      logs.push(new MovingObject(seventhRowXPos, 166, 0.7, false, "left", "log2"));
      fifthRowXPos += 160;
      seventhRowXPos += 160;
    }

    let sixthRowXPos = 280;
    let eigthRowXPos = 280;
    for (let i = 0; i < 2; i++) {
      logs.push(new MovingObject(eigthRowXPos, 48, 1, false, "right", "log1"));
      logs.push(new MovingObject(sixthRowXPos, 128, 1.9, false, "right", "log1"));
      sixthRowXPos += 200;
      eigthRowXPos -= 300;
    }

    return logs;
  }

  createEnemies() {
    const enemies = [];

    let firstRowXPos = 20;
    let thirdRowXPos = -20;
    let fourthRowXPos = 280;
    for (let i = 0; i < 4; i++) {
      enemies.push(new MovingObject(firstRowXPos, 322, 0.7, true, "right", "tanCat"));
      enemies.push(new MovingObject(firstRowXPos, 282, 0.7, true, "left", "blueCat"));
      enemies.push(new MovingObject(thirdRowXPos, 242, 0.5, true, "left", "chestnutDog"));
      enemies.push(new MovingObject(fourthRowXPos, 202, 1, true, "right", "greyCat"));
      firstRowXPos += 140;
      thirdRowXPos += 140;
      fourthRowXPos += 150;
    }

    return enemies;
  }

  createMovingObjects() {
    let movingObjects = [];

    movingObjects = movingObjects.concat(this.createEnemies());
    movingObjects = movingObjects.concat(this.createLogs());
    return movingObjects;
  }
}

module.exports = CreateMovingObjects;
