class Drawable {
  constructor(x,y,texture,width,height){
    this.x = x;
    this.y = y;
    this.texture = texture;
    this.width;
    this.height;
  }
}

class SceneGraph {
  constructor(){
    this.layers = [];
    this.root = null;
  }
  add(node){
    node.scene = this;
  }
}

class SceneNode {
  constructor(){
    this.scene = null;
    this.childNodes = [];
    this.drawable = [];
  }
  addNode(node){
    node.scene = this.scene;
  }
  addDrawable(){

  }
}

export SceneGraph;
export SceneNode;
