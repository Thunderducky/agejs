import {Texture} from "../core/texture"
import {SceneNode} from "../core/scene_node"

const TL = {
  x:0,
  y:0
};
Object.freeze(TL);

const splitTextures = (texture, cornerLength) => {
  let st = {
    northwest: {},
    north: {},
    northeast: {},
    west: {},
    center: {},
    east: {},
    southwest: {},
    south: {},
    southeast: {}
  };

  let panel_center_w = texture.width - cornerLength*2;
  let panel_center_h = texture.height - cornerLength*2;

  console.log(panel_center_w);
  console.log(panel_center_h);

  for(let sub in st){
    Object.assign(st[sub], texture);
  }
  console.log(st);

  // North Row
  st.northwest.name += "_NW";
  st.northwest.width = cornerLength;
  st.northwest.height = cornerLength;

  st.north.name += "_N";
  st.north.width = panel_center_w;
  st.north.height = cornerLength;
  st.north.x += cornerLength;

  st.northeast.name += "_NE";
  st.northeast.width = cornerLength;
  st.northeast.height = cornerLength;
  st.northeast.x += cornerLength + panel_center_w;

  // Center Row
  st.west.name += "_W";
  st.west.width = cornerLength;
  st.west.height = panel_center_h;
  st.west.y += cornerLength;

  st.center.name += "_C";
  st.center.width = panel_center_w;
  st.center.height = panel_center_h;
  st.center.x += cornerLength;
  st.center.y += cornerLength;

  st.east.name += "_E";
  st.east.width = cornerLength;
  st.east.height = panel_center_h;
  st.east.x += cornerLength + panel_center_w;
  st.east.y += cornerLength;

  st.southwest.name += "_SW";
  st.southwest.width = cornerLength;
  st.southwest.height = cornerLength;

  st.southwest.y += cornerLength + panel_center_h;

  st.south.name += "_S";
  st.south.width = panel_center_w;
  st.south.height = cornerLength;
  st.south.x += cornerLength;
  st.south.y += cornerLength + panel_center_h;

  st.southeast.name += "_SE";
  st.southeast.width = cornerLength;
  st.southeast.height = cornerLength;
  st.southeast.x += cornerLength + panel_center_w;
  st.southeast.y += cornerLength + panel_center_h;

  return st;
};

class Panel {
  constructor(){

  }
  init(texture, width, height, cornerLength = 10){
    // we have a terrible error
    if(texture == null){
      throw new Error("Panel must have a texture");
    }

    this.texture = texture;;
    this.cornerLength = cornerLength;
    const subtextures = splitTextures(this.texture, this.cornerLength);

    this.node = new SceneNode();
    this._width = width;
    this._height = height;

    let txOffset = {
      x: subtextures.northwest.x,
      y: subtextures.northwest.y
    }
    const nodes = {};
    for(let st in subtextures){
      let node = new SceneNode(this.node);
      let tex = subtextures[st]
      node.texture = tex;
      node.offset = TL;
      nodes[st] = node;
      node.visible = false;
    }

    const centerScaleW = (this._width - cornerLength * 2)/(this.texture.width - cornerLength * 2);
    const centerScaleH = (this._height - cornerLength * 2)/(this.texture.height - cornerLength * 2);


    nodes.northwest.visible = true;

    nodes.north.visible = true;
    nodes.north.translation.x += cornerLength;
    nodes.north.scale.x = centerScaleW;

    nodes.northeast.visible = true;
    nodes.northeast.translation.x += this._width - cornerLength;

    nodes.west.visible = true;
    nodes.west.translation.y += cornerLength;
    nodes.west.scale.y = centerScaleH;

    nodes.center.visible = true;
    nodes.center.translation.x += cornerLength;
    nodes.center.translation.y += cornerLength;
    nodes.center.scale.x = centerScaleW;
    nodes.center.scale.y = centerScaleH;

    nodes.east.visible = true;
    nodes.east.translation.x += this._width - cornerLength;
    nodes.east.translation.y += cornerLength;
    nodes.east.scale.y = centerScaleH;

    nodes.southwest.visible = true;
    nodes.southwest.translation.y += this._height - cornerLength;

    nodes.south.visible = true;
    nodes.south.translation.x += cornerLength;
    nodes.south.translation.y += this._height - cornerLength;
    nodes.south.scale.x = centerScaleW;

    nodes.southeast.visible = true;
    nodes.southeast.translation.x += this._width - cornerLength;
    nodes.southeast.translation.y += this._height - cornerLength;

  }

}

export { Panel };
