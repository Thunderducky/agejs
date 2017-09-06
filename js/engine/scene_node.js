class SceneNode {
  constructor(
    parent,
    translation = {x:0,y:0},
    rotation = 0,
    scale = {x:1,y:1},
    texture,
    zIndex,
    offset = {x:0.5, y: 0.5},
    visible = true
  ){
    // fairly straightforward mapping of nodes
    this.translation = translation;
    this.rotation = rotation;
    this.scale = scale;
    this.texture = texture;

    this.zIndex = zIndex;

    // Don't allocate arrays until we need to
    this.children = null;
    this.parent = parent;
    this.visible = visible;
    if(this.parent != null){
      this.parent.addChild(this);
    }
  }

  addChild(node){
    if(this.children == null){
      this.children = [];
    }
    node.parent = this;
    this.children.push(node);

    // assign a default zIndex, relatively naive :)
    if(node.zIndex == null){
      node.zIndex = this.children.length;
    } else {
      // Maybe we need to sort our children?
      this.children.sort((a,b)=>{return a.zIndex - b.zIndex;})
    }
  }
}

export default SceneNode;
