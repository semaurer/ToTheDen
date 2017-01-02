const spikeImage = new Image();
spikeImage.src = "images/spike_sprites.png";

function spikeAnimation() {
  return {
    width: 28,
    height: 27,
    image: spikeImage,
    startX: 175,
    startY: 33
  };
}

module.exports = spikeAnimation;
