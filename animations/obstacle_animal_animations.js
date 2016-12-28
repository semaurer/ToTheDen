const animalImage = new Image();
animalImage.src = "images/obstacle_animal_sprites.png";

function obstacleAnimalAnimations() {
  return {
    tanCat: {
      tanCat1: {
        width: 28,
        height: 23,
        image: animalImage,
        startX: 2,
        startY: 41
      },
      tanCat2: {
        width: 28,
        height: 24,
        image: animalImage,
        startX: 34,
        startY: 40
      },
      tanCat3: {
        width: 29,
        height: 22,
        image: animalImage,
        startX: 66,
        startY: 42
      }
    }
  };
}

module.exports = obstacleAnimalAnimations;
