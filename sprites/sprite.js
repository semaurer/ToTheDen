function Sprite(options) {
   const sprite = {};

   sprite.context = options.context;
   sprite.width = options.width;
   sprite.height = options.height;
   sprite.image = options.image;

   return sprite;
}

module.exports = Sprite;
