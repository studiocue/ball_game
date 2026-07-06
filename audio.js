export class AudioManager {
  constructor() {
    this.sounds = {
      start: new Audio("./start.mp3"),
      goal: new Audio("./goal.mp3"),
      fall: new Audio("./fall.mp3"),
    };

    // 連続再生対策とエラー処理
    Object.values(this.sounds).forEach((audio) => {
      audio.preload = "auto";
      audio.onerror = () => {
        console.warn("Audio file could not be loaded");
      };
    });
  }

  play(name) {
    const sound = this.sounds[name];
    if (!sound) return;

    try {
      sound.currentTime = 0;
      sound.play().catch(() => {
        // 再生失敗時は無視
      });
    } catch (e) {
      console.warn("Could not play sound:", name);
    }
  }
}