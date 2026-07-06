export class Maze {
  constructor() {
    this.size = 60;

    this.map = [
      [1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,0,0,1],
      [1,0,0,0,1,0,0,1],
      [1,1,1,0,1,0,1,1],
      [1,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,0,1],
      [1,1,1,1,1,1,1,1],
    ];

    this.goal = { x: 6, y: 6 };
  }

  isWall(x, y) {
    const i = Math.floor(x / this.size);
    const j = Math.floor(y / this.size);
    return this.map[j]?.[i] === 1;
  }

  isGoal(x, y) {
    const i = Math.floor(x / this.size);
    const j = Math.floor(y / this.size);

    return i === this.goal.x && j === this.goal.y;
  }
}