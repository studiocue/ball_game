export class Renderer {
  constructor(ctx, canvas, maze, player) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.maze = maze;
    this.player = player;
  }

  draw() {
    // 背景を黒色で塗りつぶし
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawMaze();
    this.drawGoal();
    this.drawPlayer();
  }

  drawMaze() {
    const s = this.maze.size;

    for (let y = 0; y < this.maze.map.length; y++) {
      for (let x = 0; x < this.maze.map[y].length; x++) {
        if (this.maze.map[y][x] === 1) {
          this.ctx.fillStyle = "#222";
          this.ctx.fillRect(x * s, y * s, s, s);
        }
      }
    }
  }

  drawGoal() {
    const s = this.maze.size;
    this.ctx.fillStyle = "gold";
    this.ctx.fillRect(
      this.maze.goal.x * s,
      this.maze.goal.y * s,
      s,
      s
    );
  }

  drawPlayer() {
    this.ctx.beginPath();
    this.ctx.arc(this.player.x, this.player.y, this.player.r, 0, Math.PI * 2);
    this.ctx.fillStyle = "red";
    this.ctx.fill();
  }
}
