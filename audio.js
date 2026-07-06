export class AudioManager {
  constructor() {
    this.sounds = {
      start: new Audio("./start.mp3"),
      goal: new Audio("./goal.mp3"),
      fall: new Audio("./fall.mp3"),
    };

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
        // Browsers can block audio before a user gesture.
      });
    } catch (e) {
      console.warn("Could not play sound:", name);
    }
  }
}
