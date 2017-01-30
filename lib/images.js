const waterBGImage = new Image();
waterBGImage.src = "images/water_bg.png";
const snowBGImage1 = new Image();
snowBGImage1.src = "images/snowbg1.png";
const snowBGImage2 = new Image();
snowBGImage2.src = "images/snowbg2.png";

class images {
  constructor() {
    this.waterBGImage = waterBGImage;
    this.snowBGImage1 = snowBGImage1;
    this.snowBGImage2 = snowBGImage2;
  }

  draw(ctx) {
    ctx.drawImage(this.waterBGImage, 0, 40);
    ctx.drawImage(this.snowBGImage1, 0, 0);
    ctx.drawImage(this.snowBGImage2, 0, 200);
  }
}

module.exports = images;
