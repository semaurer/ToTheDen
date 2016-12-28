const caveImage = new Image();
caveImage.src = "images/cave_sprites.png";

function caveAnimations() {
  return {
    width: 60,
    height: 40,
    image: caveImage,
    startX: 113,
    startY: 193
  };
}

module.exports = caveAnimations;
