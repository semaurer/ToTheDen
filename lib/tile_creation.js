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
        let type = '';

        if (this.winningNumber === x && y < 1) type = 'c';
        if (x !== this.winningNumber && y < 1) {
          if (x !== this.winningNumber + 1) type = 's';
        }
        if (y <= 4 && y > 0) type = 'w';

        let currentTile = new Tile(x * 40, y * 40, type);
        tiles.push(currentTile);
      }
    }
    return tiles;
  }
}

module.exports = TileCreation;
