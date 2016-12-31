class Sound {
  constructor() {
    this.sound = null;
  }

  createSound(reqSound) {
    let newSound = new Audio(`media/${reqSound}.wav`);
    newSound.volume = 0.1;
    newSound.load();
    this.sound = newSound;
  }

  playSound() {
    this.sound.play();
  }

}

module.exports = Sound;
