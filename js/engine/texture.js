class Texture {
  constructor(
    name,
    srcImage,
    x, y,
    width, height,
  ){
    this.name = name,
    this.srcImage = srcImage;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

// Origin is currently hardcoded to center
const drawTexture = (ctx, texture,
  offset = {x:0.5, y:0.5}) =>{
  ctx.drawImage(texture.srcImage,
    texture.x, texture.y,
    texture.width, texture.height,
    // we'll mess with this part next :)
    (-offset.x)*texture.width,
    (-offset.y)*texture.height,
    texture.width,
    texture.height);
}

export {Texture, drawTexture};
