const animalImage = new Image();
animalImage.src = "images/obstacle_animal_sprites.png";
const logImage = new Image();
logImage.src = "images/logs_sprites.png";

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
    },
    blueCat: {
      blueCat1: {
        width: 25,
        height: 22,
        image: animalImage,
        startX: 197,
        startY: 74
      },
      blueCat2: {
        width: 25,
        height: 23,
        image: animalImage,
        startX: 229,
        startY: 73
      },
      blueCat3: {
        width: 28,
        height: 21,
        image: animalImage,
        startX: 258,
        startY: 75
      }
    },
    chestnutDog: {
      chestnutDog1: {
        width: 28,
        height: 21,
        image: animalImage,
        startX: 2,
        startY: 203
      },
      chestnutDog2: {
        width: 28,
        height: 22,
        image: animalImage,
        startX: 34,
        startY: 202
      },
      chestnutDog3: {
        width: 29,
        height: 21,
        image: animalImage,
        startX: 65,
        startY: 203
      }
    },
    greyCat: {
      greyCat1: {
        width: 28,
        height: 23,
        image: animalImage,
        startX: 290,
        startY: 169
      },
      greyCat2: {
        width: 28,
        height: 24,
        image: animalImage,
        startX: 322,
        startY: 168
      },
      greyCat3: {
        width: 29,
        height: 22,
        image: animalImage,
        startX: 354,
        startY: 170
      }
    },
    log1: {
      width: 117,
      height: 22,
      image: logImage,
      startX: 7,
      startY: 197
    },
    log2: {
      width: 85,
      height: 21,
      image: logImage,
      startX: 7,
      startY: 230
    }
  };
}

module.exports = obstacleAnimalAnimations;
