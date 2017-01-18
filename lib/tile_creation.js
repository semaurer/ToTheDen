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
        let types = { waterTile: false, caveTile: false, spikeTile: false };

        if (this.winningNumber === x && y < 1) types.caveTile = true;
        if (x !== this.winningNumber && y < 1) {
          if (x !== this.winningNumber + 1) {
            types.spikeTile = true;
          }
        }

        if (y <= 4 && y > 0) types.waterTile = true;

        let currentTile = new Tile(x * 40, y * 40, types.waterTile,
          types.caveTile, types.spikeTile);
        tiles.push(currentTile);
      }
    }
    return tiles;
  }
}

module.exports = TileCreation;
