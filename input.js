export class Input {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.keys = {};

    // キーボード入力
    window.addEventListener("keydown", (e) => {
      this.keys[e.key] = true;
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.key] = false;
    });

    // デバイス傾きセンサー
    window.addEventListener("deviceorientation", (e) => {
      this.x = (e.gamma || 0) / 25;
      this.y = (e.beta || 0) / 25;
    });
  }

  getVector() {
    let x = this.x;
    let y = this.y;

    // キーボード入力を追加
    if (this.keys["ArrowLeft"] || this.keys["a"]) x -= 1;
    if (this.keys["ArrowRight"] || this.keys["d"]) x += 1;
    if (this.keys["ArrowUp"] || this.keys["w"]) y -= 1;
    if (this.keys["ArrowDown"] || this.keys["s"]) y += 1;

    return { x, y };
  }
}