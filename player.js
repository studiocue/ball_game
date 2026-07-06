export class Player {
  constructor(x, y) {
    this.startX = x;
    this.startY = y;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.r = 15;
  }

  reset() {
    this.x = this.startX;
    this.y = this.startY;
    this.vx = 0;
    this.vy = 0;
  }

  update(input, maze) {
    this.vx += input.x;
    this.vy += input.y;

    this.vx *= 0.95;
    this.vy *= 0.95;

    const nx = this.x + this.vx;
    const ny = this.y + this.vy;

    if (!maze.isWall(nx, this.y)) this.x = nx;
    else this.vx *= -0.3;

    if (!maze.isWall(this.x, ny)) this.y = ny;
    else this.vy *= -0.3;
  }
}