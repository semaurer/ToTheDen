const Game = require('./game');
const GameView = require('./game_view');

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const game = new Game();
  document.addEventListener("keydown", game.handleKeyPress);
  new GameView(game, ctx).start();
});
