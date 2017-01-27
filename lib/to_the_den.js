const Game = require('./game');
const GameView = require('./game_view');

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  document.addEventListener("keydown", game.handleKeyPress);
  new GameView(new Game(), ctx).start();
});
