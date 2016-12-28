const explosionImage = new Image();
explosionImage.src = 'images/explosion_sprites.png';

function explosionAnimations() {
  return {
    expl1: {
      width: 107,
      height: 82,
      image: explosionImage,
      startX: 76,
      startY: 19
    },
    expl2: {
      width: 132,
      height: 95,
      image: explosionImage,
      startX: 320,
      startY: 12
    },
    expl3: {
      width: 154,
      height: 108,
      image: explosionImage,
      startX: 565,
      startY: 6
    },
    expl4: {
      width: 174,
      height: 118,
      image: explosionImage,
      startX: 43,
      startY: 129
    },
    expl5: {
      width: 189,
      height: 123,
      image: explosionImage,
      startX: 292,
      startY: 128
    },
    expl6: {
      width: 202,
      height: 127,
      image: explosionImage,
      startX: 541,
      startY: 128
    },
    expl7: {
      width: 232,
      height: 256,
      image: explosionImage,
      startX: 13,
      startY: 256
    },
    expl8: {
      width: 202,
      height: 127,
      image: explosionImage,
      startX: 541,
      startY: 128
    },
    expl9: {
      width: 189,
      height: 123,
      image: explosionImage,
      startX: 292,
      startY: 128
    },
    expl10: {
      width: 174,
      height: 118,
      image: explosionImage,
      startX: 43,
      startY: 129
    },
    expl11: {
      width: 154,
      height: 108,
      image: explosionImage,
      startX: 565,
      startY: 6
    },
    expl12: {
      width: 132,
      height: 95,
      image: explosionImage,
      startX: 320,
      startY: 12
    },
    expl13: {
      width: 107,
      height: 82,
      image: explosionImage,
      startX: 76,
      startY: 19
    },
    expl14: {
      width: 0,
      height: 0,
      image: explosionImage,
      startX: 0,
      startY: 0
    }
  };
}

module.exports = explosionAnimations;
