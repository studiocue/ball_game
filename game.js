import { Input } from "./input.js";
import { Player } from "./player.js";
import { Maze } from "./maze.js";
import { Renderer } from "./renderer.js";
import { AudioManager } from "./audio.js";

export class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.input = new Input();
    this.audio = new AudioManager();

    this.maze = new Maze();
    this.player = new Player(60, 60);
    this.renderer = new Renderer(ctx, canvas, this.maze, this.player);

    this.state = "ready";
    this.animationFrameId = null;
  }

  async start() {
    const audioUnlock = this.audio.unlock();
    await this.input.enableMotionControls();
    await audioUnlock;

    this.player.reset();
    this.state = "playing";
    this.audio.play("start");
    this.render();

    if (this.animationFrameId === null) {
      this.loop();
    }
  }

  loop() {
    if (this.state !== "playing") {
      this.animationFrameId = null;
      return;
    }

    this.update();
    this.render();

    this.animationFrameId = requestAnimationFrame(() => this.loop());
  }

  update() {
    const vec = this.input.getVector();
    this.player.update(vec, this.maze);

    if (this.maze.isGoal(this.player.x, this.player.y)) {
      this.state = "clear";
      this.audio.play("goal");
    }
  }

  render() {
    this.renderer.draw();
  }
}
