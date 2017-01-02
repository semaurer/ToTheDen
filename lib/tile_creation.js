const Tile = require("./tile");

class TileCreation {
  constructor() {
    this.winningNumber = this.setWinningNumber();
  }

  setWinningNumber() {
    const winningNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
    return winningNumbers[Math.floor(Math.random() * winningNumbers.length)];
  }

  createTiles() {
    const tiles = [];
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        let tileType = false;
        let caveBool = false;
        let spikeBool = false;

        if (this.winningNumber === x && y < 1) caveBool = true;
        if (x !== this.winningNumber && y < 1) {
          if (x !== this.winningNumber + 1) {
            spikeBool = true;
          }
        }

        if (y <= 4 && y > 0) tileType = true;

        let currentX = x * 40;
        let currentY = y * 40;
        let currentTile = new Tile(currentX, currentY, tileType, caveBool,spikeBool);
        tiles.push(currentTile);
      }
    }
    return tiles;
  }
}

module.exports = TileCreation;
