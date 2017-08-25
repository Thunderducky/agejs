class DrawableNode = {
  constructor(){
    this.x = x;
    this.y = y;
    // Don't direct access these guys
    this._children = [];
    this._parent = null;
  }

  addChild(node){
    this._children.push(node);
    node._parent = this;
  }

  offset(){
    var parentOffset = {
      x:0,
      y:0
    }
    if(this._parent){
      parentOffset = this._parent.offset();
    }
    return {
      x: this.x + parentOffset.x,
      y: this.y + parentOffset.y
    }
  }
}
