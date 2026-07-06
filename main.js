import { Game } from "./game.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const game = new Game(canvas, ctx);

canvas.width = game.maze.map[0].length * game.maze.size;
canvas.height = game.maze.map.length * game.maze.size;
game.render();

document.getElementById("startBtn").addEventListener("click", () => {
  game.start();
});
