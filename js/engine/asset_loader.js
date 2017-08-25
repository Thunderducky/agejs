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
    var texture = {};
    var refTexture = this.data.find((item)=>{
      return item.name.split(".")[0] === name;
    });
    Object.assign(texture, refTexture);
    texture.image = this.image;
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

export default loadAsset;
