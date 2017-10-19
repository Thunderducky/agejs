import {Texture} from "./texture"

class TextureAtlas {
  constructor(image, data){
    this.image = image;
    this.data = data.TextureAtlas.SubTexture;
    // TODO: Initialize image references to all of them?

    // Convert each item string value to numbers
    this.data.forEach((item)=>{
      item.x = +item.x;
      item.y = +item.y;
      item.width = +item.width;
      item.height = +item.height;
    });
  }
  get(name){
    // var texture = {};
    let refTexture = this.data.find((item)=>{
      return item.name.split(".")[0] === name;
    });
    console.log(refTexture);
    let texture = new Texture(
      refTexture.name,
      this.image,
      +refTexture.x,
      +refTexture.y,
      +refTexture.width,
      +refTexture.height
    )
    console.log(texture);
    return texture;
  }
}

const loadAsset = (loadData) => {
  return new Promise((resolve, reject) => {
    // Load base image
    let url = loadData.TextureAtlas.imagePath;
    let img = new Image();
    img.onload = () => {
      resolve(new TextureAtlas(img, loadData))
    };
    img.onerror = () => {
      reject();
    };
    img.src = url;
  });
};

export { TextureAtlas, loadAsset };
