const bearImage = new Image();
bearImage.src = "images/bear_sprites.png";

function BearAnimations() {
  return {
    bearUp1: {
      width: 40,
      height: 40,
      image: bearImage,
      startX: 5,
      startY: 125
    },
    bearUp2: {
      width: 40,
      height: 40,
      image: bearImage,
      startX: 47,
      startY: 125
    },
    bearLeft1: {
      width: 42,
      height: 40,
      image: bearImage,
      startX: 0,
      startY: 51
    },
    bearRight1: {
      width: 42,
      height: 34,
      image: bearImage,
      startX: 0,
      startY: 93
    },
    bearDown1: {
      width: 42,
      height: 42,
      image: bearImage,
      startX: 6,
      startY: 0
    }
  };
}

module.exports = BearAnimations;
