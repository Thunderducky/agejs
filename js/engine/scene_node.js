class SceneNode {
  constructor(
    parent,
    translation = {x:0,y:0},
    rotation = 0,
    scale = {x:1,y:1},
    texture,
    zIndex,
    offset = {x:0.5, y: 0.5},
    visible = true,
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

    this.offset = offset;

    // define this later if I need to
    this.textStyle = undefined;
    this.text = undefined;
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
// Click tester that keeps up with rotations etc
// Check if our source image has pixels there?
// function renderGraph(ctx, node){
//   ctx.save();
//   ctx.translate(node.translation.x, node.translation.y);
//   ctx.rotate(node.rotation);
//   ctx.scale(node.scale.x, node.scale.y);
//
//   if(node.texture && node.visible){
//     drawTexture(ctx, node.texture, node.offset);
//   }
//   if(node.text && node.visible){
//     drawText(ctx, node.text, node.textStyle)
//   }
//   if(node.children && node.visible){
//     node.children.forEach(child => renderGraph(ctx, child));
//   }
//   ctx.restore();
// }

const noop = () => {};
function traverseGraph(node, before = noop, after = noop){
  // we can tell it to stop
  if(before(node) && node.children){
    node.children.forEach(child => traverseGraph(child, cb))
  }
  after(node);
}

export { SceneNode, traverseGraph };
