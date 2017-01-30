const Sound = require("./sound.js");

class sounds {
  constructor() {
    this.bearGrowl = new Sound();
    this.bearGrowl.createSound("victory_growl");
    this.explosionSound = new Sound();
    this.explosionSound.createSound("death_explosion");
    this.BGAudio = this.createBGAudio();
    this.setupAudioToggle();
    this.muted = false;
  }

  setupAudioToggle() {
    document.getElementsByClassName('audio-toggle')[0]
      .addEventListener("click", this.toggleAudio.bind(this));
  }

  toggleAudio() {
    let audioButton = document.getElementsByClassName('audio-toggle')[0];
    if (this.muted) {
      this.BGAudio.volume = 0.2;
      this.bearGrowl.volume = 0.1;
      this.explosionSound.volume = 0.1;
      this.muted = false;
      audioButton.innerHTML = "Mute Audio";
    } else {
      this.BGAudio.volume = 0;
      this.bearGrowl.sound.volume = 0;
      this.explosionSound.sound.volume = 0;
      this.muted = true;
      audioButton.innerHTML = "Play Audio";
    }
  }

  createBGAudio() {
    let BGAudio = new Audio("media/background_audio.wav");
    BGAudio.loop = true;
    BGAudio.volume = 0.2;
    BGAudio.load();
    BGAudio.play();
    return BGAudio;
  }
}

module.exports = sounds;
