export class Input {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.keys = {};
    this.motionEnabled = false;

    window.addEventListener("keydown", (e) => {
      this.keys[e.key] = true;
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.key] = false;
    });
  }

  async enableMotionControls() {
    if (this.motionEnabled) return true;

    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      try {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission !== "granted") return false;
      } catch (e) {
        console.warn("Device orientation permission was not granted");
        return false;
      }
    }

    window.addEventListener("deviceorientation", (e) => {
      this.x = (e.gamma || 0) / 25;
      this.y = (e.beta || 0) / 25;
    });

    this.motionEnabled = true;
    return true;
  }

  getVector() {
    let x = this.x;
    let y = this.y;

    if (this.keys["ArrowLeft"] || this.keys["a"]) x -= 1;
    if (this.keys["ArrowRight"] || this.keys["d"]) x += 1;
    if (this.keys["ArrowUp"] || this.keys["w"]) y -= 1;
    if (this.keys["ArrowDown"] || this.keys["s"]) y += 1;

    return { x, y };
  }
}
