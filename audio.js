export class AudioManager {
  constructor() {
    this.sounds = {
      start: new Audio("./start.mp3"),
      goal: new Audio("./goal.mp3"),
      fall: new Audio("./fall.mp3"),
    };
    this.unlocked = false;

    Object.values(this.sounds).forEach((audio) => {
      audio.preload = "auto";
      audio.onerror = () => {
        console.warn("Audio file could not be loaded");
      };
    });
  }

  unlock() {
    if (this.unlocked) return Promise.resolve();

    const unlocks = Object.values(this.sounds).map((audio) => {
      const originalMuted = audio.muted;
      audio.muted = true;
      audio.currentTime = 0;

      return audio
        .play()
        .then(() => {
          audio.pause();
          audio.currentTime = 0;
          audio.muted = originalMuted;
        })
        .catch(() => {
          audio.muted = originalMuted;
        });
    });

    this.unlocked = true;
    return Promise.allSettled(unlocks);
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
