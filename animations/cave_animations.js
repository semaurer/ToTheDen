const caveImage = new Image();
caveImage.src = "images/cave_sprites.png";

function caveAnimations() {
  return {
    width: 35,
    height: 35,
    image: caveImage,
    startX: 72,
    startY: 5
  };
}

module.exports = caveAnimations;
